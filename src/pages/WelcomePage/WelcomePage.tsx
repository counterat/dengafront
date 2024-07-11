import { useNavigate } from 'react-router-dom';
import { ton } from 'constants/tonObject';
import c from './WelcomePage.module.scss';
import Loader from 'components/Loader';
import { FetchUser } from 'api/user';
import { useEffect } from 'react';
import { useState } from 'react';
import { setUser, changeIsTakenMoney, changeIsGivenMoney } from 'store/reducers/userReducer';
import { useAppSelector } from 'hooks/store';
import { useDispatch } from 'react-redux';
export default function WelcomePage() {
	const navigate = useNavigate();
	const user = useAppSelector(state=>state.user.user.data)
	const [connected, setConnected] = useState(false);
	const dispatch = useDispatch()
	let invitCode: number = 0;
	if (window.location.pathname.includes('/')) {
		invitCode = Number(window.location.pathname.split('/')[1]);
	}
	const handleConnectWallet = () => {
		navigate('/money');
	};
	const fetchAuthorization = async (initdata: string, invcitCode: number) => {
		try {
			const result = await FetchUser.authorize(initdata, invcitCode);

			console.log('Authorization successful:', result);
			return result;
		} catch (error) {
			console.error('Authorization failed:', error);
		}
	};
	var WebApp = window.Telegram.WebApp;
	
	const checkConnection = () => {
		// Здесь вы должны использовать реальный метод для проверки подключения
		const isConnected = ton.connected
		setConnected(isConnected);
	  };
	
	  useEffect(()=>{
		const result = fetchAuthorization(WebApp.initData, invitCode).then(json=>{
			if (json){
				dispatch(setUser(json))
				console.log(user)
	
			}
			
		})

	  },[user.id])
	  useEffect(() => {
		// Установка интервала для проверки состояния каждые 100 мс
		const intervalId = setInterval(checkConnection, 100);
	
		// Очистка интервала при размонтировании компонента
		return () => clearInterval(intervalId);
	  }, []);

	return (
		<section className={c.welcome}>
			<div className={c.welcome__text}>
				<h3 className={c.welcome__title}>ВСЕ ПРОСТО</h3>
				<ul className={c.welcome__list_top}>
					<li>
						- даешь деньгу (<span className={c.welcome__text_blue}>1 ton</span>)
					</li>
					<li>- приглашаешь двух друзей</li>
					<li>
						- моментально забираешь деньгу (
						<span className={c.welcome__text_blue}>1,5 ton</span>)
					</li>
					<li>- повторяешь сколько угодно</li>
				</ul>
				<h3 className={c.welcome__title}>ПРАВИЛА:</h3>
				<ul className={c.welcome__list_bottom}>
					<li>
						- тот кого ты пригласил считается другом, только когда он{' '}
						<span className={c.welcome__text_green}>дал деньгу</span>
					</li>
					<li>- количество кругов не ограничено</li>
					<li>
						- время круга не ограничено,{' '}
						<span className={c.welcome__text_green}>
							умножай бабки хоть каждую минуту
						</span>
					</li>
					<li>
						- один и тот же человек может быть вашим другом неограниченное
						количество раз
					</li>
					<li>
						<span className={c.welcome__text_green}>забрать деньгу</span> можно
						- только если у вас есть два и более друзей
					</li>
					<li>
						<span className={c.welcome__text_red}>не нюхай бебру !!!</span>
					</li>
				</ul>
			</div>
			<button className={c.welcome__button} onClick={handleConnectWallet}>
				{connected ?  <img src="/assets/погнали.png" alt="wallet" /> :  <img src="/assets/connectWallet.png" alt="wallet" />}
			</button>
		</section>
	);
}
