const masks = {
    uf: "##",
    hour: "##:##",
    date: "##/##/####",
    date_hour: "##/##/#### ##:##",
    phone: "(##) ####-####",
    cellphone: "(##) #####-####",
    rg: "##.###.###",
    cpf: "###.###.###-##",
    cnpj: "##.###.###/####-##",
    zipcode: "#####-###",
    percentage: "##.##",
    card: "#### #### #### ####",
    card_expiration_1: "##/####",
    card_expiration_2: "##/##",
    cvv: "###"
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
    return text.replace(/\./g, "").replace(/-/g, "")
        .replace(/\//g, "").replace(/\(/g, "")
        .replace(/\)/g, "").replace(/:/g, "")
        .replace(/ /g, "").replace(/,/g, "");
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
        let out = "";
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

/**
 * Apply a generic phone mask on the text
 * @param {String} text Text to apply mask
 * @returns {String} Masked text
 */
function formatGenericPhone(text) {
    if (text.length <= masks.PHONE.length) return applyMask(masks.PHONE, text);
    else return applyMask(masks.CELLPHONE, text);
}

/**
 * Apply a cpf or cnpj mask, depending on the length of the text
 * @param {String} text Text to apply mask
 * @returns {String} Masked text
 */
function formatCpfCnpj(text) {
    if (text.length <= masks.CPF.length) return applyMask(masks.CPF, text);
    else return applyMask(masks.CNPJ, text);
}

/**
 * Apply a decimal mask
 * @param {String} value Text to apply mask
 * @param {Number} min Minimum value of the decimal
 * @param {Number} max Maximum value of the decimal
 * @param {String} prefix Prefix of the decimal
 * @returns {String} Masked text
 */
function formatDecimal(value, min, max, prefix = "") {
    if (typeof (value) !== "string") return "";
    value = unmaskDecimal(value, min, max, prefix);
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    if (prefix) value = `${prefix} ${value}`;
    return `${value.substring(0, value.length - 3)},${value.substring(value.length - 2, value.length)}`;
}

/**
 * Remove decimal mask
 * @param {String} value Text to remove mask
 * @param {Number} min Minimum value of the decimal
 * @param {Number} max Maximum value of the decimal
 * @param {String} prefix Prefix of the decimal
 * @returns {String} Unmasked text
 */
function unmaskDecimal(value, min, max, prefix = "") {
    value = unmask(value.replace(prefix, "").replace("^0+", ""));
    value = NaN0(Number(value)) / 100;
    if (min && (value < min)) return min.toFixed(2);
    if (max && (value > max)) return max.toFixed(2);
    return value.toFixed(2);
}

function NaN0(value) {
    return isNaN(value) ? 0 : value;
};

function formatBase64(base64, format = "png") {
    switch (format) {
        case 'png':
            return `data:image/${format};base64,${base64}`;
        case "mpeg":
        case "mp4":
        case "mp3":
        case "m4a":
            return `data:audio/${format};base64,${base64}`;
        default: return base64;
    }
}

function splitBase64(str) {
    const [header, base64] = str.split(",");
    return { header, base64 };
}

function normalizeStr(str) {
    if (!str) return "";
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/'/g, '&#39;')
        .replace(/"/g, '&quot;');
}

function unescapeHtml(str) {
    return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>').replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');
}

function removeHtmlTags(str) {
    return str.replace(/<[^>]*>/g, '');
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

export {
    masks,
    regex,
    unmask,
    applyMask,
    formatGenericPhone,
    formatCpfCnpj,
    formatDecimal,
    unmaskDecimal,
    NaN0,
    formatBase64,
    splitBase64,
    normalizeStr,
    escapeHtml,
    unescapeHtml,
    removeHtmlTags,
    reverseString,
    upperFirstLetter,
    getInitials,
    validateEmail
};