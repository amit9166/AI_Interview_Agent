import { createSlice } from '@reduxjs/toolkit'
import { getStoredUser } from '../utils/authStorage'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: getStoredUser(),
    authLoading: true,
  },
  reducers: {
    setUserData: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.userData = action.payload
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUserData, setAuthLoading} = userSlice.actions

export default userSlice.reducer; 
