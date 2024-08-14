import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
        currentUser:null,
        error:null,
        loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSucess:(state,action)=>{
            state.currentUser=action.payload,
            state.error=null
            state.loading=false
        },
        SignInFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        }
    }
})

export const {signInStart, signInSucess, SignInFailure} = userSlice.actions;
export default userSlice.reducer
