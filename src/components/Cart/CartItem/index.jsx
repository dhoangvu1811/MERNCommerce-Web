import React, { useState } from 'react'
import {
  Box,
  Typography,
  Checkbox,
  Card,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import StoreIcon from '@mui/icons-material/Store'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import CartItemQuantity from './CartItemQuantity'
import RemoveItemDialog from './RemoveItemDialog'
import { formatPrice } from '../../../utils/formatUtils'

/**
 * Cart item component with product details and controls
 */
function CartItem({
  item,
  isSelected,
  quantity,
  onSelect,
  onQuantityChange,
  onRemove
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // State for remove confirmation dialog
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)

  const handleOpenRemoveDialog = () => {
    setRemoveDialogOpen(true)
  }

  const handleCloseRemoveDialog = () => {
    setRemoveDialogOpen(false)
  }

  const handleConfirmRemove = () => {
    onRemove(item.product.id)
  }

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        overflow: 'visible'
      }}
    >
      {/* Shop Name Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <StoreIcon sx={{ mr: 1, color: 'text.secondary' }} />
        <Typography fontWeight='medium'>{item.shopName}</Typography>
      </Box>

      {/* Product Info */}
      <Box sx={{ p: 2 }}>
        <Grid container>
          {/* Checkbox + Product Info */}
          <Grid
            size={{
              xs: 12,
              md: 6
            }}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              mb: { xs: 2, md: 0 }
            }}
          >
            <Checkbox
              checked={isSelected}
              onChange={() => onSelect(item.product.id)}
              color='primary'
              sx={{ pt: 0 }}
            />

            <Box
              component='img'
              src={item.product.image}
              alt={item.product.name}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
                mr: 2
              }}
            />

            <Box>
              <Typography
                variant='subtitle1'
                sx={{ mb: 0.5, fontWeight: 'medium' }}
              >
                {item.product.name}
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ mb: 0.5 }}
              >
                Variant: {item.product.color}, {item.product.size}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalShippingIcon
                  sx={{ fontSize: '0.9rem', mr: 0.5, color: 'primary.main' }}
                />
                <Typography variant='body2' color='text.secondary'>
                  Delivery: {item.product.deliveryDate}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Desktop: Price, Quantity, Total */}
          {!isMobile && (
            <Grid
              size={{ md: 6 }}
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {/* Price Column */}
              <Box sx={{ flex: 1 }}>
                <Typography color='error' fontWeight='medium'>
                  {formatPrice(item.product.price)}
                </Typography>
                {item.product.price !== item.product.originalPrice && (
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ textDecoration: 'line-through' }}
                  >
                    {formatPrice(item.product.originalPrice)}
                  </Typography>
                )}
              </Box>

              {/* Quantity Column */}
              <Box sx={{ flex: 1 }}>
                <CartItemQuantity
                  quantity={quantity}
                  stock={item.product.stock}
                  productId={item.product.id}
                  onQuantityChange={onQuantityChange}
                />
              </Box>

              {/* Subtotal Column */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography color='error' fontWeight='medium'>
                  {formatPrice(item.product.price * quantity)}
                </Typography>

                <IconButton
                  size='small'
                  color='default'
                  onClick={handleOpenRemoveDialog}
                  sx={{ color: 'text.secondary' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          )}

          {/* Mobile View */}
          {isMobile && (
            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2
                }}
              >
                <Typography color='error' fontWeight='medium'>
                  {formatPrice(item.product.price)}
                </Typography>

                <CartItemQuantity
                  quantity={quantity}
                  stock={item.product.stock}
                  productId={item.product.id}
                  isMobile={true}
                  onQuantityChange={onQuantityChange}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  {item.product.stock < 10 && (
                    <Typography variant='caption' color='error'>
                      Only {item.product.stock} items left
                    </Typography>
                  )}
                </Box>

                <IconButton
                  size='small'
                  color='default'
                  onClick={handleOpenRemoveDialog}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Shop Voucher Section */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'rgba(0, 0, 0, 0.01)',
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}
      >
        <LocalOfferIcon
          sx={{ mr: 1, color: 'error.main', fontSize: '0.9rem' }}
        />
        <Typography variant='body2' sx={{ mr: 2 }}>
          Shop Voucher
        </Typography>

        <Box
          component={TextField}
          size='small'
          placeholder='Enter shop voucher code'
          sx={{
            flexGrow: 1,
            maxWidth: { xs: '100%', sm: 300 },
            mt: { xs: 1, sm: 0 },
            ml: { xs: 0, sm: 'auto' }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  sx={{ minWidth: 'unset' }}
                >
                  Apply
                </Button>
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Remove Item Confirmation Dialog */}
      <RemoveItemDialog
        open={removeDialogOpen}
        onClose={handleCloseRemoveDialog}
        onConfirm={handleConfirmRemove}
        itemName={item.product.name}
      />
    </Card>
  )
}

export default CartItem
