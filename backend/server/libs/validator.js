export var isCorrectUsername = function (string) {
    var regex = /^[a-zA-Z0-9!#$&/?.-_@]{1,17}$/;
    return regex.test(string);
};
export var isStrongPassword = function (string) {
    var regex = /^[a-zA-Z0-9!@#$%^&*_\-\/]{8,}$/;
    return regex.test(string);
};
