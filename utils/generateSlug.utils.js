exports.generateSlug = (content) => {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345678';
    const emojiRegex = /[^\p{L}\p{N}\p{Z}]/gu;
    const cleanedContent = content
        .replace(emojiRegex, '')
        .replace(/\s+/g, ' ')
        .trim();
    const slug = cleanedContent.split(' ').slice(0, 2).join('-').toLowerCase();

    const contentLen = content.length;
    let randomChars = '';
    for (let i = 0; i < 6; i++) {
        randomChars += characters.charAt(
            Math.floor(Math.random() * contentLen)
        );
    }

    return `${slug}-${randomChars}`;
};
