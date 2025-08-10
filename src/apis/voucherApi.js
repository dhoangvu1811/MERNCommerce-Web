import axiosInstance from './axiosConfig'

// Public: Verify voucher
export const verifyVoucher = async ({ code, orderTotal }) => {
  const response = await axiosInstance.post('/vouchers/verify', {
    code,
    orderTotal
  })
  return response.data
}

// Public: List active vouchers (for users)
export const getActiveVouchers = async () => {
  const response = await axiosInstance.get('/vouchers/active')
  return response.data
}

// Admin: List vouchers with pagination and filters
export const getVouchersAll = async ({
  page = 1,
  itemsPerPage = 10,
  search,
  type,
  isActive,
  sort = 'createdAt_desc'
} = {}) => {
  const params = { page, itemsPerPage, sort }
  if (search) params.search = search
  if (type) params.type = type
  if (typeof isActive === 'string') params.isActive = isActive

  const response = await axiosInstance.get('/vouchers/all', {
    params
  })
  return response.data
}

// Admin: Details
export const getVoucherDetails = async (id) => {
  const response = await axiosInstance.get(`/vouchers/details/${id}`)
  return response.data
}

// Admin: Create
export const createVoucher = async (payload) => {
  const response = await axiosInstance.post('/vouchers/create', payload)
  return response.data
}

// Admin: Update
export const updateVoucher = async (id, payload) => {
  const response = await axiosInstance.put(`/vouchers/update/${id}`, payload)
  return response.data
}

// Admin: Delete single
export const deleteVoucher = async (id) => {
  const response = await axiosInstance.delete(`/vouchers/delete/${id}`)
  return response.data
}

// Admin: Delete multiple
export const deleteMultipleVouchers = async (voucherIds) => {
  const response = await axiosInstance.post('/vouchers/delete-multiple', {
    voucherIds
  })
  return response.data
}
