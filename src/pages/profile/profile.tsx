import { NavLink, Outlet, useMatch, useNavigate } from 'react-router-dom';

import styles from './profile.module.css';
import { useLogoutMutation } from '@/services/auth/api';

export const ProfilePage = (): React.JSX.Element => {
	const isProfile = useMatch('/profile');
	const navigate = useNavigate();
	const [logout] = useLogoutMutation();

	const onClick = () => {
		const token = localStorage.getItem('refreshToken');
		if (!token) return;

		logout({ token })
			.unwrap()
			.then(() => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');

				navigate('/login', { replace: true });
			})
			.catch((error) => {
				console.error('Не удалось выйти:', error);
			});
	};

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

					<button
						className={`${styles.link} text text_type_main-medium text_color_inactive`}
						onClick={onClick}>
						Выход
					</button>
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
