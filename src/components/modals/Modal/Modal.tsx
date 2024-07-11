import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
	children: ReactNode;
	closeModal: () => void;
}

function Modal({ children, closeModal }: ModalProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			onClick={closeModal}
			className="modal"
		>
			{children}
		</motion.div>
	);
}

export default Modal;
