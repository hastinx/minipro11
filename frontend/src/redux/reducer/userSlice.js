import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: 0,
        username: ''
    },
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
            console.log(action.payload)
        },
        logout: (state, action) => {
            state.id = 0
            state.username = ""
        }
    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer