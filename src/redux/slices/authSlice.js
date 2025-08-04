import { createSlice } from '@reduxjs/toolkit'

// Initial state chỉ cho authentication và persist
const initialState = {
  currentUser: null,
  isAuthenticated: false
}

// Auth slice chỉ để persist user data
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user khi login thành công
    setUser: (state, action) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
    },

    // Clear user khi logout
    clearUser: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    },

    // Update user info (khi update profile)
    updateUser: (state, action) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload }
      }
    }
  }
})

export const { setUser, clearUser, updateUser } = authSlice.actions
export default authSlice.reducer
