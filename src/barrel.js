const TERMINATOR = 0xFF;
const ESCAPE = 0xFE;

function fromBuffer(buffer) {
    if (!Buffer.isBuffer(buffer)) {
        throw new Error('The buffer parameter must be a buffer.');
    }
    let barrel = buffer;
    for (let i = 0; i < barrel.length; i++) {
        if (barrel[i] === TERMINATOR || barrel[i] === ESCAPE) {
            let left = barrel.slice(0, i);
            let right = barrel.slice(i, barrel.length);
            barrel = Buffer.concat([left, new Buffer([ESCAPE]), right]);
            i++;
        }
    }
    barrel = Buffer.concat([barrel, new Buffer([TERMINATOR])]);
    return barrel;
}

function toBuffer(barrel) {
    if (!Buffer.isBuffer(barrel)) {
        throw new Error('The barrel parameter must be a buffer.');
    }
    for (let i = 0; i < barrel.length - 1; i++) {
        if (barrel[i] === TERMINATOR) {
            throw new Error('Barrel terminated before the end of the buffer.');
        }
        if (barrel[i] === ESCAPE) {
            if (i === barrel.length - 2) {
                throw new Error('Barrel does not terminate.');
            }
            let left = barrel.slice(0, i);
            let right = barrel.slice(i + 1, barrel.length);
            barrel = Buffer.concat([left, right]);
        }
    }
    if (barrel[barrel.length - 1] !== TERMINATOR) {
        throw new Error('Barrel does not terminate.');
    }
    return barrel.slice(0, barrel.length - 1);
}

function fromText(text) {
    if (typeof text !== 'string') {
        throw new Error('The text parameter must be a string.');
    }
    let buffer = new Buffer(text, 'utf8');
    return fromBuffer(buffer);
}

function toText(barrel) {
    if (!Buffer.isBuffer(barrel)) {
        throw new Error('The barrel parameter must be a buffer.');
    }
    return toBuffer(barrel).toString('utf8');
}

function fromTexts(texts) {
    if (!Array.isArray(texts)) {
        throw new Error('The texts parameter must be an array of strings.');
    }
    return Buffer.concat(texts.map(fromText));
}

function toTexts(buffer) {
    if (!Buffer.isBuffer(buffer)) {
        throw new Error('The buffer parameter must be a buffer.');
    }
    let result = getFirstBarrels(buffer);
    if (result.buffer.length > 0) {
        throw new Error('The buffer does not terminate.');
    }
    return result.barrels.map(toText);
}

function getFirstBarrel(buffer) {
    if (!Buffer.isBuffer(buffer)) {
        throw new Error('The buffer parameter must be a buffer.');
    }
    for (let i = 0; i < buffer.length; i++) {
        if (buffer[i] === TERMINATOR) {
            return {
                barrel: buffer.slice(0, i + 1),
                buffer: buffer.slice(i + 1, buffer.length)
            };
        }
        if (buffer[i] === ESCAPE) {
            i++;
        }
    }
    return {
        barrel: null,
        buffer
    };
}

function getFirstBarrels(buffer, count) {
    if (!Buffer.isBuffer(buffer)) {
        throw new Error('The buffer parameter must be a buffer.');
    }
    if (typeof count === 'undefined') {
        count = Infinity;
    }
    if (typeof count !== 'number') {
        throw new Error('The count parameter must be a number or undefined.');
    }
    if (count < 0) {
        throw new Error('The count parameter cannot be less than 0 (zero).');
    }
    if (count !== Infinity && count % 1 !== 0) {
        throw new Error('The count parameter must be an integer or Infinity.');
    }
    let barrels = [];
    for (let i = 0; i < count; i++) {
        let result = getFirstBarrel(buffer);
        if (count === Infinity && result.barrel === null) {
            break;
        }
        barrels.push(result.barrel);
        buffer = result.buffer;
    }
    return {
        barrels,
        buffer
    };
}

module.exports = {
    fromBuffer,
    toBuffer,
    fromText,
    toText,
    fromTexts,
    toTexts,
    getFirstBarrel,
    getFirstBarrels
};
