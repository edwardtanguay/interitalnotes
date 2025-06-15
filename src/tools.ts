/**
 * Removes text from the end of a string.
 *
 * qstr.chopRight('book-001', '-001');
 *
 * 'book'
 */
export const chopRight = (main: string, textToChop: string) => {
	if (main.endsWith(textToChop)) {
		const len = textToChop.length;
		const mainLen = main.length;
		if (len <= mainLen) {
			return main.substring(0, mainLen - len);
		}
	}
	return main;
};

export const chopLeft = (main: string, textToChop: string) => {
	if (main.startsWith(textToChop)) {
		const len = textToChop.length;
		const mainLen = main.length;
		if (len <= mainLen) {
			return main.substring(len, mainLen);
		}
	}
	return main;
};

// dpod
export const getRandomSubset = (arr: string[], count: number): string[] => {
	if (count > arr.length) {
		throw new Error(
			"Requested more elements than are available in the array."
		);
	}

	const shuffled = [...arr]; 
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
	}

	return shuffled.slice(0, count);
}
