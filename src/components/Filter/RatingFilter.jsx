import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Rating,
  Divider
} from '@mui/material'

function RatingFilter({ onChange }) {
  const ratings = [5, 4, 3, 2, 1]

  const handleChange = (event, rating) => {
    if (onChange) {
      onChange(rating, event.target.checked)
    }
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
        Đánh giá
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <FormGroup>
        {ratings.map((rating) => (
          <FormControlLabel
            key={rating}
            control={<Checkbox />}
            onChange={(e) => handleChange(e, rating)}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={rating} readOnly size='small' sx={{ mr: 0.5 }} />
                <Typography variant='body2'>
                  {rating === 1 ? 'trở lên' : `${rating} sao trở lên`}
                </Typography>
              </Box>
            }
          />
        ))}
      </FormGroup>
    </Box>
  )
}

export default RatingFilter
