import axiosInstance from './axiosConfig'

// Session API endpoints
const sessionApi = {
  // Admin routes - quản lý sessions của tất cả users

  getUserSessions: async (userId) => {
    const response = await axiosInstance.get(`/users/sessions/${userId}`)
    return response.data
  },

  revokeSession: async (sessionId) => {
    const response = await axiosInstance.post('/users/revoke-session', {
      sessionId
    })
    return response.data
  },

  revokeAllUserSessions: async (userId) => {
    const response = await axiosInstance.delete(
      `/users/revoke-all-sessions/${userId}`
    )
    return response.data
  },

  // User routes - quản lý sessions của chính mình

  getCurrentUserSessions: async () => {
    const response = await axiosInstance.get('/users/my-sessions')
    return response.data
  },

  revokeMySession: async (sessionId) => {
    const response = await axiosInstance.post('/users/revoke-my-session', {
      sessionId
    })
    return response.data
  },

  // Utility functions cho admin management

  getUsersWithSessionSummary: async () => {
    const response = await axiosInstance.get('/users/overview')
    return response.data
  }
}

export default sessionApi
