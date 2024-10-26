/**
 * Shift letter
 *
 * Shift a letter right by the given number.
 * Wrap the letter around if it reaches the end of the alphabet.
 */
function shiftLetter(letter, shift) {
    if (letter === ' ') return ' ';
    const baseCode = 'A'.charCodeAt(0);
    const letterCode = letter.charCodeAt(0) - baseCode;
    const shiftedCode = (letterCode + shift) % 26;
    return String.fromCharCode(baseCode + shiftedCode);
}

/**
 * Caesar cipher
 *
 * Apply a shift number to a string of uppercase English letters and spaces.
 */
function caesarCipher(message, shift) {
    return message
        .split('')
        .map(char => shiftLetter(char, shift))
        .join('');
}

/**
 * Shift by letter
 *
 * Shift a letter to the right using the number equivalent of another letter.
 */
function shiftByLetter(letter, letterShift) {
    if (letter === ' ') return ' ';
    const shiftValue = letterShift.charCodeAt(0) - 'A'.charCodeAt(0);
    return shiftLetter(letter, shiftValue);
}

/**
 * Vigenere cipher
 *
 * Encrypt a message using a keyphrase instead of a static number.
 */
function vigenereCipher(message, key) {
    let extendedKey = key.repeat(Math.ceil(message.length / key.length)).slice(0, message.length);
    return message
        .split('')
        .map((char, index) => (char === ' ' ? ' ' : shiftByLetter(char, extendedKey[index])))
        .join('');
}

/**
 * Scytale cipher
 *
 * Encrypts a message by simulating a scytale cipher.
 */
function scytaleCipher(message, shift) {
    // Ensure message length is a multiple of shift by adding underscores if necessary
    while (message.length % shift !== 0) {
        message += '_';
    }

    const numRows = message.length / shift;
    let encodedMessage = '';
    for (let i = 0; i < message.length; i++) {
        const index = Math.floor(i / shift) + numRows * (i % shift);
        encodedMessage += message[index];
    }
    return encodedMessage;
}

/**
 * Scytale decipher
 *
 * Decrypts a message that was originally encrypted with the `scytaleCipher` function.
 */
function scytaleDecipher(message, shift) {
    const numRows = message.length / shift;
    let decodedMessage = '';
    for (let i = 0; i < message.length; i++) {
        const index = Math.floor(i / numRows) + shift * (i % numRows);
        decodedMessage += message[index];
    }
    return decodedMessage;
}
