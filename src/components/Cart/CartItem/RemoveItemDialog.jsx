import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

/**
 * Confirmation dialog when removing items from cart
 */
function RemoveItemDialog({ open, onClose, onConfirm, itemName }) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: 2, p: 1 }
      }}
    >
      <DialogTitle>
        <Typography
          sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
        >
          <DeleteOutlineIcon sx={{ mr: 1, color: 'error.main' }} />
          Remove Item
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove &ldquo;{itemName}&rdquo; from your
          cart?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 2, px: 2 }}>
        <Button onClick={onClose} variant='outlined'>
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant='contained' color='error'>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RemoveItemDialog
