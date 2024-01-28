/**
 * Encuentra el índice del elemento máximo en un array.
 * @param arr Array de números.
 * @returns El índice del elemento máximo o -1 si el array está vacío.
 */
export var findMaxItem = function (arr) {
    var maxItem = Math.max.apply(Math, arr);
    if (maxItem == 0) {
        return -1;
    }
    return arr.indexOf(maxItem);
};
/**
 * Une objetos de un array según los índices proporcionados.
 * @param arrIndex Índices de los objetos a unir.
 * @param arr Array de objetos.
 * @returns Array de objetos unidos.
 */
export var joinObjects = function (arrIndex, arr) {
    arr = [arr[arrIndex[0]], arr[arrIndex[1]], arr[arrIndex[2]]];
    return arr.filter(function (current) { return current != undefined; });
};
/**
 * Filtra los elementos únicos de un array.
 * @param arr Array de elementos.
 * @returns Array con elementos únicos.
 */
export var uniques = function (arr) {
    return arr.filter(function (item, index, arr) {
        return arr.indexOf(item) === index;
    });
};
