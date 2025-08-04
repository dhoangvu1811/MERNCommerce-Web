import axiosInstance from './axiosConfig'

// Tạo sản phẩm mới
export const createProduct = async (productData) => {
  const response = await axiosInstance.post('/products/create', productData)
  return response.data
}

// Lấy danh sách sản phẩm
export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get('/products/getAll', { params })
  return response.data
}

// Lấy chi tiết sản phẩm theo ID
export const getProductById = async (productId) => {
  const response = await axiosInstance.get(`/products/details/${productId}`)
  return response.data
}

// Cập nhật sản phẩm
export const updateProduct = async (productId, updateData) => {
  const response = await axiosInstance.put(
    `/products/update/${productId}`,
    updateData
  )
  return response.data
}

// Xóa sản phẩm theo ID
export const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/products/delete/${productId}`)
  return response.data
}

// Xóa nhiều sản phẩm cùng lúc
export const deleteMultipleProducts = async (productIds) => {
  const response = await axiosInstance.post('/products/deleteSelected', {
    data: { productIds }
  })
  return response.data
}

// Lấy tất cả loại sản phẩm
export const getAllProductTypes = async () => {
  const response = await axiosInstance.get('/products/getAllType')
  return response.data
}

// Upload ảnh sản phẩm
export const uploadProductImage = async (imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)

  const response = await axiosInstance.post(
    '/products/upload-image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}
