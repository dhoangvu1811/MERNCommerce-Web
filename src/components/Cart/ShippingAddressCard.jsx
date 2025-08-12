import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import HomeIcon from '@mui/icons-material/Home'
import EditIcon from '@mui/icons-material/Edit'
import EditAddressDialog from './EditAddressDialog'

/**
 * Shipping address card component
 */
function ShippingAddressCard({
  address,
  onChangeClick,
  requestEdit = false,
  onEditHandled
}) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const handleSaveAddress = (updatedAddress) => {
    // Pass the updated address to parent component
    if (onChangeClick) {
      onChangeClick(updatedAddress)
    }
  }

  // Cho phép parent yêu cầu mở dialog khi cần (ví dụ trước khi checkout)
  useEffect(() => {
    if (requestEdit) {
      setDialogOpen(true)
      onEditHandled && onEditHandled()
    }
  }, [requestEdit, onEditHandled])

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography fontWeight='medium'>Shipping Address</Typography>
        </Box>
        <Button
          startIcon={<EditIcon />}
          color='primary'
          size='small'
          onClick={handleOpenDialog}
        >
          Edit
        </Button>
      </Box>

      {/* Edit Address Dialog */}
      <EditAddressDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveAddress}
        currentAddress={address}
      />

      <Box sx={{ ml: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <PersonIcon
            sx={{ mr: 1, color: 'text.secondary', fontSize: '0.9rem' }}
          />
          <Typography fontWeight='medium'>
            {(address?.name || '') + ' | ' + (address?.phone || '')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <HomeIcon
            sx={{ mr: 1, color: 'text.secondary', fontSize: '0.9rem', mt: 0.3 }}
          />
          <Box>
            <Typography>{address?.address || ''}</Typography>
            {(address?.city || address?.province || address?.postalCode) && (
              <Typography color='text.secondary'>
                {[address?.city, address?.province, address?.postalCode]
                  .filter(Boolean)
                  .join(', ')}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default ShippingAddressCard
