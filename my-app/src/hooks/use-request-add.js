import { useState } from 'react';
import { createNote } from '../api';

export const useRequestAdd = (value, setValue, refreshContent) => {
	const [isAdding, setIsAdding] = useState(false);

	const requestAdd = () => {
		if (value === '' || value.trim() === '') {
			alert('Заметка пустая, введите текст');
			return;
		}

		let newNote = '';

		newNote = {
			content: value,
			completed: false,
		};

		setIsAdding(true);
		createNote(newNote)
			.then((response) => {
				console.log('Заметка добавлена, ответ сервера: ', response);
				refreshContent();
			})
			.finally(() => {
				setIsAdding(false);
				setValue('');
			});
	};

	return {
		isAdding,
		requestAdd,
	};
};
