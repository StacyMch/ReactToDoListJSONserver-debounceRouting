import styles from './BtnBack.module.css';

export const BtnBack = ({ onClick }) => {
	return (
		<button className={styles.btnBack} onClick={onClick}>
			Назад
		</button>
	);
};
