// Constants for formatting
const FORMAT_TYPES = {
    ASTERISK: '*',
    NUMBER: 'number'
};

const INDENT_CLASSES = {
    [FORMAT_TYPES.ASTERISK]: 'indented',
    [FORMAT_TYPES.NUMBER]: 'indented'
};

// Utility functions
const escapeHTML = str => str.replace(/[&<>"']/g, 
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[tag])
);

const cleanAndTrim = text => text.replace(/^[*\d.]\s+/, '').trim();

const processLine = line => {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) return '';
    
    // Check line type and format accordingly
    if (trimmedLine.startsWith('*')) {
        const content = cleanAndTrim(trimmedLine);
        return `<div class="${INDENT_CLASSES[FORMAT_TYPES.ASTERISK]}">${content}</div>`;
    }
    
    if (/^\d+\.\s+/.test(trimmedLine)) {
        const content = cleanAndTrim(trimmedLine);
        return `<div class="${INDENT_CLASSES[FORMAT_TYPES.NUMBER]}">${content}</div>`;
    }
    
    return line;
};

const formatParagraphs = text => {
    const paragraphs = text.split(/\n{2,}/);
    return paragraphs
        .filter(para => para.trim())
        .map(para => `<div class="paragraph">${para}</div>`)
        .join('');
};

// Process math expressions
const processMath = text => {
    // Preserve inline math: $...$ and \(...\)
    text = text.replace(/\$([^$]+)\$/g, '%%INLINE_MATH_START%%$1%%INLINE_MATH_END%%');
    text = text.replace(/\\\((.*?)\\\)/g, '%%INLINE_MATH_START%%$1%%INLINE_MATH_END%%');

    // Preserve display math: $$...$$ and \[...\]
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, '%%DISPLAY_MATH_START%%$1%%DISPLAY_MATH_END%%');
    text = text.replace(/\\\[([\s\S]+?)\\\]/g, '%%DISPLAY_MATH_START%%$1%%DISPLAY_MATH_END%%');

    return text;
};

const restoreMath = text => {
    // Restore inline math
    text = text.replace(/%%INLINE_MATH_START%%([\s\S]+?)%%INLINE_MATH_END%%/g, 
        (_, math) => `\\(${math}\\)`);

    // Restore display math
    text = text.replace(/%%DISPLAY_MATH_START%%([\s\S]+?)%%DISPLAY_MATH_END%%/g, 
        (_, math) => `\\[${math}\\]`);

    return text;
};

// เพิ่มฟังก์ชันสำหรับจัดการตัวเลขพิเศษ (subscript/superscript)
const processSpecialNumbers = (text) => {
    // แปลงตัวเลขเป็น subscript
    const subscriptMap = {
        '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
        '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
    };

    // แปลงตัวเลขเป็น superscript
    const superscriptMap = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
        '-': '⁻', '+': '⁺'
    };

    // แปลง NMR notation
    text = text.replace(/([¹²³])?([⁰¹²³⁴⁵⁶⁷⁸⁹]{0,2}[HC])/g, '<sup>$1</sup>$2');
    
    // แปลงตัวเลขหลังสัญลักษณ์เคมีให้เป็นตัวห้อย
    text = text.replace(/([A-Z][a-z]?)(\d+)/g, (match, symbol, numbers) => {
        return symbol + numbers.split('').map(n => subscriptMap[n] || n).join('');
    });

    // แปลง IR units (cm⁻¹)
    text = text.replace(/cm-(\d+)/g, (match, number) => {
        return 'cm' + '⁻' + number.split('').map(n => superscriptMap[n] || n).join('');
    });

    // แปลง NMR coupling constants and chemical shifts
    text = text.replace(/\b(\d+(?:\.\d+)?)\s*ppm/g, '$1 δ');
    text = text.replace(/([JH])\s*=\s*(\d+(?:\.\d+)?)/g, '$1 = $2 Hz');

    return text;
};

// เพิ่มฟังก์ชันสำหรับจัดการสัญลักษณ์เคมีและตัวห้อย
const processChemicalEquations = (text) => {
    // รักษาแท็ก sub ที่มีอยู่แล้ว
    text = text.replace(/&lt;sub&gt;(.*?)&lt;\/sub&gt;/g, '<sub>$1</sub>');
    
    // แปลงตัวเลขหลังสัญลักษณ์เคมีให้เป็นตัวห้อย (เช่น H2, N2)
    text = text.replace(/([A-Z][a-z]?)(\d+)/g, '$1<sub>$2</sub>');
    
    // แปลงสถานะในวงเล็บ (g), (l), (s), (aq)
    text = text.replace(/\((g|l|s|aq)\)/g, '<sub>($1)</sub>');
    
    // แปลงสัญลักษณ์ทางเคมี
    const chemicalSymbols = {
        '⇌': '⇌',
        '->': '→',
        '<->': '↔',
        '-->': '→',
        '<--': '←',
        '=>': '⇒',
        '<=': '⇐',
        '<=>': '⇔'
    };
    
    for (const [symbol, replacement] of Object.entries(chemicalSymbols)) {
        text = text.replace(new RegExp(symbol, 'g'), ` ${replacement} `);
    }
    
    // เพิ่มการจัดการกับ NMR และ IR data
    text = text.replace(/(¹H|¹³C)\s+NMR/g, '<em>$1</em> NMR');
    text = text.replace(/\b(singlet|doublet|triplet|quartet|multiplet)\b/g, '<em>$1</em>');
    text = text.replace(/\b(\d+(?:\.\d+)?)\s*H\b/g, '$1<em>H</em>');

    return text;
};

export function formatResponse(text) {
    if (!text?.trim()) return '';
    
    try {
        // Initial cleanup and math processing
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\r\n/g, '\n')
            .trim();
        
        // Process special numbers before HTML escaping
        formatted = processSpecialNumbers(formatted);
        
        // Preserve math expressions before HTML escaping
        formatted = processMath(formatted);
        
        // Escape HTML except for math tokens
        formatted = escapeHTML(formatted);
        
        // Process chemical equations and subscripts
        formatted = processChemicalEquations(formatted);
        
        // Process lines
        formatted = formatted
            .split('\n')
            .map(processLine)
            .join('\n')
            .trim();
        
        // Handle line breaks and paragraphs
        formatted = formatted
            .replace(/\n(?!\s*<div)/g, '<br>')
            .trim();
        
        // Restore math expressions
        formatted = restoreMath(formatted);
        
        // Wrap result and trigger MathJax
        return `
            <div class="formatted-response">
                ${formatParagraphs(formatted)}
                <script>
                    if (typeof MathJax !== 'undefined') {
                        MathJax.typesetPromise();
                    }
                </script>
            </div>
        `.trim();
        
    } catch (error) {
        console.error('Error in formatResponse:', error);
        return `<div class="formatted-response error">Error formatting response</div>`;
    }
}

// Export utilities for testing
export const utils = {
    escapeHTML,
    cleanAndTrim,
    processLine,
    formatParagraphs
};
