import { Box } from '@mui/material'

function BannerImage({ image, alt }) {
  return (
    <Box
      component='img'
      src={image}
      alt={alt}
      sx={{
        width: '100%',
        height: { xs: '200px', md: '300px' },
        objectFit: 'fill',
        borderRadius: 2
      }}
    />
  )
}

export default BannerImage
