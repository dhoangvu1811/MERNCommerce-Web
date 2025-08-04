import axios from 'axios'
import { toast } from 'react-toastify'
import { clearUser } from '../redux/slices/authSlice'
import { API_CONFIG } from '~/utils/constants'

/**
 * Không thể import {store} from '~/redux/store' theo cách thông thường ở đây
 * Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component như file authorizeAxios hiện tại
 * Hiểu đơn giản: khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi hàm InjectStore ngay lập tức để gắn biến mainStore vào biến axiosReduxStore cục bộ trong file này
 */
let axiosReduxStore
let logoutCallback

export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

export const setLogoutCallback = (callback) => {
  logoutCallback = callback
}

// Helper function để dispatch logout action
const dispatchLogout = () => {
  if (axiosReduxStore) {
    // Gọi API logout để cleanup backend - sử dụng axios base để tránh interceptor
    axios
      .post(
        `${API_CONFIG.BASE_URL}/users/logout`,
        {},
        { withCredentials: true }
      )
      .catch(() => {
        // Silent error - không cần show error nếu logout API fail
        // Vì user đã bị logout tự động do token hết hạn
      })

    // Clear Redux state - dispatch clearUser cho authSlice
    axiosReduxStore.dispatch(clearUser())
  }
  // Gọi callback nếu có (ví dụ: redirect đến login page)
  if (logoutCallback) {
    logoutCallback()
  }
}

// Tạo axios instance với base configuration
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// Request interceptor - xử lý trước khi gửi request
axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Quản lý refresh token promise
let refreshTokenPromise = null

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    /** Khu vực quan trọng: Xử lý Refresh Token tự động */
    // Nếu nhận mã lỗi 401 thì logout luôn
    if (error.response?.status === 401) {
      // Dispatch logout action để clear Redux state
      dispatchLogout()
      return Promise.reject(error)
    }

    // Nếu nhận mã 410 GONE thì gọi API refresh token để làm mới lại accessToken
    // Đầu tiên cần lấy được các request API đang bị lỗi thông qua error.config
    const originalRequest = error.config
    if (error.response?.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {
        // Gọi API refresh token - sử dụng axios trực tiếp để tránh circular dependency
        refreshTokenPromise = axios
          .post(
            `${API_CONFIG.BASE_URL}/users/refresh-token`,
            {},
            {
              withCredentials: true
            }
          )
          .then(() => {
            // Token được update tự động trong cookie bởi backend
          })
          .catch((_error) => {
            // Dispatch logout action để clear Redux state
            dispatchLogout()
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      // Cuối cùng mới return lại cái refreshTokenPromise trong trường hợp thành công
      return refreshTokenPromise.then(() => {
        // Bước cuối cùng quan trọng: return lại axios instance kết hợp originalRequest để gọi lại các request bị lỗi
        return axiosInstance(originalRequest)
      })
    }

    // Xử lý lỗi tập trung - hiển thị thông báo lỗi từ API
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    // Dùng toast để hiển thị mọi mã lỗi lên màn hình trừ 410 - GONE phục vụ việc refresh lại token
    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
