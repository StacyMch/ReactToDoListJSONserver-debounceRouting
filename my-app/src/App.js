import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import { MainPage } from './Components/Pages/MainPage/MainPage';
import Note from './Components/Pages/Note/Note';
import { Error404, NoteNotFound } from './Components/Pages/ErrorPages/NotFound';
import { NoteLoadError } from './Components/Pages/ErrorPages/LoadError/NoteLoadError';

export const App = () => {
	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<h1>Мои задачи</h1>
				<ul className={styles.breadcrumbs}>
					<li>
						<NavLink to="/">
							{({ isActive }) =>
								isActive ? (
									''
								) : (
									<span className={styles.breadcrumb}>
										К списку задач
									</span>
								)
							}
						</NavLink>
					</li>
				</ul>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="task/:id" element={<Note />} />
					<Route path="task-load-error" element={<NoteLoadError />} />
					<Route path="task-does-not-exist" element={<NoteNotFound />} />
					<Route path="/404" element={<Error404 />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Routes>
			</div>
		</div>
	);
};
