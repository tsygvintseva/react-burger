import { NavLink, Outlet, useMatch } from 'react-router-dom';

import styles from './profile.module.css';

export const ProfilePage = (): React.JSX.Element => {
	const isProfile = useMatch('/profile');

	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<nav className={styles.nav}>
					<NavLink
						to={'.'}
						end
						className={`${styles.link} text text_type_main-medium text_color_inactive`}>
						{({ isActive }) => (
							<span className={isActive ? styles.active : ''}>Профиль</span>
						)}
					</NavLink>
					<NavLink
						to={'orders'}
						className={`${styles.link} text text_type_main-medium text_color_inactive`}>
						{({ isActive }) => (
							<span className={isActive ? styles.active : ''}>
								История заказов
							</span>
						)}
					</NavLink>

					<span
						className={`${styles.link} text text_type_main-medium text_color_inactive`}>
						Выход
					</span>
				</nav>

				<p
					className={`${styles.help} text text_type_main-default text_color_inactive`}>
					В этом разделе вы можете <br />
					{isProfile
						? 'изменить свои персональные данные'
						: 'просмотреть свою историю заказов'}
				</p>
			</div>

			<Outlet />
		</main>
	);
};
