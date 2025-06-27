import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

/**
 * Quantity control component with increment/decrement buttons
 */
function CartItemQuantity({
  quantity,
  stock,
  productId,
  isMobile = false,
  onQuantityChange
}) {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          size='small'
          onClick={() => onQuantityChange(productId, -1)}
          disabled={quantity <= 1}
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: '4px 0 0 4px',
            ...(isMobile && { p: 0.5 })
          }}
        >
          <RemoveIcon fontSize='small' />
        </IconButton>

        <Box
          sx={{
            px: isMobile ? 1.5 : 2,
            py: 0.5,
            border: 1,
            borderLeft: 0,
            borderRight: 0,
            borderColor: 'divider',
            minWidth: isMobile ? 30 : 40,
            textAlign: 'center'
          }}
        >
          {quantity}
        </Box>

        <IconButton
          size='small'
          onClick={() => onQuantityChange(productId, 1)}
          disabled={quantity >= stock}
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: '0 4px 4px 0',
            ...(isMobile && { p: 0.5 })
          }}
        >
          <AddIcon fontSize='small' />
        </IconButton>
      </Box>

      {stock < 10 && (
        <Typography
          variant='caption'
          color='error'
          sx={{
            mt: 0.5,
            display: 'block'
          }}
        >
          Only {stock} items left
        </Typography>
      )}
    </>
  )
}

export default CartItemQuantity
