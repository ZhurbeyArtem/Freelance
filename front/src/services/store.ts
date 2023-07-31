import { configureStore, combineReducers} from "@reduxjs/toolkit";
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import userReducer from "./userSlice";
import {authApi}  from "components/auth/authStore";
import {homeApi} from "components/jobs/homeStore";
import {bidApi} from "../components/bid/bidStore";
import { settingsApi } from "components/settings/settingsStore";
import { notificationApi } from "components/notification/notificationStore";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [bidApi.reducerPath]: bidApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({ 
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(authApi.middleware, homeApi.middleware, bidApi.middleware, settingsApi.middleware, notificationApi.middleware),
});

export const persister = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store