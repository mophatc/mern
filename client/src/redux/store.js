import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  userReducer  from './user/userSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const combinedReducer = combineReducers({
    user:userReducer
})

const persistConfig = {
    key:'root', 
    storage, 
    version:1
}

const peristedReducer = persistReducer(persistConfig, combinedReducer)

export const store = configureStore({
  reducer: peristedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false
  }),
})

export const persistor = persistStore(store);
 