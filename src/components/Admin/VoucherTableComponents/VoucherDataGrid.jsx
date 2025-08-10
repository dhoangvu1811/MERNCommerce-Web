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

  // Helper: format date in UTC to avoid timezone shifting
  const formatDateUTC = (raw) => {
    if (!raw) return '-'
    const d = new Date(raw)
    if (isNaN(d)) return '-'
    const dd = String(d.getUTCDate()).padStart(2, '0')
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
    const yyyy = d.getUTCFullYear()
    return `${dd}/${mm}/${yyyy}`
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
      renderCell: (params) => {
        const row = params?.row || {}
        const startRaw = row.startDate ?? row.start_date
        const endRaw = row.endDate ?? row.end_date
        const sd = formatDateUTC(startRaw)
        const ed = formatDateUTC(endRaw)
        return <Typography variant='body2'>{`${sd} → ${ed}`}</Typography>
      }
    },
    {
      field: 'usage',
      headerName: 'Số lần dùng',
      width: 130,
      renderCell: (params) => {
        const row = params?.row || {}
        const rawUsed = row.usedCount ?? row.used_count
        const usedNum = Number(rawUsed)
        const used = Number.isFinite(usedNum) && usedNum >= 0 ? usedNum : 0

        const rawLimit = row.usageLimit ?? row.usage_limit
        let displayLimit
        if (rawLimit === 0 || rawLimit === '0') {
          displayLimit = '∞'
        } else {
          const limNum = Number(rawLimit)
          if (Number.isFinite(limNum) && limNum > 0) {
            displayLimit = limNum
          } else if (rawLimit == null || rawLimit === '') {
            displayLimit = '-'
          } else {
            displayLimit = '-'
          }
        }
        return (
          <Typography variant='body2'>{`${used}/${displayLimit}`}</Typography>
        )
      }
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
