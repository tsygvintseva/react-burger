import { useParams } from 'react-router-dom';
import { Modal, TitleTextType } from '../modal/modal';
import { OrderItemDetails } from '../order-item-details/order-item-details';

type TOrderModalProps = {
	onClose: () => void;
};

export const OrderModal = ({
	onClose,
}: TOrderModalProps): React.JSX.Element => {
	const { number } = useParams();

	return (
		<Modal
			title={`#${number}`}
			titleTextType={TitleTextType.Digits}
			onClose={onClose}>
			<OrderItemDetails />
		</Modal>
	);
};
