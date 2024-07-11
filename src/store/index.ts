import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/userReducer';
import modalsReducer from './reducers/modalsReducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		modals: modalsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
