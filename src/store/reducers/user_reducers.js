import { createSlice } from "@reduxjs/toolkit";

import { getAllConstituency, signInUser,signUpUser ,g, getAllConstituencyetAllStaffs, getAllStaffs, registerUser, activateAccount} from "../actions/users_actions";
// import {  getAllConstituency, getAllStaffs, getUserById, myProfile, signInUser, signUpUser, updateMe, updateUser } from "../actions/user_actions";


export const userSlice = createSlice({
    name: "users",
    initialState : {
        loged_user : null,
        current_user :  null,
        user_profile : null,
        users : [],
        staffs : [],
        constituencies : [],
        status :  '',
        error  :  null,
        message : ""
    },

    reducers : {
        all_users : (state,action) =>{
            state.users.push(action.payload)
        },
        create_user : (state, action) => {
            state.current_user.push(action.payload)
        },
        signIn : (state,action) => {
            state.loged_user.push(action.payload)
        },
        constituencies : (state,action) => {
            state.constituencies.push(action.payload);
        }
    },
    extraReducers (builder){
        builder
        .addCase(signInUser.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(signInUser.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "Succesfull loged in";
            state.loged_user = action.payload
        })
        .addCase(signInUser.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = action.error.message;
        })
        .addCase(signUpUser.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(signUpUser.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "New account created  succesfully ";
            state.users = action.payload
        })
        .addCase(signUpUser.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = action.error.message
        })

        .addCase(registerUser.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(registerUser.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "New account user succesfully ";
            state.current_user = action.payload
        })
        .addCase(registerUser.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = action.error.message
        })
        .addCase(getAllStaffs.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(getAllStaffs.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "User data found succesfully ";
            state.staffs = action.payload
        })
        .addCase(getAllStaffs.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = action.error.message
        })
        .addCase(getAllConstituency.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(getAllConstituency.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "Constintuecy data found succesfully ";
            state.constituencies = action.payload;
        })
        .addCase(getAllConstituency.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = action.error.message;
        })
        .addCase(activateAccount.pending,(state,action) => {
            state.status = "Loading"
        })
        .addCase(activateAccount.fulfilled, (state,action) => {
            state.status = "Successfull";
            state.message = "Account activated succesfully ";
            state.current_user = action.payload
        })
        .addCase(activateAccount.rejected, (state,action) => {
            state.status = "Failed";
            state.message = "Request  failed please try again";
            state.error = action.error.message
        })
        // .addCase(updateUser.pending,(state,action) => {
        //     state.status = "Loading"
        // })
        // .addCase(updateUser.fulfilled, (state,action) => {
        //     state.status = "Successfull";
        //     state.message = "New account created  succesfully ";
        //     state.current_user = action.payload
        // })
        // .addCase(updateUser.rejected, (state,action) => {
        //     state.status = "Failed";
        //     state.message = "Request  failed please try again";
        //     state.error = action.error.message
        // })
        // .addCase(myProfile.pending,(state,action) => {
        //     state.status = "Loading"
        // })
        // .addCase(myProfile.fulfilled, (state,action) => {
        //     state.status = "Successfull";
        //     state.message = "New account created  succesfully ";
        //     state.user_profile = action.payload
        // })
        // .addCase(myProfile.rejected, (state,action) => {
        //     state.status = "Failed";
        //     state.message = "Request  failed please try again";
        //     state.error = action.error.message
        // })
        // .addCase(updateMe.pending,(state,action) => {
        //     state.status = "Loading"
        // })
        // .addCase(updateMe.fulfilled, (state,action) => {
        //     state.status = "Successfull";
        //     state.message = "New account created  succesfully ";
        //     state.user_profile = action.payload
        // })
        // .addCase(updateMe.rejected, (state,action) => {
        //     state.status = "Failed";
        //     state.message = "Request  failed please try again";
        //     state.error = action.error.message
        // })
    }
})


export const {signIn, create_user, all_users, constituencies} =  userSlice.actions;
export default userSlice.reducer;