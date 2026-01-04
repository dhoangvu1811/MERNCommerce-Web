import React, { useState } from 'react'
import {
  Paper,
  Box,
  IconButton,
  Rating,
  Typography,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { formatPrice } from '../../../utils/formatUtils'

const ProductDataGrid = ({
  products = [],
  onEdit,
  onDelete,
  onBulkDelete,
  loading = false,
  pagination,
  onPageChange,
  onPageSizeChange
}) => {
  const [selectedRows, setSelectedRows] = useState([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  // Xử lý bulk delete
  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return

    try {
      await onBulkDelete(selectedRows)
      setSelectedRows([]) // Reset selection sau khi xóa
      setOpenDeleteDialog(false) // Đóng dialog
    } catch {
      // Xử lý lỗi bulk delete
      setOpenDeleteDialog(false) // Đóng dialog ngay cả khi có lỗi
    }
  }

  // Mở dialog xác nhận xóa
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }

  // Đóng dialog xác nhận xóa
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }

  // Column definitions for DataGrid
  const columns = [
    { field: 'name', headerName: 'Tên sản phẩm', flex: 1, minWidth: 180 },
    {
      field: 'image',
      headerName: 'Hình ảnh',
      width: 100,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <Tooltip
            title={
              <Box
                component='img'
                src={params.value}
                alt={params.row.name}
                sx={{
                  maxWidth: 200,
                  maxHeight: 200,
                  borderRadius: 1
                }}
              />
            }
            placement='right'
          >
            <Box
              component='img'
              src={params.value}
              alt={params.row.name}
              sx={{
                width: 50,
                height: 50,
                borderRadius: 1,
                objectFit: 'cover',
                border: '1px solid',
                borderColor: 'grey.300',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
              onError={(e) => {
                // Fallback to a simple placeholder or hide the image
                e.target.style.display = 'none'
                e.target.parentElement.nextSibling.style.display = 'flex'
              }}
            />
          </Tooltip>
          {/* Fallback placeholder */}
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'grey.300',
              bgcolor: 'grey.100',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant='caption' color='text.secondary'>
              N/A
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'price',
      headerName: 'Giá',
      width: 150,
      renderCell: (params) => formatPrice(params.value)
    },
    {
      field: 'rating',
      headerName: 'Đánh giá',
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating value={params.value} precision={0.1} size='small' readOnly />
          <Typography variant='body2' sx={{ ml: 1 }}>
            ({params.value})
          </Typography>
        </Box>
      )
    },
    { field: 'type', headerName: 'Loại', width: 120 },
    { field: 'countInStock', headerName: 'Số lượng', width: 100 },
    {
      field: 'selled',
      headerName: 'Đã bán',
      width: 100,
      renderCell: (params) => (
        <Typography variant='body2'>{params.value || 0}</Typography>
      )
    },
    {
      field: 'discount',
      headerName: 'Giảm giá',
      width: 100,
      renderCell: (params) => (params.value >= 0 ? `${params.value}%` : '-')
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      flex: 1,
      minWidth: 200
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 120,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params) => (
        <Box>
          <Tooltip title='Chỉnh sửa sản phẩm'>
            <IconButton
              size='small'
              color='primary'
              onClick={() => onEdit(params.row._id)}
            >
              <EditIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xóa sản phẩm'>
            <IconButton
              size='small'
              color='error'
              onClick={() => onDelete(params.row._id)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        height: 'auto',
        minHeight: '400px'
      }}
    >
      {/* Bulk Actions Toolbar */}
      {selectedRows && selectedRows.length > 0 && (
        <Box
          sx={{
            p: 2,
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant='body2'>
            Đã chọn {selectedRows.length} sản phẩm
          </Typography>
          <Button
            variant='contained'
            color='error'
            startIcon={<DeleteForeverIcon />}
            onClick={handleOpenDeleteDialog}
            disabled={loading}
          >
            Xóa tất cả
          </Button>
        </Box>
      )}

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby='delete-dialog-title'
        aria-describedby='delete-dialog-description'
      >
        <DialogTitle id='delete-dialog-title'>
          Xác nhận xóa sản phẩm
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='delete-dialog-description'>
            Bạn có chắc chắn muốn xóa {selectedRows.length} sản phẩm đã chọn?
            Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color='primary'>
            Hủy
          </Button>
          <Button
            onClick={handleBulkDelete}
            color='error'
            variant='contained'
            disabled={loading}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          // newSelection có cấu trúc {type: 'include', ids: Set} cho MUI X v8+
          if (newSelection && newSelection.ids && newSelection.ids.size > 0) {
            const selectedIds = Array.from(newSelection.ids)
            setSelectedRows(selectedIds)
          } else {
            setSelectedRows([])
          }
        }}
        rowSelectionModel={{ type: 'include', ids: new Set(selectedRows) }}
        paginationModel={{
          page: pagination ? pagination.page - 1 : 0,
          pageSize: pagination ? pagination.itemsPerPage : 10
        }}
        onPaginationModelChange={(model) => {
          if (onPageChange && model.page !== (pagination?.page || 1) - 1) {
            onPageChange(model.page + 1)
          }
          if (onPageSizeChange && model.pageSize !== pagination?.itemsPerPage) {
            onPageSizeChange(model.pageSize)
          }
        }}
        rowCount={pagination ? pagination.totalProducts : products.length}
        paginationMode={pagination ? 'server' : 'client'}
        initialState={{
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }]
          },
          columns: {
            columnVisibilityModel: {
              description: false
            }
          }
        }}
        pageSizeOptions={[5, 10, 25]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        getRowClassName={() => 'cursor-pointer hover:bg-gray-50'}
        disableRowSelectionOnClick={false}
        disableDensitySelector
        rowHeight={70}
        autoHeight
        sx={{
          '& .MuiDataGrid-row': {
            minHeight: '70px !important',
            '&:last-child': {
              minHeight: '70px !important',
              '& .MuiDataGrid-cell': {
                minHeight: '70px !important'
              }
            }
          },
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            minHeight: '70px !important'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          },
          '& .MuiDataGrid-virtualScroller': {
            overflowX: 'auto',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              height: '8px',
              width: '8px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '4px'
            }
          },
          '& .MuiDataGrid-main': {
            '& .MuiDataGrid-row:last-child': {
              borderBottom: 'none'
            }
          },
          '& .MuiDataGrid-footerContainer': {
            minHeight: '52px'
          }
        }}
        loading={loading}
      />
    </Paper>
  )
}

export default ProductDataGrid
