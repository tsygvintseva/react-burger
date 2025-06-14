import styles from './not-found.module.css';
import notFound from '@/images/404.png';

export const NotFoundPage = (): React.JSX.Element => {
	return (
		<img src={notFound} alt='Страница не найдена' className={styles.img} />
	);
};
