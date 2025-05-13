import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';
import { ModalOverlay } from './modal-overlay/modal-overlay';

type TModalProps = {
	title?: string;
	children: ReactNode;
	onClose: () => void;
};

export const Modal = ({
	title,
	children,
	onClose,
}: TModalProps): React.JSX.Element => {
	const modalRoot = document.getElementById('modals');

	return createPortal(
		<>
			<div className={`${styles.modal} p-10`}>
				<div className={styles.header}>
					<p className='text text_type_main-large'>{title}</p>

					<CloseIcon
						className={styles.closeButton}
						type='primary'
						onClick={onClose}
					/>
				</div>

				{children}
			</div>
			<ModalOverlay onClose={onClose} />
		</>,
		modalRoot!
	);
};
