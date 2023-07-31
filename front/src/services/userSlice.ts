import {createSlice} from '@reduxjs/toolkit'
import {IUser} from "../types/userInterface";

// Slice

export interface TUserState {
    isAuth: boolean,
    user: IUser
}

const resetState: IUser = {
    token: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userRole: '',
    cardNumber: '',
    id: null,
};

const initialState: TUserState = {
        user: resetState,
        isAuth: false
    };

    const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
        setUser(state, action) {
            console.log(action)
            state.isAuth = true;
            state.user.token = action.payload.token;
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
            state.user.phoneNumber = action.payload.phoneNumber;
            state.user.email = action.payload.email;
            state.user.userRole = action.payload.userRole;
            state.user.cardNumber = action.payload.cardNumber;
            state.user.id = action.payload.id;
        },
        changeDataUser(state, action){
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
            state.user.phoneNumber = action.payload.phoneNumber;
            state.user.cardNumber = action.payload.cardNumber;
        },
        removeUser(state) {
            state.isAuth = false;
            state.user.token = '';
            state.user.firstName = '';
            state.user.lastName = '';
            state.user.phoneNumber = '';
            state.user.email = '';
            state.user.userRole = '';
            state.user.cardNumber = '';
            state.user.id = null;
        },

    },
});

export default slice.reducer

export const {loginSuccess, setUser, removeUser, changeDataUser} = slice.actions
