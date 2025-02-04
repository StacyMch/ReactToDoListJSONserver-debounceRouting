import { useState } from 'react';
import { updateNote } from '../api';

export const useRequestUpdateText = (
	textEdited,
	textBeforeEditing,
	setTextEdited,
	setIdEdited,
	refreshContent,
) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdate = (id) => {
		if (textEdited === '' || textEdited.trim() === '') {
			alert('Заметка пустая, введите текст');
			return;
		} else if (textEdited.trim() === textBeforeEditing) {
			console.log('Изменений не зафиксировано');
			setIsUpdating(false);
			setTextEdited('');
			setIdEdited(null);
			return;
		}

		let updatedNote = '';

		updatedNote = {
			id: id,
			content: textEdited,
		};

		setIsUpdating(true);
		updateNote(updatedNote)
			.then((response) => {
				console.log('Заметка обновлена, ответ сервера: ', response);
				refreshContent();
			})
			.catch((error) => {
				console.error('Ошибка при отправке запроса:', error);
			})
			.finally(() => {
				setIsUpdating(false);
				setTextEdited('');
				setIdEdited(null);
			});
	};

	return {
		isUpdating,
		requestUpdate,
	};
};
