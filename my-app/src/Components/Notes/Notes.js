import styles from './Notes.module.css';
import { NavLink } from 'react-router-dom';
import { useRequestIsCompleted } from '../../hooks';

export const Notes = ({ notes, refreshContent, debouncedSearch, sorting }) => {
	const { isChanging, requestIsCompleted } = useRequestIsCompleted(refreshContent);

	const filteredAndSortedNotes = notes
		.filter(
			({ content }) =>
				debouncedSearch === '' ||
				(content &&
					typeof content === 'string' &&
					content.toLowerCase().includes(debouncedSearch.toLowerCase())),
		)
		.sort(
			(a, b) =>
				sorting
					? a.content.localeCompare(b.content)
					: a.completed === b.completed
						? 0 // если обе одинаковые по 'completed', не меняем порядок
						: a.completed
							? 1
							: -1, // перемещаем 'completed: true' вниз
		);

	return filteredAndSortedNotes.map(({ id, content, completed }) => (
		<li>
			<NavLink key={id} className={styles.note} to={`task/${id}`}>
				<input
					className={completed ? styles.completed : null}
					value={content}
					// disabled={completed}
					readOnly
				></input>
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
				</div>
			</NavLink>
		</li>
	));
};
