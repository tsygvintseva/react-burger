import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';
import { ModalOverlay } from './modal-overlay/modal-overlay';

type TModalProps = {
	title?: string;
	titleTextType?: TitleTextType;
	children: ReactNode;
	onClose: () => void;
};

export enum TitleTextType {
	Digits = 'digits',
	MainLarge = 'main-large',
}

export const Modal = ({
	title,
	titleTextType,
	children,
	onClose,
}: TModalProps): React.JSX.Element => {
	const modalRoot = document.getElementById('modals');

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEsc);

		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	return createPortal(
		<>
			<div className={`${styles.modal} p-10`}>
				<div className={styles.header}>
					<p
						className={`${titleTextType === TitleTextType.Digits ? 'text_type_digits-default' : 'text_type_main-large'} text`}>
						{title}
					</p>

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
