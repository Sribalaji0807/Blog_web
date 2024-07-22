import { createSlice, current } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,

}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action)=>{
            state.loading=false;
            state.currentUser=action.payload;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        updateSuccess:(state,action)=>{
            state.loading=false;
            state.currentUser=action.payload;
            state.error=null;
        },
        updateFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
       deleteusersuccess:(state)=>{
           state.currentUser=null;

       },
    }
})
export const {signInFailure,signInStart,signInSuccess,updateStart,updateSuccess,updateFailure,deleteusersuccess}=userSlice.actions;
export default userSlice.reducer;