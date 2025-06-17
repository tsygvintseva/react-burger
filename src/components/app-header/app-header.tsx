import { Link, NavLink } from 'react-router-dom';
import styles from './app-header.module.css';

import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getUser } from '@/services/user/reducer';

export const AppHeader = () => {
	const user = useSelector(getUser);

	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					<NavLink to={'/'} className={styles.link}>
						{({ isActive }) => (
							<>
								<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
								<p
									className={`${isActive ? styles.link_active : ''} text text_type_main-default ml-2`}>
									Конструктор
								</p>
							</>
						)}
					</NavLink>

					<NavLink to={'feed'} className={`${styles.link} ml-10`}>
						{({ isActive }) => (
							<>
								<ListIcon type={isActive ? 'primary' : 'secondary'} />
								<p
									className={`${isActive ? styles.link_active : ''} text text_type_main-default ml-2`}>
									Лента заказов
								</p>
							</>
						)}
					</NavLink>
				</div>
				<div className={styles.logo}>
					<Link to='/'>
						<Logo />
					</Link>
				</div>

				<NavLink
					to={'profile'}
					className={`${styles.link} ${styles.link_position_last}`}>
					{({ isActive }) => (
						<>
							<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
							<p
								className={`${isActive ? styles.link_active : ''} text text_type_main-default ml-2`}>
								{user ? user.name : 'Личный кабинет'}
							</p>
						</>
					)}
				</NavLink>
			</nav>
		</header>
	);
};
