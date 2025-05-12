import styles from './ingredients-menu.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { EIngredientType } from '@/utils/enums';

type TIngredientsMenuProps = {
	activeTab: EIngredientType;
	tabs: { value: EIngredientType; name: string }[];
	setActiveTab: (active: string) => void;
};

export const IngredientsMenu = ({
	activeTab,
	tabs,
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
