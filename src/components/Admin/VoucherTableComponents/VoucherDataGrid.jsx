import React, { useState } from 'react'
import {
  Paper,
  Box,
  IconButton,
  Chip,
  Typography,
  Button,
  Tooltip,
  Switch
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { formatPrice } from '../../../utils/formatUtils'

const VoucherDataGrid = ({
  vouchers = [],
  onEdit,
  onDelete,
  onBulkDelete,
  onToggleActive,
  loading = false
}) => {
  const [selectedRows, setSelectedRows] = useState([])

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return
    try {
      await onBulkDelete(selectedRows)
      setSelectedRows([])
    } catch {
      // Errors are handled upstream in parent or intentionally ignored for mock mode
    }
  }

  const columns = [
    { field: 'code', headerName: 'Mã', minWidth: 120 },
    {
      field: 'type',
      headerName: 'Loại',
      width: 120,
      renderCell: (params) => (
        <Chip
          size='small'
          label={params?.value === 'percent' ? 'Phần trăm' : 'Cố định'}
          color={params?.value === 'percent' ? 'primary' : 'secondary'}
        />
      )
    },
    {
      field: 'amount',
      headerName: 'Mức giảm',
      width: 140,
      renderCell: (params) =>
        params?.row?.type === 'percent'
          ? `${params?.value ?? 0}%`
          : formatPrice(params?.value ?? 0)
    },
    {
      field: 'maxDiscount',
      headerName: 'Giảm tối đa',
      width: 140,
      renderCell: (params) =>
        Number(params?.value ?? 0) > 0 ? formatPrice(params.value) : '0'
    },
    {
      field: 'minOrderValue',
      headerName: 'ĐH tối thiểu',
      width: 140,
      renderCell: (params) =>
        Number(params?.value ?? 0) > 0 ? formatPrice(params.value) : '0'
    },
    {
      field: 'period',
      headerName: 'Hiệu lực',
      flex: 1,
      minWidth: 220,
      valueGetter: (params) => {
        const getValue =
          typeof params?.getValue === 'function' ? params.getValue : undefined
        const start = getValue
          ? getValue(params.id, 'startDate')
          : params?.row?.startDate
        const end = getValue
          ? getValue(params.id, 'endDate')
          : params?.row?.endDate
        const sd = start ? new Date(start).toLocaleDateString('vi-VN') : '-'
        const ed = end ? new Date(end).toLocaleDateString('vi-VN') : '-'
        return `${sd} → ${ed}`
      },
      renderCell: (params) => (
        <Typography variant='body2'>{params?.value || '- → -'}</Typography>
      )
    },
    {
      field: 'usage',
      headerName: 'Số lần dùng',
      width: 130,
      valueGetter: (params) => {
        const getValue =
          typeof params?.getValue === 'function' ? params.getValue : undefined
        const used =
          Number(
            getValue ? getValue(params.id, 'usedCount') : params?.row?.usedCount
          ) || 0
        const limit =
          Number(
            getValue
              ? getValue(params.id, 'usageLimit')
              : params?.row?.usageLimit
          ) || 0
        return `${used}/${limit === 0 ? '∞' : limit}`
      },
      renderCell: (params) => (
        <Typography variant='body2'>{params?.value ?? ''}</Typography>
      )
    },
    {
      field: 'isActive',
      headerName: 'Kích hoạt',
      width: 120,
      renderCell: (params) => (
        <Tooltip title={params?.value ? 'Đang kích hoạt' : 'Đang tắt'}>
          <Switch
            checked={!!params?.value}
            onChange={() => onToggleActive(params?.row?._id)}
            size='small'
          />
        </Tooltip>
      )
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
            onClick={() => onEdit(params?.row?._id)}
          >
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            color='error'
            onClick={() => onDelete(params?.row?._id)}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
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
            Đã chọn {selectedRows.length} voucher
          </Typography>
          <Button
            variant='contained'
            color='error'
            startIcon={<DeleteForeverIcon />}
            onClick={handleBulkDelete}
            disabled={loading}
          >
            Xóa tất cả
          </Button>
        </Box>
      )}

      <DataGrid
        rows={vouchers}
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
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: 'code', sort: 'asc' }] }
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

export default VoucherDataGrid
