import { useState } from 'react'
import { Box } from '@mui/material'

function ProductGallery({ images, productName }) {
  const [mainImage, setMainImage] = useState(images[0])

  const handleImageClick = (image) => {
    setMainImage(image)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Box
        sx={{
          height: 500,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          mb: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Box
          component='img'
          src={mainImage}
          alt={productName}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: 1,
            objectFit: 'contain'
          }}
        />
      </Box>

      {/* Thumbnails */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          maxWidth: '80%'
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component='img'
            src={image}
            alt={`${productName} - ${index + 1}`}
            onClick={() => handleImageClick(image)}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 1,
              cursor: 'pointer',
              objectFit: 'cover',
              border: image === mainImage ? '2px solid' : '1px solid',
              borderColor: image === mainImage ? 'primary.main' : 'divider',
              opacity: image === mainImage ? 1 : 0.8,
              transition: 'all 0.2s',
              '&:hover': {
                opacity: 1,
                transform: 'scale(1.05)'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ProductGallery
