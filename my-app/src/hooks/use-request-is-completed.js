import { useState } from 'react';
import { updateNote } from '../api';

export const useRequestIsCompleted = (refreshContent) => {
	const [isChanging, setIsChanging] = useState(false);
	// const [done, setDone] = useState(false);

	const requestIsCompleted = (id) => {
		let updatedNote = '';

		updatedNote = {
			id: id,
			completed: true,
		};

		setIsChanging(true);
		updateNote(updatedNote)
			.then((response) => {
				console.log('Статус заметки обновлен, ответ сервера: ', response);
				refreshContent();
				// setDone(true);
			})
			.catch((error) => {
				console.error('Ошибка при отправке запроса:', error);
			})
			.finally(() => {
				setIsChanging(false);
			});
	};

	return {
		isChanging,
		requestIsCompleted,
		// done,
	};
};
