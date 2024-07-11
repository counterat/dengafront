import { useAppDispatch } from 'hooks/store';
import Modal from '../Modal';

import c from './GiveMoneyModal.module.scss';
import { setIsModalGiveMoney } from 'store/reducers/modalsReducer';
import { Img } from 'react-image';
import Loader from 'components/Loader';
import { useState } from 'react';

interface GiveMoneyModalProps {}

const links = {
	path: 'https://t.me/testtappybird_bot',
	text: 'Hello world!',
};

function GiveMoneyModal({}: GiveMoneyModalProps) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const dispatch = useAppDispatch();

	const handleClose = () => {
		dispatch(setIsModalGiveMoney(false));
	};

	return (
		<Modal closeModal={handleClose}>
			<div className={c.modal}>
				<Img
					src="/assets/giveMoneyModal.png"
					alt="give money modal"
					className={c.image}
					loader={<Loader />}
					onLoad={() => setImageLoaded(true)}
				/>
				{imageLoaded && (
					<a
						className={c.invite}
						href={`https://telegram.me/share/url?url=${links.path}&text=${links.text}`}
						onClick={(event) => event.stopPropagation()}
					>
						<img src="/assets/invite.png" alt="invite friend" />
					</a>
				)}
			</div>
		</Modal>
	);
}

export default GiveMoneyModal;
