import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Box } from '@mui/material'
import {
  VoucherSearchBar,
  VoucherTableHeader,
  DeleteVoucherDialog,
  VoucherDataGrid,
  VoucherFormDrawer
} from './VoucherTableComponents'
import vouchersMock from '../../mocks/vouchers'
import {
  getVouchersAll,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  deleteMultipleVouchers
} from '../../apis/voucherApi'
import dayjs from 'dayjs'

const VoucherTable = () => {
  const [vouchers, setVouchers] = useState(vouchersMock)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [voucherToDelete, setVoucherToDelete] = useState(null)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editingVoucher, setEditingVoucher] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 10,
    totalVouchers: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  })
  const searchTimer = useRef(null)

  // Fetch vouchers from API
  const fetchVouchers = async (query = {}) => {
    setLoading(true)
    try {
      const params = {
        page: pagination.page,
        itemsPerPage: pagination.itemsPerPage,
        ...query
      }
      const res = await getVouchersAll(params)
      // response chuẩn: { code, message, data: { vouchers, pagination } }
      const list = res?.data?.vouchers || []
      const paginationData = res?.data?.pagination || {}

      setVouchers(list)
      setPagination({
        page: parseInt(paginationData.page) || 1,
        itemsPerPage: parseInt(paginationData.itemsPerPage) || 10,
        totalVouchers: paginationData.totalVouchers || 0,
        totalPages: paginationData.totalPages || 0,
        hasNextPage: paginationData.hasNextPage || false,
        hasPrevPage: paginationData.hasPrevPage || false
      })
    } catch {
      // fallback giữ nguyên local state (mock)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVouchers()
  }, [])

  // Debounce search
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      const q = searchTerm.trim()
      setPagination((prev) => ({ ...prev, page: 1 })) // Reset to page 1 on search
      fetchVouchers(q ? { search: q, page: 1 } : { page: 1 })
    }, 400)
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current)
    }
  }, [searchTerm])

  const filteredVouchers = useMemo(() => {
    // Server đã lọc theo search; vẫn giữ filter phụ trợ khi dùng mock
    if (!searchTerm.trim()) return vouchers
    const term = searchTerm.toLowerCase()
    return vouchers.filter((v) =>
      [
        v.code,
        v.type,
        String(v.amount),
        String(v.minOrderValue ?? ''),
        v.isActive ? 'active' : 'inactive'
      ]
        .join(' ')
        .toLowerCase()
        .includes(term)
    )
  }, [vouchers, searchTerm])

  // CRUD
  const handleEdit = (id) => {
    const voucher = vouchers.find((v) => v._id === id)
    if (voucher) {
      setEditingVoucher(voucher)
      setEditDrawerOpen(true)
    }
  }

  const handleDeleteClick = (id) => {
    const voucher = vouchers.find((v) => v._id === id)
    if (voucher) {
      setVoucherToDelete(voucher)
      setDeleteDialogOpen(true)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!voucherToDelete) return
    const id = voucherToDelete._id
    // Optimistic update
    setVouchers((prev) => prev.filter((v) => v._id !== id))
    setDeleteDialogOpen(false)
    setVoucherToDelete(null)
    try {
      await deleteVoucher(id)
    } catch {
      // rollback nếu muốn: fetch lại danh sách
      fetchVouchers()
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setVoucherToDelete(null)
  }

  const handleFormSubmit = async (data) => {
    // Chuẩn hóa tối thiểu: cắt trắng
    const payload = { ...data, code: data.code?.trim() }

    if (editingVoucher) {
      const id = editingVoucher._id
      // Optimistic update
      setVouchers((prev) =>
        prev.map((v) => (v._id === id ? { ...v, ...payload } : v))
      )
      setEditDrawerOpen(false)
      setEditingVoucher(null)
      try {
        await updateVoucher(id, payload)
        fetchVouchers({ search: searchTerm.trim() || undefined })
      } catch {
        fetchVouchers({ search: searchTerm.trim() || undefined })
      }
    } else {
      setAddDrawerOpen(false)
      try {
        await createVoucher(payload)
        fetchVouchers({ search: searchTerm.trim() || undefined })
      } catch {
        // giữ nguyên
      }
    }
  }

  const handleEditCancel = () => {
    setEditDrawerOpen(false)
    setEditingVoucher(null)
  }

  const handleAddNew = () => setAddDrawerOpen(true)
  const handleAddCancel = () => setAddDrawerOpen(false)

  // Handle refresh data
  const handleRefresh = () => {
    fetchVouchers({ search: searchTerm.trim() || undefined })
  }

  const handleBulkDelete = async (selectedIds) => {
    if (!selectedIds?.length) return
    // Optimistic
    const previous = vouchers
    setVouchers((prev) => prev.filter((v) => !selectedIds.includes(v._id)))
    try {
      await deleteMultipleVouchers(selectedIds)
    } catch {
      setVouchers(previous)
    }
  }

  const handleToggleActive = async (id) => {
    // Optimistic
    const previous = vouchers
    setVouchers((prev) =>
      prev.map((v) =>
        v._id === id
          ? { ...v, isActive: !v.isActive, updatedAt: dayjs().valueOf() }
          : v
      )
    )
    try {
      const current = previous.find((v) => v._id === id)
      await updateVoucher(id, { isActive: !current?.isActive })
    } catch {
      setVouchers(previous)
    }
  }

  // Handle page change
  const handlePageChange = async (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
    await fetchVouchers({
      page: newPage,
      search: searchTerm.trim() || undefined
    })
  }

  // Handle page size change
  const handlePageSizeChange = async (newPageSize) => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: newPageSize,
      page: 1
    }))
    await fetchVouchers({
      page: 1,
      itemsPerPage: newPageSize,
      search: searchTerm.trim() || undefined
    })
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
        <VoucherTableHeader
          onAddNew={handleAddNew}
          onRefresh={handleRefresh}
          loading={loading}
        />
        <VoucherSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </Box>

      <VoucherDataGrid
        vouchers={filteredVouchers}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onBulkDelete={handleBulkDelete}
        onToggleActive={handleToggleActive}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      <DeleteVoucherDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        voucherCode={voucherToDelete?.code}
      />

      <VoucherFormDrawer
        open={editDrawerOpen}
        onClose={handleEditCancel}
        onSubmit={handleFormSubmit}
        voucher={editingVoucher}
        title='Chỉnh sửa voucher'
      />

      <VoucherFormDrawer
        open={addDrawerOpen}
        onClose={handleAddCancel}
        onSubmit={handleFormSubmit}
        voucher={null}
        title='Thêm voucher mới'
      />
    </Box>
  )
}

export default VoucherTable
