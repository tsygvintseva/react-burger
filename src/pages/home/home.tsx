import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './home.module.css';

import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';

export const HomePage = (): React.JSX.Element => {
	return (
		<section className={styles.app}>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<div className={`${styles.content} pl-5 pr-5`}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</div>
		</section>
	);
};
