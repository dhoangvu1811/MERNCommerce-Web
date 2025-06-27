import React from 'react'
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material'

/**
 * Cart header with select all checkbox and column titles
 */
function CartHeader({ selectAll, itemCount, onSelectAll }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 2
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={selectAll}
            onChange={onSelectAll}
            color='primary'
          />
        }
        label={`All (${itemCount} items)`}
        sx={{ flexGrow: 1 }}
      />

      {!isMobile && (
        <Box sx={{ display: 'flex', width: '50%' }}>
          <Typography sx={{ flex: 1, color: 'text.secondary' }}>
            Price
          </Typography>
          <Typography sx={{ flex: 1, color: 'text.secondary' }}>
            Quantity
          </Typography>
          <Typography sx={{ flex: 1, color: 'text.secondary' }}>
            Subtotal
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

export default CartHeader
