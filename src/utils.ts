export const checkDP = (num: number) => {
	const pattern = /^\d+(\.\d{8,})?$/;
	if (pattern.test(num.toString())) {
		return Number(num.toFixed(8));
	}
	return num;
};

export const toExponent = (num: number) => {
	const exp = Math.floor(Math.log10(Math.abs(num))); // get the exponent
	const coeff = num / Math.pow(10, exp); // get the coefficient
	const coeffStr = coeff.toFixed(6); // format the coefficient to 6 decimal places
	return coeffStr + 'e' + exp.toString().padStart(2, '0'); // combine the parts with 'e' and zero-padded exponent
};

export const addCommas = (str = '') => {
	return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
