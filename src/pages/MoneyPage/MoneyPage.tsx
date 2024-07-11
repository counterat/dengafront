import { useEffect, useState } from 'react';
import { setUser } from 'store/reducers/userReducer';
import c from './MoneyPage.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import {
	setIsModalBebra,
	setIsModalGiveMoney,
	setIsModalTakeMoney,
} from 'store/reducers/modalsReducer';
import { FetchUser } from 'api/user';
import { changeIsGivenMoney } from 'store/reducers/userReducer';
import { ton } from 'constants/tonObject';
import { socket } from 'index';

export default function MoneyPage() {
	const dispatch = useAppDispatch();
	const { isGivenMoney, isTakenMoney } = useAppSelector(
		(state) => state.user.user
	);
	//Состояние отвечающее сколько друзей пришло по реф ссылке и дали деньгу
	const sniffBebra = async (userId:number, sign: string) => {
		try {
			const result = await FetchUser.sniff_bebra(userId, sign);

			console.log('Authorization successful:', result);
			return result;
		} catch (error) {
			console.error('Authorization failed:', error);
		}
	};

	const reqPayout = async (userId:number, sign: string) => {
		try {
			const result = await FetchUser.request_payout(userId, sign);

			console.log('Authorization successful:', result);
			return result;
		} catch (error) {
			console.error('Authorization failed:', error);
		}
	};
	const reqPayoutHandler = ()=>{
		reqPayout(userData.id, userData.sign).then(json=>{
			if (json){
				dispatch(setUser(json))
				dispatch(setIsModalTakeMoney(true));
			
		}})
	}



	const sniffBebraHandler = ()=>{
		sniffBebra(userData.id, userData.sign).then(json=>{
			if (json){
				dispatch(setUser(json))
				dispatch(setIsModalBebra(true))
			
		}})
	}

	

	const [needFriends, _setNeedFriends] = useState(2);
	const userData = useAppSelector(state=>state.user.user.data)
	const links = {
		path: userData.invite_link,
		text: 'Hello world!',
	};
	
	

	
const sendTrans = async ()=>{
	const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
            {
                address: userData.wallet,
                amount: String(1 * 1e9),
     
             // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
            },]
       
      };
	  await ton.sendTransaction(transaction).then(resp=>{
		console.log(resp)
		dispatch(setIsModalGiveMoney(true));
		
	  });
}	
	return (
		<section className={c.money}>
			<div className={c.money__actions}>
				<button
					className={c.money__actions_give}
					onClick={() => {
						sendTrans()
					}}
					disabled={Number( userData.balance_in_ton) > 0}
				>
					{Number( userData.balance_in_ton) > 0 ? (
						<img src="/assets/giveMoney_grey.png" alt="give money" />
					) : (
						<img src="/assets/giveMoney.png" alt="give money" />
					)}
				</button>
				<a
					className={c.money__actions_invite}
					href={`https://telegram.me/share/url?url=${links.path}&text=${links.text}`}
				>
					<img src="/assets/invite.png" alt="invite friend" />
				</a>
				<div
					className={c.money__actions_count}
					style={{
						backgroundImage: `url(${
							userData.amount_of_deposits_made_by_friends == needFriends
								? '/assets/greenBox.png'
								: userData.amount_of_deposits_made_by_friends !== 0
								? '/assets/yellowBox.png'
								: '/assets/greyBox.png'
						})`,
					}}
				>
					{userData.amount_of_deposits_made_by_friends}/{needFriends}
				</div>
				<button
					className={c.money__actions_take}
					disabled={!(Number( userData.balance_in_ton) > 0 ) || userData.amount_of_deposits_made_by_friends < 2}
					onClick={() => {
						reqPayoutHandler()
					}}
				>
					{Number( userData.balance_in_ton) > 0 && userData.amount_of_deposits_made_by_friends >=2? (
						<img src="/assets/takeMoney.png" alt="take money" />
					) : (
						<img src="/assets/takeMoney_grey.png" alt="take money" />
					)}
				</button>
			</div>
			<button
				className={c.money__smell}
				onClick={() =>sniffBebraHandler() }
				disabled ={ !(Number( userData.balance_in_ton) > 0)}
			>
				<img src="/assets/smell.png" alt="smell" />
			</button>
		</section>
	);
}
