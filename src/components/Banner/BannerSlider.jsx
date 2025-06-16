import { useState, useEffect } from 'react'
import { Box, Paper } from '@mui/material'
import BannerImage from './BannerImage'

// Import banner images
import banner1 from '../../assets/banner/banner1.png'
import banner2 from '../../assets/banner/banner2.png'
import banner3 from '../../assets/banner/banner3.png'
import banner4 from '../../assets/banner/banner4.png'

// Local banner images
const bannerImages = [
  {
    id: 1,
    image: banner1,
    alt: 'Khuyến mãi điện thoại'
  },
  {
    id: 2,
    image: banner2,
    alt: 'Ưu đãi laptop'
  },
  {
    id: 3,
    image: banner3,
    alt: 'Thời trang cao cấp'
  },
  {
    id: 4,
    image: banner4,
    alt: 'Phụ kiện công nghệ'
  }
]

function BannerSlider() {
  const [currentBanner, setCurrentBanner] = useState(0)

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: 'hidden',
        position: 'relative',
        mb: 4,
        borderRadius: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentBanner * 100}%)`
        }}
      >
        {bannerImages.map((banner) => (
          <Box key={banner.id} sx={{ minWidth: '100%', padding: '0 4px' }}>
            <BannerImage image={banner.image} alt={banner.alt} />
          </Box>
        ))}
      </Box>

      {/* Indicator dots */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          bottom: '10px',
          width: '100%'
        }}
      >
        {bannerImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentBanner(index)}
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              margin: '0 4px',
              backgroundColor:
                index === currentBanner
                  ? 'primary.main'
                  : 'rgba(255,255,255,0.7)',
              cursor: 'pointer'
            }}
          />
        ))}
      </Box>
    </Paper>
  )
}

export default BannerSlider
