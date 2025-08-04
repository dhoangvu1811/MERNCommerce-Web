import { useSelector } from 'react-redux'

// Custom hook để lấy auth state từ auth slice (persist)
export const useAuth = () => {
  const auth = useSelector((state) => state.auth)

  return {
    user: auth.currentUser,
    isAuthenticated: auth.isAuthenticated
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
