import axios from 'axios'
import { toast } from 'react-toastify'
import { API_CONFIG } from '~/utils/constants'

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

// Response interceptor - xử lý response trước khi trả về component
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Xử lý tập trung phần hiển thị lỗi trả về từ mọi API ở đây (viết code một lần: Clean code)
    //Bất kỳ mã trạng thái nào nằm ngoài phạm vi 2xx là error sẽ rơi vào đây
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
