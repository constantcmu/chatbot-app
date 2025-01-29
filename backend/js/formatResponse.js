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
    // ตัด ** ออกก่อนทำอย่างอื่น
    let formatted = text.replace(/\*\*([^*]+)\*\*/g, '$1');

    // ป้องกัน XSS
    formatted = escapeHTML(formatted);

    // แยกข้อความเป็นบรรทัดและจัดการแต่ละบรรทัด
    formatted = formatted.split('\n').map(line => {
        // ตรวจสอบและจัดการ numbered lists
        if (/^\d+\.\s+/.test(line)) {
            return line.replace(/^\d+\.\s+(.+)/, '<li>$1</li>');
        }
        // ตรวจสอบและจัดการ bullet lists
        if (/^[-*]\s+/.test(line)) {
            return line.replace(/^[-*]\s+(.+)/, '<li>$1</li>');
        }
        return line;
    }).join('\n');

    // ครอบ list items ด้วย ul เฉพาะส่วนที่เป็น list
    if (formatted.includes('<li>')) {
        formatted = formatted.replace(/(<li>.*<\/li>\n*)+/g, match => `<ul>${match}</ul>`);
    }

    // จัดการกับการขึ้นบรรทัดใหม่
    formatted = formatted
        .replace(/\n{2,}/g, '</div><div class="paragraph">') // ย่อหน้าใหม่
        .replace(/\n/g, '<br>'); // ขึ้นบรรทัดใหม่

    return `<div class="formatted-response"><div class="paragraph">${formatted}</div></div>`;
}
