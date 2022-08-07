export const nonZero = (num) => {
    return +num >= 1 ? (+num/60).toPrecision(2) : 0
}