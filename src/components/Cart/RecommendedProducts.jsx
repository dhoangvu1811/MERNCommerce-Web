import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Chip,
  Stack
} from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { formatPrice, calculateDiscountedPrice } from '../../utils/formatUtils'

/**
 * RecommendedProducts component displays a grid of recommended products
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of product objects to display
 */
function RecommendedProducts({ products }) {
  return (
    <Box>
      <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }}>
        Recommended Products
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => {
          // Tính giá sau giảm giá
          const discountedPrice = calculateDiscountedPrice(
            product.price,
            product.discount || 0
          )

          return (
            <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: 1,
                  '&:hover': {
                    boxShadow: 3
                  }
                }}
              >
                <CardActionArea
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch'
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component='img'
                      height='140'
                      image={product.image}
                      alt={product.name}
                      sx={{ objectFit: 'contain', bgcolor: 'grey.100', p: 1 }}
                    />
                    {product.discount > 0 && (
                      <Chip
                        label={`-${product.discount}%`}
                        color='error'
                        size='small'
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          fontWeight: 'bold',
                          fontSize: '0.7rem'
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography
                      variant='subtitle2'
                      sx={{
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        height: '2.5em',
                        lineHeight: '1.25em'
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Stack spacing={0.5}>
                      {product.discount > 0 ? (
                        <>
                          <Typography color='error' fontWeight='medium'>
                            {formatPrice(discountedPrice)}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{
                              textDecoration: 'line-through',
                              fontSize: '0.75rem'
                            }}
                          >
                            {formatPrice(product.price)}
                          </Typography>
                        </>
                      ) : (
                        <Typography color='error' fontWeight='medium'>
                          {formatPrice(product.price)}
                        </Typography>
                      )}

                      {product.freeShipping && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 0.5
                          }}
                        >
                          <LocalShippingIcon
                            sx={{
                              fontSize: '0.9rem',
                              mr: 0.5,
                              color: 'primary.main'
                            }}
                          />
                          <Typography variant='caption' color='primary'>
                            Free Shipping
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default RecommendedProducts
