import React, { useState, useMemo } from 'react'
import { Box } from '@mui/material'
import {
  ProductSearchBar,
  ProductTableHeader,
  DeleteProductDialog,
  ProductDataGrid,
  ProductFormDrawer
} from './ProductTableComponents'

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    price: 28990000,
    rating: 4.8,
    type: 'Điện thoại',
    countInStock: 15,
    description: 'Điện thoại iPhone 14 Pro mới nhất',
    discount: 5
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: 23990000,
    rating: 4.7,
    type: 'Điện thoại',
    countInStock: 20,
    description: 'Điện thoại Samsung Galaxy S23 Ultra',
    discount: 10
  },
  {
    id: 3,
    name: 'Macbook Pro M2',
    price: 45990000,
    rating: 4.9,
    type: 'Laptop',
    countInStock: 8,
    description: 'Laptop Macbook Pro với chip M2',
    discount: 0
  },
  {
    id: 4,
    name: 'iPad Air',
    price: 16990000,
    rating: 4.6,
    type: 'Tablet',
    countInStock: 12,
    description: 'Máy tính bảng iPad Air',
    discount: 8
  },
  {
    id: 5,
    name: 'Apple Watch Series 8',
    price: 10990000,
    rating: 4.5,
    type: 'Đồng hồ',
    countInStock: 25,
    description: 'Đồng hồ thông minh Apple Watch Series 8',
    discount: 15
  }
]

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Action handlers
  const handleEdit = (id) => {
    const product = mockProducts.find((p) => p.id === id)
    if (product) {
      setEditingProduct(product)
      setEditDrawerOpen(true)
    }
  }

  const handleDeleteClick = (id) => {
    setProductToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // Here you would typically call an API to delete the product
    alert(`Deleted product with id: ${productToDelete}`)
    setDeleteDialogOpen(false)
    setProductToDelete(null)
    // In a real app, you would update the product list after successful deletion
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setProductToDelete(null)
  }

  const handleEditSubmit = (data) => {
    // Here you would typically call an API to update the product
    alert(
      `Saved product: ${editingProduct.name} with new data: ${JSON.stringify(
        data
      )}`
    )
    setEditDrawerOpen(false)
    setEditingProduct(null)
    // In a real app, you would update the product list after successful save
  }

  const handleEditCancel = () => {
    setEditDrawerOpen(false)
    setEditingProduct(null)
  }

  const handleAddNew = () => {
    setAddDrawerOpen(true)
  }

  const handleAddSubmit = (data) => {
    // Here you would typically call an API to create the product
    alert(`Added new product: ${JSON.stringify(data)}`)
    setAddDrawerOpen(false)
    // In a real app, you would update the product list after successful creation
  }

  const handleAddCancel = () => {
    setAddDrawerOpen(false)
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
        <ProductTableHeader onAddNew={handleAddNew} />
        <ProductSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </Box>

      <ProductDataGrid
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteProductDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

      {/* Edit Product Drawer */}
      <ProductFormDrawer
        open={editDrawerOpen}
        onClose={handleEditCancel}
        onSubmit={handleEditSubmit}
        product={editingProduct}
        title='Chỉnh sửa thông tin sản phẩm'
      />

      {/* Add Product Drawer */}
      <ProductFormDrawer
        open={addDrawerOpen}
        onClose={handleAddCancel}
        onSubmit={handleAddSubmit}
        product={null}
        title='Thêm sản phẩm mới'
      />
    </Box>
  )
}

export default ProductTable
