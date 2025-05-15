import { useState, useCallback, useEffect } from 'react';

type UseModalOptions = {
	onOpen?: () => void;
	onClose?: () => void;
};

export const useModalVisible = (
	initialState = false,
	options?: UseModalOptions
) => {
	const [isOpen, setIsOpen] = useState(initialState);
	const { onOpen, onClose } = options ?? {};

	const open = useCallback(() => {
		setIsOpen(true);
		onOpen?.();
	}, [onOpen]);

	const close = useCallback(() => {
		setIsOpen(false);
		onClose?.();
	}, [onClose]);

	const toggle = useCallback(() => {
		setIsOpen((prev) => {
			const next = !prev;

			if (next) options?.onOpen?.();
			else options?.onClose?.();

			return next;
		});
	}, [onOpen, onClose]);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, close]);

	return [isOpen, open, close, toggle] as const;
};
