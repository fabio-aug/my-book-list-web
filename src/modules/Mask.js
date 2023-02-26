const masks = {
    uf: '##',
    hour: '##:##',
    date: '##/##/####',
    date_hour: '##/##/#### ##:##',
    phone: '(##) ####-####',
    cellphone: '(##) #####-####',
    rg: '##.###.###',
    cpf: '###.###.###-##',
    cnpj: '##.###.###/####-##',
    zipcode: '#####-###',
    percentage: '##.##',
    card: '#### #### #### ####',
    card_expiration_1: '##/####',
    card_expiration_2: '##/##',
    cvv: '###'
}

const regex = {
    phone: /\(\d{2}\) \d{4}-\d{4}/,
    cellphone: /\(\d{2}\) \d{5}-\d{4}/,
    zipcode: /\d{5}-\d{3}/,
    cpf: /\d{3}.\d{3}.\d{3}-\d{2}/,
    cnpj: /\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}/,
    card: /\d{4} \d{4} \d{4} \d{4}/,
    card_expiration_1: /\d{2}\/\d{4}/,
    card_expiration_2: /\d{2}\/\d{2}/,
    cvv: /\d{3}/,
}

/**
 * Removes the mask form the text
 * @param {String} text - Text that will be unmasked
 * @returns {String} Unmasked text
 */
function unmask(text) {
    return text.replace(/\./g, '').replace(/-/g, '')
        .replace(/\//g, '').replace(/\(/g, '')
        .replace(/\)/g, '').replace(/:/g, '')
        .replace(/ /g, '').replace(/,/g, '');
}

/**
 * Apply a mask on the text
 * @param {String} mask - Mask to be applied
 * @param {String} text - Text to apply mask
 * @returns {String} Masked text
 */
function applyMask(mask, text) {
    if (mask?.length > 0 && text?.length > 0) {
        text = unmask(text);
        let out = '';
        let i = 0;
        let j = 0;
        while (i < mask.length && j < text.length) {
            if (mask[i] === '#') {
                out += text[j];
                j++;
            } else {
                out += mask[i];
            }
            i++;
        }
        return out;
    }
    return text;
}

function formatBase64(base64, format = 'webp') {
    switch (format) {
        case 'webp':
            return `data:image/${format};base64,${base64}`;
        case 'png':
            return `data:image/${format};base64,${base64}`;
        case 'mpeg':
        case 'mp4':
        case 'mp3':
        case 'm4a':
            return `data:audio/${format};base64,${base64}`;
        default: return base64;
    }
}

function splitBase64(str) {
    const [header, base64] = str.split(',');
    return { header, base64 };
}

function normalizeStr(str) {
    if (!str) return '';
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function upperFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

function getInitials(name = '') {
    return name
        .replace(/\s+/, ' ')
        .split(' ')
        .slice(0, 2)
        .map((v) => v && v[0].toUpperCase())
        .join('');
}

function validateEmail(email = '') {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
}

function redutorString(str, length) {
    if (!str) return '';
    if (str.length > length - 1) {
        return str.substring(0, length - 1).concat('...');
    }
    return str;
}


export {
    masks,
    regex,
    unmask,
    applyMask,
    splitBase64,
    getInitials,
    formatBase64,
    normalizeStr,
    reverseString,
    validateEmail,
    redutorString,
    upperFirstLetter
};
