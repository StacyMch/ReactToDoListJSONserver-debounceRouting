import { useState } from 'react';
import { NewNoteInput } from '../../NewNoteInput/NewNoteInput';
import { Notes } from '../../Notes/Notes';
import styles from '../../../App.module.css';
import { Loader } from '../../../utils/Loader';
import { useRequestGet, useDebounce } from '../../../hooks';

export const MainPage = () => {
	const [value, setValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [checked, setChecked] = useState(false);
	const [sorting, setSorting] = useState(false);
	const [refreshContentFlag, setRefreshContentFlag] = useState(false);
	const debouncedSearch = useDebounce(searchValue);

	const refreshContent = () => setRefreshContentFlag(!refreshContentFlag);

	const searchHandle = (input) => {
		setSearchValue(input);
	};

	const { isLoading, notes } = useRequestGet(refreshContentFlag);
	console.log(notes);

	const toggleAlphabetSorting = () => {
		setChecked(!checked);
		setSorting(!sorting);
	};

	return (
		<>
			<div className={styles.filter}>
				<input
					className={styles.search}
					placeholder="Поиск"
					value={searchValue}
					onChange={(e) => searchHandle(e.target.value)}
				></input>
				<div className={styles.checkboxContainer}>
					по алфавиту
					<input
						type="checkbox"
						className={styles.check}
						checked={checked}
						onChange={toggleAlphabetSorting}
					/>
				</div>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.noteInput}>
					<NewNoteInput
						refreshContent={refreshContent}
						value={value}
						setValue={setValue}
					/>
				</div>
				<ul className={styles.notesContainer}>
					{isLoading ? (
						<Loader />
					) : (
						<Notes
							notes={notes}
							refreshContent={refreshContent}
							debouncedSearch={debouncedSearch}
							sorting={sorting}
						/>
					)}
				</ul>
			</div>
		</>
	);
};
