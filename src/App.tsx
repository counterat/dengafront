import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Router from 'Router';
import store from 'store';

import 'styles/global.scss';

function App() {
	useEffect(() => {
		window.Telegram.WebApp.expand();
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
