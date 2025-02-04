import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { readNote } from '../api';
import { LOADING_TIMEOUT } from '../constants';

export const useRequestGetNote = (id, refreshContentFlag) => {
	const [note, setNote] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		let timeoutFlag = false;
		let isNoteLoaded = false;
		let errorAlreadyFound = false;

		setTimeout(() => {
			timeoutFlag = true;
			if (!isNoteLoaded && !errorAlreadyFound) {
				navigate('/task-load-error');
			}
		}, LOADING_TIMEOUT);

		setIsLoading(true);
		readNote(id)
			.then((loadedNote) => {
				isNoteLoaded = true;

				console.log('Loaded note:', loadedNote);
				if (!timeoutFlag) {
					if (!loadedNote) {
						navigate('/task-does-not-exist');
						return;
					}
					setNote(loadedNote);
				} else {
					setNote(null);
				}
			})
			.catch((error) => {
				if (error.message === '404') {
					console.error('Такой задачи не существует:', error);
					navigate('/404');
				} else {
					console.error('Ошибка сервера:', error);
					navigate('/task-load-error');
				}
				errorAlreadyFound = true;
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id, navigate, refreshContentFlag]);

	return {
		note,
		isLoading,
	};
};

// export const useRequestGetNote = (id) => {
// 	const [note, setNote] = useState(null);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState(null);
// 	// const navigate = useNavigate();

// 	useEffect(() => {
// 		const fetchProduct = async () => {
// 			try {
// 				const response = await readNote(id);

// 				if (!response.ok) {
// 					throw new Error('Ответ сервера: ошибка ');
// 				}

// 				const data = await response.json();
// 				console.log(data);
// 				setNote(data);
// 			} catch (error) {
// 				setError(error.message);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchProduct();
// 	}, [id]);

// 	if (error) {
// 		return <div>Error: {error}</div>;
// 	}

// 	return {
// 		note,
// 		isLoading,
// 	};
// };
