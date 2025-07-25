import React from 'react'
import { Paper, Box, IconButton, Rating, Typography } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { formatPrice } from '../../../utils/formatUtils'

const ProductDataGrid = ({ products, onEdit, onDelete }) => {
  // Column definitions for DataGrid
  const columns = [
    { field: 'name', headerName: 'Tên sản phẩm', flex: 1, minWidth: 180 },
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
          <IconButton
            size='small'
            color='primary'
            onClick={() => onEdit(params.row.id)}
          >
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            color='error'
            onClick={() => onDelete(params.row.id)}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <Paper sx={{ height: 'calc(100vh - 230px)', width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 }
          },
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
        checkboxSelection
        autoHeight
        sx={{
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
        loading={false}
      />
    </Paper>
  )
}

export default ProductDataGrid
