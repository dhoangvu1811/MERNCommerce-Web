import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Box
} from '@mui/material'
import { formatPrice } from '../../utils/formatUtils'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
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
        to={`/product/${product.id}`}
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
              value={product.rating}
              readOnly
              precision={0.5}
              size='small'
            />
            <Typography variant='body2' color='text.secondary' sx={{ ml: 0.5 }}>
              ({product.numReviews})
            </Typography>
          </Box>
          <Typography variant='h6' color='primary' fontWeight='bold'>
            {formatPrice(product.price)}
          </Typography>
        </CardContent>
      </Box>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant='contained'
          size='small'
          color='primary'
          fullWidth
          startIcon={<ShoppingCartIcon />}
        >
          Thêm vào giỏ
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
