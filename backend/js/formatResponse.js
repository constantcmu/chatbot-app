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

export function formatResponse(text) {
    if (!text?.trim()) return '';
    
    try {
        // Initial cleanup and math processing
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\r\n/g, '\n')
            .trim();
        
        // Preserve math expressions before HTML escaping
        formatted = processMath(formatted);
        
        // Escape HTML except for math tokens
        formatted = escapeHTML(formatted);
        
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
