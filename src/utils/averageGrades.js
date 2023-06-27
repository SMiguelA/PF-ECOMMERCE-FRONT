const averageGrades = (arr) => {
    if (!arr.length) return 0;

    const sum = arr.reduce((acumulador, objeto) => {
        const rating = parseFloat(objeto.rating || objeto);
        return acumulador + (isNaN(rating) ? 0 : rating);
    }, 0);

    const average = sum / arr.length;
    return average;
}

module.exports = averageGrades;
