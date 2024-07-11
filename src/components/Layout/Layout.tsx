import { Outlet } from 'react-router-dom';

import c from './Layout.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import Modal from 'components/modals/Modal';
import GiveMoneyModal from 'components/modals/GiveMoneyModal';
import {
	setIsModalBebra,
	setIsModalBeggar,
	setIsModalTakeMoney,
} from 'store/reducers/modalsReducer';
import { useEffect, useRef, useState } from 'react';
import { Img } from 'react-image';
import Loader from 'components/Loader';
import { socket } from 'index';
import { setUser } from 'store/reducers/userReducer';
interface LayoutProps {}

export default function Layout({}: LayoutProps) {
	const dispatch = useAppDispatch();
	const {
		isModal,
		isModalGiveMoney,
		isModalTakeMoney,
		isModalBebra,
		isModalBeggar,
	} = useAppSelector((state) => state.modals);
	const userData = useAppSelector(state=>state.user.user.data)
	console.log(userData)
	useEffect(()=>{
		socket.onmessage = function (event) {
			let data = event.data;
	
			console.log(data)
			data = JSON.parse(data);
			if (data.eventname == 'ping') {
				console.log(data);
				if (data.userId == userData.id) {
					socket.send(
						JSON.stringify({
							eventname: 'pong',
							userId: userData.id,
						})
					);
				}
			}
			if (data.eventname == 'paid_invoice'){
				if (data.user.id == userData.id){
					delete data.user.eventname
					dispatch(setUser(data.user))
					console.log(userData)
				}
			}
			/* if (data.eventname == 'energy_replenishment'){
				console.log('energy_replenishment')
				console.log(data)
				console.log([data.id, user.id, data.id==user.id])
				if (data.id==user.id){
					console.log([data.id, user.id])
					dispatch(changeEnergy(data.energy))
					console.log(data)
				}
			} */
		};
	},[userData.id])
	return (
		<div className={c.layout}>
			<header className={c.header}>
				<img src="/assets/money.png" alt="money" />
			</header>
			{isModalGiveMoney && <GiveMoneyModal />}
			{isModalTakeMoney && (
				<Modal
					children={
						<Img
							src="/assets/takeMoneyModal.png"
							alt="take money modal"
							loader={<Loader />}
						/>
					}
					closeModal={() => dispatch(setIsModalTakeMoney(false))}
				/>
			)}
			{isModalBebra && (
				<Modal
					children={
						<Img
							src="/assets/bebraModal.png"
							alt="bebra modal"
							loader={<Loader />}
						/>
					}
					closeModal={() => dispatch(setIsModalBebra(false))}
				/>
			)}
			{isModalBeggar && (
				<Modal
					children={
						<Img
							src="/assets/beggarModal.png"
							alt="beggar modal"
							loader={<Loader />}
						/>
					}
					closeModal={() => dispatch(setIsModalBeggar(false))}
				/>
			)}
			{!isModal && (
				<main className={c.main}>
					<Outlet />
				</main>
			)}
		</div>
	);
}
