import React, { useMemo, useState } from 'react'
import { Box } from '@mui/material'
import {
  VoucherSearchBar,
  VoucherTableHeader,
  DeleteVoucherDialog,
  VoucherDataGrid,
  VoucherFormDrawer
} from './VoucherTableComponents'
import vouchersMock from '../../mocks/vouchers'

const VoucherTable = () => {
  const [vouchers, setVouchers] = useState(vouchersMock)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [voucherToDelete, setVoucherToDelete] = useState(null)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editingVoucher, setEditingVoucher] = useState(null)

  const filteredVouchers = useMemo(() => {
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

  // CRUD (mock, local state)
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

  const handleDeleteConfirm = () => {
    if (voucherToDelete) {
      setVouchers((prev) => prev.filter((v) => v._id !== voucherToDelete._id))
      setDeleteDialogOpen(false)
      setVoucherToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setVoucherToDelete(null)
  }

  const handleFormSubmit = (data) => {
    if (editingVoucher) {
      setVouchers((prev) =>
        prev.map((v) =>
          v._id === editingVoucher._id
            ? { ...v, ...data, updatedAt: Date.now() }
            : v
        )
      )
      setEditDrawerOpen(false)
      setEditingVoucher(null)
    } else {
      const newVoucher = {
        ...data,
        _id: Math.random().toString(36).slice(2),
        usedCount: data.usedCount ?? 0,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      setVouchers((prev) => [newVoucher, ...prev])
      setAddDrawerOpen(false)
    }
  }

  const handleEditCancel = () => {
    setEditDrawerOpen(false)
    setEditingVoucher(null)
  }

  const handleAddNew = () => setAddDrawerOpen(true)
  const handleAddCancel = () => setAddDrawerOpen(false)

  const handleBulkDelete = async (selectedIds) => {
    if (!selectedIds?.length) return
    setVouchers((prev) => prev.filter((v) => !selectedIds.includes(v._id)))
  }

  const handleToggleActive = (id) => {
    setVouchers((prev) =>
      prev.map((v) =>
        v._id === id
          ? { ...v, isActive: !v.isActive, updatedAt: new Date().toISOString() }
          : v
      )
    )
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
        <VoucherTableHeader onAddNew={handleAddNew} />
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
