import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Props {
	isModal: boolean;
	isModalGiveMoney: boolean;
	isModalTakeMoney: boolean;
	isModalBebra: boolean;
	isModalBeggar: boolean;
}

const initialState: Props = {
	isModal: false,
	isModalGiveMoney: false,
	isModalTakeMoney: false,
	isModalBebra: false,
	isModalBeggar: false,
};

const modalSlice = createSlice({
	name: 'modals',
	initialState: { ...initialState },
	reducers: {
		setIsModalGiveMoney(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalGiveMoney = true;
				state.isModal = true;
			} else {
				state.isModalGiveMoney = false;
				state.isModal = false;
			}
		},
		setIsModalTakeMoney(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalTakeMoney = true;
				state.isModal = true;
			} else {
				state.isModalTakeMoney = false;
				state.isModal = false;
			}
		},
		setIsModalBebra(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalBebra = true;
				state.isModal = true;
			} else {
				state.isModalBebra = false;
				state.isModal = false;
			}
		},
		setIsModalBeggar(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalBeggar = true;
				state.isModal = true;
			} else {
				state.isModalBeggar = false;
				state.isModal = false;
			}
		},
	},
});

export const {
	setIsModalGiveMoney,
	setIsModalTakeMoney,
	setIsModalBebra,
	setIsModalBeggar,
} = modalSlice.actions;

export default modalSlice.reducer;
