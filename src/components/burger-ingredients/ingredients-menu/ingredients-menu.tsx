import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { EIngredientType } from '@/utils/enums';
import styles from './ingredients-menu.module.css';

type TIngredientsMenuProps = {
	tabs: { value: EIngredientType; name: string }[];
	activeTab: EIngredientType;
	setActiveTab: (active: string) => void;
};

export const IngredientsMenu = ({
	tabs,
	activeTab,
	setActiveTab,
}: TIngredientsMenuProps): React.JSX.Element => {
	return (
		<nav>
			<ul className={styles.menu}>
				{tabs.map(({ value, name }) => (
					<Tab
						key={value}
						value={value}
						active={activeTab === value}
						onClick={setActiveTab}>
						{name}
					</Tab>
				))}
			</ul>
		</nav>
	);
};
