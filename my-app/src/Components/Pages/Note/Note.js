import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Note.module.css';
import { BtnBack } from '../../button/BtnBack';
import { Loader } from '../../Loader/Loader';
import {
	useRequestGetNote,
	useRequestUpdateText,
	useRequestDelete,
	useRequestIsCompleted,
} from '../../../hooks';

const Note = () => {
	const [idEdited, setIdEdited] = useState(null);
	const [textBeforeEditing, setTextBeforeEditing] = useState('');
	const [textEdited, setTextEdited] = useState('');
	const [refreshContentFlag, setRefreshContentFlag] = useState(false);
	const navigate = useNavigate();

	const refreshContent = () => setRefreshContentFlag(!refreshContentFlag);

	const handleInputChange = (e) => {
		e.target.style.height = 'auto'; // Сбрасываем высоту для корректного расчета
		setTextEdited(e.target.value);
		// Устанавливаем новую высоту
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	const { isUpdating, requestUpdate } = useRequestUpdateText(
		textEdited,
		textBeforeEditing,
		setTextEdited,
		setIdEdited,
		refreshContent,
	);
	const { isChanging, requestIsCompleted } = useRequestIsCompleted(refreshContent);
	const { isDeleting, requestDelete } = useRequestDelete();

	const wantToEdit = (id, text) => {
		setIdEdited(id); //назначаем id заметки, которую хотим редактировать, чтобы при отрисовке использовать его в условии
		setTextEdited(text);
		setTextBeforeEditing(text);
	};

	const navigateBack = () => navigate(-1);

	const refForCursor = useRef(null);
	const refForResizing = useRef(null);

	useEffect(() => {
		if (refForCursor.current) {
			let end = refForCursor.current.value.length;
			refForCursor.current.setSelectionRange(end, end); //чтобы курсор встал в конец текста
			refForCursor.current.focus();
		}
	}, [idEdited]);

	const params = useParams();
	const id = params.id;

	const { isLoading, note } = useRequestGetNote(id, refreshContentFlag);

	let content;
	let completed;
	if (note) {
		content = note.content;
		completed = note.completed;
	} else {
		content = '';
		completed = false;
	}

	return isLoading ? (
		<Loader />
	) : (
		<>
			<div className={styles.note}>
				{idEdited === id ? (
					<textarea
						className={completed ? styles.completed : null}
						value={idEdited === id ? textEdited : content}
						onChange={handleInputChange}
						onBlur={idEdited === id ? () => requestUpdate(id) : null}
						ref={idEdited === id ? refForCursor : refForResizing}
					></textarea>
				) : isUpdating ? (
					<Loader />
				) : (
					<div
						className={
							completed
								? styles.textDiv + ' ' + styles.textDivCompleted
								: styles.textDiv
						}
						onClick={() => wantToEdit(id, content)}
					>
						{content}
					</div>
				)}

				<div className={styles.iconsContainer}>
					{!completed && (
						<div className={styles.iconContainer}>
							<div
								className={styles.saveBtn}
								disabled={isChanging}
								onClick={() => requestIsCompleted(id)}
							>
								&#10004;
							</div>
						</div>
					)}
					<div className={styles.iconContainer}>
						<div
							className={styles.deleteBtn}
							disabled={isDeleting}
							onClick={() => requestDelete(id)}
						>
							&#10008;
						</div>
					</div>
				</div>
			</div>

			<BtnBack onClick={navigateBack} />
		</>
	);
};

export default Note;
