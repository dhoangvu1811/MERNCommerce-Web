import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  Paper,
  Grid
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { formatPrice } from '../../utils/formatUtils'
import { useAuth } from '~/hooks/useAuth'
import { useDispatch } from 'react-redux'
import { addItem } from '~/redux/slices/orderSlice'
import LoginDialog from '~/components/auth/LoginDialog'

function MobileBuyBox({ product }) {
  const [quantity, setQuantity] = useState(1)
  const { isAuthenticated } = useAuth()
  const dispatch = useDispatch()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) =>
      Math.max(1, Math.min(product.countInStock, prevQuantity + change))
    )
  }

  const ensureAuthOrPrompt = () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true)
      return false
    }
    return true
  }

  const handleBuyNow = () => {
    if (!ensureAuthOrPrompt()) return
    dispatch(
      addItem({
        product: {
          ...product,
          countInStock: product.countInStock,
          price: product.price,
          image: product.images?.[0] || product.image,
          discount: product.discount
        },
        quantity
      })
    )
    // TODO: navigate to checkout
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        height: 'auto'
      }}
    >
      <Grid container spacing={2} alignItems='center'>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Typography variant='h6' fontWeight='bold' gutterBottom>
              Tổng tiền:
            </Typography>
            <Typography variant='h5' fontWeight='bold' color='primary'>
              {formatPrice(product.price * quantity)}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size='small'
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <RemoveIcon fontSize='small' />
              </IconButton>
              <TextField
                size='small'
                value={quantity}
                inputProps={{
                  readOnly: true,
                  style: { textAlign: 'center', width: '40px' }
                }}
                sx={{ mx: 1 }}
              />
              <IconButton
                size='small'
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.countInStock}
              >
                <AddIcon fontSize='small' />
              </IconButton>
            </Box>
            <Button
              variant='contained'
              fullWidth
              sx={{ py: 1 }}
              onClick={handleBuyNow}
            >
              Mua ngay
            </Button>
          </Box>
        </Grid>
      </Grid>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onSuccess={() => setLoginDialogOpen(false)}
        onSwitchToRegister={() => setLoginDialogOpen(false)}
      />
    </Paper>
  )
}

export default MobileBuyBox
