import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userApi } from '../../apis/userApi'

// Async thunk để fetch current user từ API
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async () => {
    // Không cần try/catch vì axios interceptor đã xử lý tất cả lỗi
    // (401: auto logout, 410: auto refresh token, errors: auto toast)
    const data = await userApi.getCurrentUser()
    return data
  }
)

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
  },
  extraReducers: (builder) => {
    builder
      // fetchCurrentUser fulfilled - chỉ cần trường hợp thành công
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data.user
        state.isAuthenticated = true
      })
  }
})

export const { setUser, clearUser, updateUser } = authSlice.actions
export default authSlice.reducer