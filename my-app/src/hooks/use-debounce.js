import { useState, useEffect } from 'react';

export const useDebounce = (value, delay = 1000) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		//console.log(value);
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};
