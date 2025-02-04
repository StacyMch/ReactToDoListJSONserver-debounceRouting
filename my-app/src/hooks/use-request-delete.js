import { useState } from 'react';
import { deleteNote } from '../api';
import { useNavigate } from 'react-router-dom';

export const useRequestDelete = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const navigate = useNavigate();

	const requestDelete = (id) => {
		setIsDeleting(true);
		deleteNote(id)
			.then((response) => {
				console.log('Заметка удалена');
				navigate('/');
				// refreshContent();
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};
	return {
		isDeleting,
		requestDelete,
	};
};
