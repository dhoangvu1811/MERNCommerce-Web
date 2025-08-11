import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Box,
  Chip
} from '@mui/material'
import { formatPrice } from '../../utils/formatUtils'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '~/redux/slices/orderSlice'
import { useAuth } from '~/hooks/useAuth'
import { useState } from 'react'
import LoginDialog from '~/components/auth/LoginDialog'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const { isAuthenticated } = useAuth()
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const handleAdd = () => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true)
      return
    }
    dispatch(
      addItem({
        product: {
          ...product,
          countInStock: product.countInStock,
          price: product.price,
          image: product.image,
          discount: product.discount
        },
        quantity: 1
      })
    )
  }
  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        },
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box
        component={Link}
        to={`/product/${product._id}`}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardMedia
          component='img'
          height='200'
          image={product.image}
          alt={product.name}
          sx={{ objectFit: 'contain', p: 2 }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant='h6'
            component='h2'
            noWrap
            sx={{ fontWeight: 'medium' }}
          >
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              value={product.rating || 0}
              readOnly
              precision={0.5}
              size='small'
            />
            <Typography variant='body2' color='text.secondary' sx={{ ml: 0.5 }}>
              ({product.numReviews || 0})
            </Typography>
          </Box>
          {/* Price Section */}
          <Box>
            <Typography variant='h6' color='primary' fontWeight='bold'>
              {formatPrice(product.price)}
            </Typography>
            {product.discount > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ textDecoration: 'line-through' }}
                >
                  {formatPrice(
                    Math.round(product.price / (1 - product.discount / 100))
                  )}
                </Typography>
                <Chip
                  label={`-${product.discount}%`}
                  color='error'
                  size='small'
                  sx={{ fontWeight: 'bold', fontSize: '0.7rem', height: 20 }}
                />
              </Box>
            )}
          </Box>
        </CardContent>
      </Box>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant='contained'
          size='small'
          color='primary'
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={handleAdd}
        >
          Thêm vào giỏ
        </Button>
      </CardActions>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onSuccess={() => setLoginDialogOpen(false)}
        onSwitchToRegister={() => setLoginDialogOpen(false)}
      />
    </Card>
  )
}

export default ProductCard
