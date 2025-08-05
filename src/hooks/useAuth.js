import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentUser } from '../redux/slices/authSlice'
import { logoutUser } from '../redux/slices/userSlice'

// Custom hook để lấy auth state từ auth slice (persist)
export const useAuth = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const logout = async (showSuccessMessage = true) => {
    await dispatch(logoutUser(showSuccessMessage)).unwrap()
  }

  const refreshUser = async () => {
    // Dispatch fetchCurrentUser để cập nhật Redux state đồng bộ
    const result = await dispatch(fetchCurrentUser()).unwrap()
    return result
  }

  return {
    currentUser: auth.currentUser,
    user: auth.currentUser, // alias cho compatibility
    isAuthenticated: auth.isAuthenticated,
    isAdmin: auth.currentUser?.role === 'admin',
    logout,
    refreshUser
  }
}

// Custom hook để lấy user management state
export const useUsers = () => {
  const user = useSelector((state) => state.user)

  return {
    users: user.users,
    selectedUser: user.selectedUser,
    pagination: user.pagination
  }
}

// Custom hook để check quyền admin
export const useIsAdmin = () => {
  const { user } = useAuth()
  return user?.role === 'admin'
}

// Custom hook để check xem user có phải owner của resource không
export const useIsOwner = (resourceUserId) => {
  const { user } = useAuth()
  return user?._id === resourceUserId
}
