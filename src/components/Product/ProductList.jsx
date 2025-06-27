import { Grid, Typography, Box, Container } from '@mui/material'
import ProductCard from './ProductCard'

// Sample product data
const products = [
  {
    id: 1,
    name: 'iPhone 14 Pro Max',
    image: 'https://source.unsplash.com/random/300x300/?iphone',
    price: 32990000,
    rating: 4.8,
    numReviews: 125
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23 Ultra',
    image: 'https://source.unsplash.com/random/300x300/?samsung',
    price: 29990000,
    rating: 4.6,
    numReviews: 98
  },
  {
    id: 3,
    name: 'MacBook Air M2',
    image: 'https://source.unsplash.com/random/300x300/?macbook',
    price: 27990000,
    rating: 4.9,
    numReviews: 87
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    image: 'https://source.unsplash.com/random/300x300/?headphones',
    price: 8990000,
    rating: 4.7,
    numReviews: 56
  },
  {
    id: 5,
    name: 'iPad Pro 11',
    image: 'https://source.unsplash.com/random/300x300/?ipad',
    price: 22990000,
    rating: 4.5,
    numReviews: 42
  },
  {
    id: 6,
    name: 'Apple Watch Series 8',
    image: 'https://source.unsplash.com/random/300x300/?applewatch',
    price: 10990000,
    rating: 4.4,
    numReviews: 31
  }
]

function ProductList({ title = 'Sản phẩm nổi bật' }) {
  return (
    <Container maxWidth='xl' disableGutters>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h5' component='h2' fontWeight='bold'>
          {title}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ProductList
