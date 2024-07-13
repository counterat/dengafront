import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userDataType {
	id: number;
	telegram_id: number;
	name: string;
	username: string;
	invitation_code: number;
	invited_users: number[];
	amount_of_deposits_made_by_friends: number;
	sign: string;
	balance_in_ton: string; // или number, если это число
	is_can_withdraw: boolean;
	users_wallet: string | null;
	wallet_bound_to_user: number;
	created_at: string; // или Date, если вы хотите использовать объект Date
	invited_by: number | null;
	invite_link?: string;
	wallet : string;
	is_blocked_payment: false 
  }
  
interface Props {
	user: {
		data: userDataType;
		isGivenMoney: boolean;
		isTakenMoney: boolean;
	};
}

const initialState: Props = {
	user: {
		data:{
			id: 0,
			telegram_id: 0,
			name: '',
			username: '',
			invitation_code: 0,
			invited_users: [],
			amount_of_deposits_made_by_friends: 0,
			sign: '',
			balance_in_ton: '0', // или 0, в зависимости от типа
			is_can_withdraw: false,
			users_wallet: null,
			wallet_bound_to_user: 0,
			created_at: '', // или текущая дата в формате строки
			invited_by: null,
			invite_link: undefined,
			wallet: '',
			is_blocked_payment: false
		},
		isGivenMoney: false,
		isTakenMoney: false,
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState: { ...initialState },
	reducers: {
		setUserId(state, action) {
			state.user.data.id = action.payload;
		},
		setUser(state, action) {
			state.user.data = action.payload;
		},
		changeIsGivenMoney(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.user.isGivenMoney = true;
			} else {
				state.user.isGivenMoney = false;
			}
		},
		changeIsTakenMoney(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.user.isTakenMoney = true;
			} else {
				state.user.isTakenMoney = false;
			}
		},
	},
});

export const { setUser, setUserId, changeIsTakenMoney, changeIsGivenMoney } = userSlice.actions;

export default userSlice.reducer;
