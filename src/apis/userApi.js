import axiosInstance from './axiosConfig'

export const userApi = {
  // Public routes
  register: async (userData) => {
    const response = await axiosInstance.post('/users/register', userData)
    return response.data
  },

  login: async (loginData) => {
    const response = await axiosInstance.post('/users/login', loginData)
    return response.data
  },

  logout: async () => {
    const response = await axiosInstance.post('/users/logout')
    return response.data
  },

  refreshToken: async () => {
    const response = await axiosInstance.post('/users/refresh-token')
    return response.data
  },

  // Protected routes
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/users/me')
    return response.data
  },

  updateCurrentUser: async (userData) => {
    // Sử dụng FormData cho upload avatar
    const formData = new FormData()

    Object.keys(userData).forEach((key) => {
      if (
        key !== 'avatar' &&
        userData[key] !== undefined &&
        userData[key] !== null
      ) {
        formData.append(key, userData[key])
      }
    })

    if (userData.avatar && userData.avatar instanceof File) {
      formData.append('avatar', userData.avatar)
    }

    const response = await axiosInstance.put('/users/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  updatePassword: async (passwordData) => {
    const response = await axiosInstance.put('/users/me/password', passwordData)
    return response.data
  },

  uploadAvatar: async (avatarFile) => {
    const formData = new FormData()
    formData.append('avatar', avatarFile)

    const response = await axiosInstance.post(
      '/users/upload-avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response.data
  },

  getUserDetails: async (userId) => {
    const response = await axiosInstance.get(`/users/details/${userId}`)
    return response.data
  },

  // Admin routes
  getAllUsers: async (params = {}) => {
    const queryString = new URLSearchParams()

    if (params.page) queryString.append('page', params.page)
    if (params.itemsPerPage) queryString.append('itemsPerPage', params.itemsPerPage)
    if (params.search) queryString.append('search', params.search)
    if (params.role) queryString.append('role', params.role)
    if (params.status) queryString.append('status', params.status)
    if (params.sortBy) queryString.append('sortBy', params.sortBy)
    if (params.sortOrder) queryString.append('sortOrder', params.sortOrder)

    const url = `/users/all${
      queryString.toString() ? `?${queryString.toString()}` : ''
    }`
    const response = await axiosInstance.get(url)
    return response.data
  },

  createUserByAdmin: async (userData) => {
    const response = await axiosInstance.post('/users/create', userData)
    return response.data
  },

  updateUserByAdmin: async (userId, userData) => {
    const response = await axiosInstance.put(
      `/users/update/${userId}`,
      userData
    )
    return response.data
  },

  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(`/users/delete/${userId}`)
    return response.data
  },

  deleteMultipleUsers: async (userIds) => {
    const response = await axiosInstance.post('/users/delete-multiple', {
      userIds
    })
    return response.data
  }
}

export default userApi
