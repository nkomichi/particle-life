function addVector(arg1, arg2) {
    return {
        x: arg1.x + arg2.x,
        y: arg1.y + arg2.y,
    };
}
function subVector(arg1, arg2) {
    return {
        x: arg1.x - arg2.x,
        y: arg1.y - arg2.y,
    };
}
function mulVector(arg1, arg2) {
    return {
        x: arg1.x * arg2,
        y: arg1.y * arg2,
    };
}
function divVector(arg1, arg2) {
    return {
        x: arg1.x / arg2,
        y: arg1.y / arg2,
    };
}
function sizeOfVector(arg1) {
    return (arg1.x ** 2 + arg1.y ** 2) ** (1 / 2);
}
function distanceOfVector(arg1, arg2) {
    return sizeOfVector(subVector(arg1, arg2));
}
export { addVector, subVector, mulVector, divVector, sizeOfVector, distanceOfVector };
