# UserTable Components

Đây là bộ component được phân chia từ UserTable chính để dễ dàng bảo trì và tái sử dụng.

## Cấu trúc thư mục

```
UserTableComponents/
├── index.js                  # Export tất cả components
├── UserTableHeader.jsx       # Header với title và nút thêm mới
├── UserSearchBar.jsx         # Thanh tìm kiếm người dùng
├── UserDataGrid.jsx          # Bảng hiển thị danh sách người dùng
├── UserFormDrawer.jsx        # Form drawer cho thêm/sửa người dùng
├── DeleteUserDialog.jsx      # Dialog xác nhận xóa người dùng
└── README.md                # Tài liệu hướng dẫn
```

## Chi tiết các Component

### 1. UserTableHeader

**Mục đích**: Hiển thị tiêu đề và nút thêm mới người dùng
**Props**:

- `onAddNew`: Function callback khi click nút thêm mới

### 2. UserSearchBar

**Mục đích**: Thanh tìm kiếm người dùng
**Props**:

- `searchTerm`: Giá trị hiện tại của ô tìm kiếm
- `onSearchChange`: Function callback khi thay đổi giá trị tìm kiếm

### 3. UserDataGrid

**Mục đích**: Hiển thị bảng danh sách người dùng với các chức năng sort, filter, pagination
**Props**:

- `users`: Array danh sách người dùng
- `onEdit`: Function callback khi click nút chỉnh sửa
- `onDelete`: Function callback khi click nút xóa

### 4. UserFormDrawer

**Mục đích**: Form drawer để thêm mới hoặc chỉnh sửa người dùng
**Props**:

- `open`: Boolean trạng thái mở/đóng drawer
- `onClose`: Function callback khi đóng drawer
- `onSubmit`: Function callback khi submit form
- `user`: Object người dùng (null nếu là thêm mới)
- `title`: String tiêu đề của drawer

### 5. DeleteUserDialog

**Mục đích**: Dialog xác nhận xóa người dùng
**Props**:

- `open`: Boolean trạng thái mở/đóng dialog
- `onClose`: Function callback khi đóng dialog
- `onConfirm`: Function callback khi xác nhận xóa

## Cách sử dụng

```jsx
import {
  UserSearchBar,
  UserTableHeader,
  DeleteUserDialog,
  UserDataGrid,
  UserFormDrawer
} from './UserTableComponents'

// Sử dụng trong component chính
const MyUserTable = () => {
  // ... state và handlers

  return (
    <Box>
      <UserTableHeader onAddNew={handleAddNew} />
      <UserSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <UserDataGrid users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <UserFormDrawer
        open={editDrawerOpen}
        onClose={handleEditCancel}
        onSubmit={handleEditSubmit}
        user={editingUser}
        title='Chỉnh sửa người dùng'
      />
      <DeleteUserDialog
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
