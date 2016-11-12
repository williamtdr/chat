/*
 * Useful utilities not available or clumsy in pure JS
 */
"use strict";

module.exports = {
	replaceAt(input, index, character) {
		return input.substr(0, index) + character + input.substr(index + character.length);
	},

	randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	randomString(length) {
		let text = "",
			possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for(let i = 0; i < ((length - 1) || 20); i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	},

	zeroPad(number, length) {
		number = number.toString();

		return number.length >= length ? number : new Array(length - number.length + 1).join("0") + number;
	}
};