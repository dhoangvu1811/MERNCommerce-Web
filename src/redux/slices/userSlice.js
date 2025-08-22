import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { userApi } from '~/apis/userApi'
import { setUser, clearUser, updateUser } from './authSlice'

// Initial state chỉ cho user management
const initialState = {
  // User management state (Admin)
  users: [],
  selectedUser: null,
  pagination: {
    page: 1,
    itemsPerPage: 10,
    total: 0,
    totalPages: 0
  }
}

// Authentication thunks - dispatch cho authSlice
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData, { dispatch }) => {
    const data = await userApi.login(loginData)
    // Sync với authSlice để persist
    dispatch(setUser(data.data.user))
    toast.success('Login successful!')
    return data
  }
)

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData) => {
    const data = await userApi.register(registerData)
    toast.success('Registration successful! Please log in.')
    return data
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (showSuccessMessage = true, { dispatch }) => {
    await userApi.logout()
    // Clear auth state
    dispatch(clearUser())
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return true
  }
)

export const refreshToken = createAsyncThunk('user/refreshToken', async () => {
  const data = await userApi.refreshToken()
  return data
})

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { dispatch }) => {
    const data = await userApi.getCurrentUser()
    // Sync với authSlice
    dispatch(setUser(data.data))
    return data
  }
)

// User management thunks
export const updateCurrentUser = createAsyncThunk(
  'user/updateCurrentUser',
  async (userData, { dispatch }) => {
    const data = await userApi.updateCurrentUser(userData)
    // Sync updated user với authSlice
    dispatch(updateUser(data.data))
    toast.success('Profile updated successfully!')
    return data
  }
)

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (passwordData) => {
    const data = await userApi.updatePassword(passwordData)
    toast.success('Password updated successfully!')
    return data
  }
)

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (userId) => {
    const data = await userApi.getUserDetails(userId)
    return data
  }
)

// Admin actions
export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (params) => {
    const data = await userApi.getAllUsers(params)
    return data
  }
)

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const data = await userApi.createUserByAdmin(userData)
    return data
  }
)

export const updateUserByAdmin = createAsyncThunk(
  'user/updateUserByAdmin',
  async ({ userId, userData }) => {
    const data = await userApi.updateUserByAdmin(userId, userData)
    return data
  }
)

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId) => {
    const data = await userApi.deleteUser(userId)
    return { userId, ...data }
  }
)

export const deleteMultipleUsers = createAsyncThunk(
  'user/deleteMultipleUsers',
  async (userIds) => {
    const data = await userApi.deleteMultipleUsers(userIds)
    return { userIds, ...data }
  }
)

// User slice chỉ cho user management
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // User management reducers
    clearSelectedUser: (state) => {
      state.selectedUser = null
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload.data }
    },
    clearUsers: (state) => {
      state.users = []
      state.selectedUser = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Auth thunks - không cần update local state vì đã sync với authSlice
      .addCase(loginUser.fulfilled, () => {
        // Auth state được handle bởi authSlice
      })

      .addCase(registerUser.fulfilled, () => {
        // Không tự động đăng nhập sau khi đăng ký
      })

      .addCase(logoutUser.fulfilled, () => {
        // Auth state được handle bởi authSlice
      })

      .addCase(getCurrentUser.fulfilled, () => {
        // Auth state được handle bởi authSlice
      })

      .addCase(updateCurrentUser.fulfilled, () => {
        // Auth state được handle bởi authSlice
      })

      .addCase(refreshToken.fulfilled, () => {
        // Refresh token chỉ làm mới token, không trả về user data
      })

      .addCase(updatePassword.fulfilled, () => {
        // Password updated successfully
      })

      // Get user details cases
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.selectedUser = action.payload.data.user
      })

      // Get all users cases (Admin)
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.data.users
        state.pagination = action.payload.data.pagination
      })

      // Create user cases
      .addCase(createUser.fulfilled, (state, action) => {
        const newUser = action.payload.data.user
        state.users.unshift(newUser) // Add to beginning of list
      })

      // Update user by admin cases
      .addCase(updateUserByAdmin.fulfilled, (state, action) => {
        const updatedUser = action.payload.data.user
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        )
        if (index !== -1) {
          state.users[index] = updatedUser
        }
        if (state.selectedUser && state.selectedUser._id === updatedUser._id) {
          state.selectedUser = updatedUser
        }
      })

      // Delete user cases
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userId = action.payload.userId
        state.users = state.users.filter((user) => user._id !== userId)
        if (state.selectedUser && state.selectedUser._id === userId) {
          state.selectedUser = null
        }
      })

      // Delete multiple users cases
      .addCase(deleteMultipleUsers.fulfilled, (state, action) => {
        const deletedUserIds = action.payload.userIds
        state.users = state.users.filter(
          (user) => !deletedUserIds.includes(user._id)
        )
        if (
          state.selectedUser &&
          deletedUserIds.includes(state.selectedUser._id)
        ) {
          state.selectedUser = null
        }
      })
  }
})

export const { clearSelectedUser, setPagination, clearUsers } =
  userSlice.actions
export default userSlice.reducer
