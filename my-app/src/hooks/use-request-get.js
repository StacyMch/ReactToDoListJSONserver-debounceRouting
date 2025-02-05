import { useEffect, useState } from 'react';
import { readNotes } from '../api';

export const useRequestGet = (refreshContentFlag) => {
	const [notes, setNotes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		readNotes()
			.then((loadedNotes) => {
				setNotes(loadedNotes);
			})
			.catch((error) => {
				console.error('Ошибка при отправке запроса:', error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [refreshContentFlag]);

	return {
		notes,
		isLoading,
	};
};
