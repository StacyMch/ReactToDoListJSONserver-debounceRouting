import styles from '../../ErrorPages/ErrorPage.module.css';

export const NoteLoadError = () => (
	<div className={styles.notFound}>
		Ошибка загрузки задачи, попробуйте еще раз позднее
	</div>
);
