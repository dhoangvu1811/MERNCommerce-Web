import { useState, useEffect } from 'react'
import { getProducts, deleteProduct, deleteMultipleProducts } from '../apis'
import { toast } from 'react-toastify'

/**
 * Custom hook để quản lý products data và các operations CRUD
 */
export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 10,
    totalProducts: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  })

  // Fetch products từ API
  const fetchProducts = async (params = {}) => {
    setLoading(true)

    const response = await getProducts({
      page: pagination.page,
      itemsPerPage: pagination.itemsPerPage,
      ...params
    })

    if (response.code === 200) {
      setProducts(response.data.products || [])
      setPagination(response.data.pagination || pagination)
    } else {
      setProducts([])
    }

    setLoading(false)
  }

  // Xóa sản phẩm
  const handleDeleteProduct = async (productId) => {
    const response = await deleteProduct(productId)
    if (response.code === 200) {
      toast.success('Xóa sản phẩm thành công!')
      // Refresh danh sách sau khi xóa
      await fetchProducts()
    }
  }

  // Thêm hoặc cập nhật sản phẩm thành công
  const handleProductSuccess = async () => {
    // Refresh danh sách sau khi thêm/cập nhật
    await fetchProducts()
  }

  // Xóa nhiều sản phẩm cùng lúc
  const handleBulkDeleteProduct = async (productIds) => {
    try {
      setLoading(true)
      const response = await deleteMultipleProducts(productIds)

      if (response.code === 200) {
        // Xóa các sản phẩm khỏi state local
        setProducts((prev) =>
          prev.filter((product) => !productIds.includes(product._id))
        )

        toast.success(`Đã xóa thành công ${productIds.length} sản phẩm!`, {
          autoClose: 3000
        })

        // Refresh lại data để đảm bảo đồng bộ
        await fetchProducts()
      }
      // Không cần toast.error ở đây vì đã có interceptor xử lý
    } finally {
      setLoading(false)
    }
  }

  // Thay đổi trang
  const handlePageChange = async (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
    await fetchProducts({ page: newPage })
  }

  // Thay đổi số items per page
  const handleItemsPerPageChange = async (newItemsPerPage) => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: newItemsPerPage,
      page: 1 // Reset về trang 1
    }))
    await fetchProducts({
      page: 1,
      itemsPerPage: newItemsPerPage
    })
  }

  // Tìm kiếm sản phẩm
  const handleSearch = async (searchParams) => {
    setPagination((prev) => ({ ...prev, page: 1 })) // Reset về trang 1
    await fetchProducts({
      page: 1,
      ...searchParams
    })
  }

  // Load data lần đầu
  useEffect(() => {
    fetchProducts()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return {
    products,
    loading,
    pagination,
    fetchProducts,
    handleDeleteProduct,
    handleBulkDeleteProduct,
    handleProductSuccess,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearch
  }
}
