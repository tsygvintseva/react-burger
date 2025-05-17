import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
	onClose?: () => void;
};

export const ModalOverlay = ({
	onClose,
}: TModalOverlayProps): React.JSX.Element => (
	/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
	<div className={styles.overlay} onClick={onClose}></div>
	/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
);
