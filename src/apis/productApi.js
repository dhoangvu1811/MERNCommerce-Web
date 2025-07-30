import axiosInstance from './axiosConfig'

/**
 * Product API Service
 * Các hàm để tương tác với Product API endpoints
 */

/**
 * Tạo sản phẩm mới
 * @param {Object} productData - Dữ liệu sản phẩm
 * @param {string} productData.name - Tên sản phẩm (required, 2-255 chars)
 * @param {string} productData.image - URL hình ảnh (required, valid URI)
 * @param {string} productData.type - Loại sản phẩm (required, 2-100 chars)
 * @param {number} productData.countInStock - Số lượng tồn kho (required, >= 0)
 * @param {number} productData.price - Giá sản phẩm (required, > 0)
 * @param {number} [productData.rating=0] - Đánh giá (0-5)
 * @param {string} [productData.description=''] - Mô tả (max 1000 chars)
 * @param {number} [productData.selled=0] - Số lượng đã bán (>= 0)
 * @param {number} [productData.discount=0] - Giảm giá (0-100%)
 * @returns {Promise<Object>} Response với dữ liệu sản phẩm đã tạo
 */
export const createProduct = async (productData) => {
  const response = await axiosInstance.post('/products/create', productData)
  return response.data
}

/**
 * Lấy danh sách tất cả sản phẩm
 * @param {Object} params - Query parameters
 * @param {number} [params.page=1] - Số trang
 * @param {number} [params.limit=10] - Số sản phẩm mỗi trang
 * @param {string} [params.type] - Filter theo loại sản phẩm
 * @param {string} [params.sort] - Sắp xếp (price, rating, createdAt)
 * @returns {Promise<Object>} Response với danh sách sản phẩm và pagination
 */
export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get('/products/getAll', { params })
  return response.data
}

/**
 * Lấy chi tiết sản phẩm theo ID
 * @param {string} productId - ID của sản phẩm
 * @returns {Promise<Object>} Response với dữ liệu chi tiết sản phẩm
 */
export const getProductById = async (productId) => {
  const response = await axiosInstance.get(`/products/details/${productId}`)
  return response.data
}

/**
 * Cập nhật sản phẩm
 * @param {string} productId - ID của sản phẩm cần cập nhật
 * @param {Object} updateData - Dữ liệu cần cập nhật (tất cả field đều optional)
 * @returns {Promise<Object>} Response với dữ liệu sản phẩm đã cập nhật
 */
export const updateProduct = async (productId, updateData) => {
  const response = await axiosInstance.put(
    `/products/update/${productId}`,
    updateData
  )
  return response.data
}

/**
 * Xóa sản phẩm theo ID
 * @param {string} productId - ID của sản phẩm cần xóa
 * @returns {Promise<Object>} Response xác nhận xóa
 */
export const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/products/delete/${productId}`)
  return response.data
}

/**
 * Lấy tất cả loại sản phẩm
 * @returns {Promise<Object>} Response với danh sách các loại sản phẩm
 */
export const getAllProductTypes = async () => {
  const response = await axiosInstance.get('/products/getAllType')
  return response.data
}

/**
 * Upload ảnh sản phẩm lên Cloudinary
 * @param {File} imageFile - File ảnh cần upload
 * @returns {Promise<Object>} Response với URL ảnh đã upload
 */
export const uploadProductImage = async (imageFile) => {
  const formData = new FormData()
  formData.append('image', imageFile)

  const response = await axiosInstance.post('/products/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
