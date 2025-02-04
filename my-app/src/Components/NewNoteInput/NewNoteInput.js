import styles from './NewNoteInput.module.css';
import { useRequestAdd } from '../../hooks';

export const NewNoteInput = ({ value, setValue, refreshContent }) => {
	const { isAdding, requestAdd } = useRequestAdd(value, setValue, refreshContent);

	const handleInputChange = (e) => {
		e.target.style.height = 'auto'; // Сбрасываем высоту для корректного расчета
		setValue(e.target.value);
		// Устанавливаем новую высоту
		e.target.style.height = `${e.target.scrollHeight}px`;
	};
	return (
		<div className={styles.addContainer}>
			<div className={styles.iconContainer}>
				<div className={styles.saveBtn} disabled={isAdding} onClick={requestAdd}>
					&#10009;
				</div>
			</div>
			<textarea
				onChange={handleInputChange}
				value={value}
				placeholder="Добавить задачу..."
			></textarea>
			{value && (
				<div className={styles.iconsContainer}>
					<div className={styles.iconContainer}>
						<div className={styles.deleteBtn} onClick={() => setValue('')}>
							&#10008;
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
