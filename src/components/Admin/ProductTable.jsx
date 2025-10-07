import React, { useState } from 'react'
import { Box } from '@mui/material'
import {
  ProductSearchBar,
  ProductTableHeader,
  DeleteProductDialog,
  ProductDataGrid,
  ProductFormDrawer
} from './ProductTableComponents'
import { useProducts } from '~/hooks/useProducts'

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Sử dụng custom hook để quản lý products
  const {
    products,
    loading,
    pagination,
    handleDeleteProduct,
    handleBulkDeleteProduct,
    handleProductSuccess,
    handlePageChange,
    handleItemsPerPageChange,
    handleSearch,
    fetchProducts
  } = useProducts()

  // Handle refresh data
  const handleRefresh = () => {
    fetchProducts({ search: searchTerm })
  }

  // Action handlers
  const handleEdit = (id) => {
    const product = products.find((p) => p._id === id)
    if (product) {
      setEditingProduct(product)
      setEditDrawerOpen(true)
    }
  }

  const handleDeleteClick = (id) => {
    const product = products.find((p) => p._id === id)
    if (product) {
      setProductToDelete(product)
      setDeleteDialogOpen(true)
    }
  }

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      await handleDeleteProduct(productToDelete._id)
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  const handleEditSubmit = async () => {
    setEditDrawerOpen(false)
    setEditingProduct(null)
    // handleProductSuccess sẽ được gọi trong ProductFormDrawer
  }

  const handleEditCancel = () => {
    setEditDrawerOpen(false)
    setEditingProduct(null)
  }

  const handleAddNew = () => {
    setAddDrawerOpen(true)
  }

  const handleAddSubmit = async () => {
    setAddDrawerOpen(false)
    // handleProductSuccess sẽ được gọi trong ProductFormDrawer
  }

  const handleAddCancel = () => {
    setAddDrawerOpen(false)
  }

  // Xử lý bulk delete
  const handleBulkDelete = async (selectedIds) => {
    if (selectedIds.length === 0) return

    try {
      // Sử dụng API bulk delete thay vì xóa từng sản phẩm
      await handleBulkDeleteProduct(selectedIds)
    } catch {
      // Lỗi sẽ được xử lý trong handleBulkDeleteProduct thông qua toast
    }
  }

  // Tìm kiếm sản phẩm khi searchTerm thay đổi
  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm)

    if (newSearchTerm.trim()) {
      // Có thể implement search API endpoint ở đây
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
          product.type.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(newSearchTerm.toLowerCase())
      )
      // Tạm thời filter local, sau này có thể gọi API search
    } else {
      // Reset search
      handleSearch({})
    }
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <ProductTableHeader
          onAddNew={handleAddNew}
          onRefresh={handleRefresh}
          loading={loading}
        />
        <ProductSearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </Box>

      <ProductDataGrid
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onBulkDelete={handleBulkDelete}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handleItemsPerPageChange}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteProductDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name}
      />

      {/* Edit Product Drawer */}
      <ProductFormDrawer
        open={editDrawerOpen}
        onClose={handleEditCancel}
        onSubmit={handleProductSuccess}
        product={editingProduct}
        title='Chỉnh sửa thông tin sản phẩm'
      />

      {/* Add Product Drawer */}
      <ProductFormDrawer
        open={addDrawerOpen}
        onClose={handleAddCancel}
        onSubmit={handleProductSuccess}
        product={null}
        title='Thêm sản phẩm mới'
      />
    </Box>
  )
}

export default ProductTable
