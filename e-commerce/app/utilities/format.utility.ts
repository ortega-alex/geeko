export const commaSeparateNumber = (number: string | number): string => {
    number = parseFloat(String(number)).toFixed(2);
    while (/(\d+)(\d{3})/.test(number)) {
        number = String(number).replace(/(\d+)(\d{3})/, '$1,$2');
    }
    return number;
};
