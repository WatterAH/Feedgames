"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStrongPassword = exports.isCorrectUsername = void 0;
var isCorrectUsername = (string) => {
    var regex = /^[a-zA-Z0-9!#$&/?.-_@]{1,17}$/;
    return regex.test(string);
};
exports.isCorrectUsername = isCorrectUsername;
var isStrongPassword = (string) => {
    var regex = /^[a-zA-Z0-9!@#$%^&*_\-\/]{8,}$/;
    return regex.test(string);
};
exports.isStrongPassword = isStrongPassword;
