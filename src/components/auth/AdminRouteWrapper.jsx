import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const AdminRouteWrapper = ({ children }) => {
  const { currentUser, isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  // Nếu chưa đăng nhập, redirect về trang chủ với dialog login
  if (!isAuthenticated || !currentUser) {
    return <Navigate to='/?login=true' state={{ from: location }} replace />
  }

  // Nếu đã đăng nhập nhưng không phải admin, redirect về unauthorized
  if (!isAdmin) {
    return <Navigate to='/unauthorized' replace />
  }

  // Nếu là admin, cho phép truy cập
  return children
}

export default AdminRouteWrapper
