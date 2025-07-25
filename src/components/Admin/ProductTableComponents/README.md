# ProductTable Components

Đây là bộ component được phân chia từ ProductTable chính để dễ dàng bảo trì và tái sử dụng.

## Cấu trúc thư mục

```
ProductTable/
├── index.js                  # Export tất cả components
├── ProductTableHeader.jsx    # Header với title và nút thêm mới
├── ProductSearchBar.jsx      # Thanh tìm kiếm sản phẩm
├── ProductDataGrid.jsx       # Bảng hiển thị danh sách sản phẩm
├── ProductFormDrawer.jsx     # Form drawer cho thêm/sửa sản phẩm
├── DeleteProductDialog.jsx   # Dialog xác nhận xóa sản phẩm
└── README.md                # Tài liệu hướng dẫn
```

## Chi tiết các Component

### 1. ProductTableHeader

**Mục đích**: Hiển thị tiêu đề và nút thêm mới sản phẩm
**Props**:

- `onAddNew`: Function callback khi click nút thêm mới

### 2. ProductSearchBar

**Mục đích**: Thanh tìm kiếm sản phẩm
**Props**:

- `searchTerm`: Giá trị hiện tại của ô tìm kiếm
- `onSearchChange`: Function callback khi thay đổi giá trị tìm kiếm

### 3. ProductDataGrid

**Mục đích**: Hiển thị bảng danh sách sản phẩm với các chức năng sort, filter, pagination
**Props**:

- `products`: Array danh sách sản phẩm
- `onEdit`: Function callback khi click nút chỉnh sửa
- `onDelete`: Function callback khi click nút xóa

### 4. ProductFormDrawer

**Mục đích**: Form drawer để thêm mới hoặc chỉnh sửa sản phẩm
**Props**:

- `open`: Boolean trạng thái mở/đóng drawer
- `onClose`: Function callback khi đóng drawer
- `onSubmit`: Function callback khi submit form
- `product`: Object sản phẩm (null nếu là thêm mới)
- `title`: String tiêu đề của drawer

### 5. DeleteProductDialog

**Mục đích**: Dialog xác nhận xóa sản phẩm
**Props**:

- `open`: Boolean trạng thái mở/đóng dialog
- `onClose`: Function callback khi đóng dialog
- `onConfirm`: Function callback khi xác nhận xóa

## Cách sử dụng

```jsx
import {
  ProductSearchBar,
  ProductTableHeader,
  DeleteProductDialog,
  ProductDataGrid,
  ProductFormDrawer
} from './ProductTable'

// Sử dụng trong component chính
const MyProductTable = () => {
  // ... state và handlers

  return (
    <Box>
      <ProductTableHeader onAddNew={handleAddNew} />
      <ProductSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <ProductDataGrid
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductFormDrawer
        open={editDrawerOpen}
        onClose={handleEditCancel}
        onSubmit={handleEditSubmit}
        product={editingProduct}
        title='Chỉnh sửa sản phẩm'
      />
      <DeleteProductDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  )
}
```

## Lợi ích của việc phân chia component

1. **Tái sử dụng**: Mỗi component có thể được sử dụng ở nhiều nơi khác nhau
2. **Dễ bảo trì**: Mỗi component có trách nhiệm rõ ràng, dễ debug và sửa lỗi
3. **Dễ test**: Có thể test từng component độc lập
4. **Code sạch hơn**: Component chính ngắn gọn, dễ đọc
5. **Teamwork tốt hơn**: Nhiều dev có thể làm việc song song trên các component khác nhau
