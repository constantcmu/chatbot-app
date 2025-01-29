// Utility function for escaping HTML to prevent XSS
const escapeHTML = str => str.replace(/[&<>"']/g, 
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[tag]));

export function formatResponse(text) {
    // ตัด ** ออก
    let formatted = text.replace(/\*\*([^*]+)\*\*/g, '$1');
    
    // ป้องกัน XSS
    formatted = escapeHTML(formatted);

    // แยกข้อความเป็นบรรทัด
    formatted = formatted.split('\n').map(line => {
        const trimmedLine = line.trim();
        // จัดการหัวข้อย่อย
        if (trimmedLine.startsWith('-') || trimmedLine.startsWith('**')) {
            return `<div class="indented">${line.replace(/^[-*]\s+/, '')}</div>`;
        }
        // จัดการ numbered lists
        if (/^\d+\.\s+/.test(trimmedLine)) {
            return `<div class="indented">${line.replace(/^\d+\.\s+/, '')}</div>`;
        }
        return line;
    }).join('\n');

    // จัดการกับการขึ้นบรรทัดใหม่
    formatted = formatted
        .replace(/\n{2,}/g, '</div><div class="paragraph">') // ย่อหน้าใหม่
        .replace(/\n/g, '<br>'); // ขึ้นบรรทัดใหม่

    return `<div class="formatted-response"><div class="paragraph">${formatted}</div></div>`;
}
