import { useState } from 'react'
import {
  Box,
  Typography,
  Rating,
  Divider,
  Button,
  Paper,
  Chip,
  Stack,
  Pagination
} from '@mui/material'

function ReviewSection({ product, reviews }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(1)
  const reviewsPerPage = 3

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    setPage(1)
  }

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  // Filter reviews based on rating
  const filteredReviews =
    activeFilter === 'all'
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(activeFilter))

  // Calculate pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage)
  // lấy các đánh giá hiển thị cho trang hiện tại
  const displayedReviews = filteredReviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  )

  return (
    <Box sx={{ mb: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.default'
        }}
      >
        <Typography variant='h5' fontWeight='bold' gutterBottom>
          Đánh giá từ khách hàng
        </Typography>

        {/* Rating filter */}
        <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
          <Chip
            label='Tất cả'
            color={activeFilter === 'all' ? 'primary' : 'default'}
            onClick={() => handleFilterChange('all')}
            clickable
          />
          {[5, 4, 3, 2, 1].map((star) => (
            <Chip
              key={star}
              label={`${star} sao`}
              color={activeFilter === star.toString() ? 'primary' : 'default'}
              onClick={() => handleFilterChange(star.toString())}
              clickable
            />
          ))}
        </Stack>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant='h3' fontWeight='bold' sx={{ mr: 2 }}>
              {product.rating}
            </Typography>
            <Box>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant='body2' color='text.secondary'>
                {product.numReviews} đánh giá
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {displayedReviews.length > 0 ? (
            displayedReviews.map((review) => (
              <Box key={review.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Box
                    component='img'
                    src={review.avatar}
                    alt={review.username}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      mr: 2
                    }}
                  />
                  <Box>
                    <Typography variant='subtitle1' fontWeight='bold'>
                      {review.username}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={review.rating} size='small' readOnly />
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ ml: 1 }}
                      >
                        {review.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant='body2' sx={{ ml: 8 }}>
                  {review.content}
                </Typography>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant='body1'>
                Không có đánh giá nào trong mục này
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color='primary'
                shape='rounded'
              />
            </Box>
          )}

          {/* Write review button */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button variant='contained' color='primary'>
              Viết đánh giá
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default ReviewSection
