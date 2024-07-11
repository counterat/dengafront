import { Route, Routes } from 'react-router-dom';

import Layout from 'components/Layout';
import MoneyPage from 'pages/MoneyPage';
import WelcomePage from 'pages/WelcomePage';

export default function Router() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
			<Route path="" element={<WelcomePage />} >
          		<Route path=':id' element={<WelcomePage />}/>
          	</Route>
				<Route path="money" element={<MoneyPage />} />
			</Route>
		</Routes>
	);
}
