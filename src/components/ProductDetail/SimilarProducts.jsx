import { Box, Typography, Grid, Link } from '@mui/material'
import { formatPrice } from '../../utils/formatUtils'

function SimilarProducts({ products }) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <Box>
      <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
        Sản phẩm tương tự
      </Typography>
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid size={{ xs: 4 }} key={item.id}>
            <Box
              component={Link}
              href={`/product/${item.id}`}
              sx={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <Box
                component='img'
                src={item.image}
                alt={item.name}
                sx={{
                  width: '100%',
                  height: 80,
                  objectFit: 'contain',
                  borderRadius: 1,
                  mb: 1
                }}
              />
              <Typography
                variant='body2'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.name}
              </Typography>
              <Typography variant='body2' color='primary' fontWeight='bold'>
                {formatPrice(item.price)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SimilarProducts
