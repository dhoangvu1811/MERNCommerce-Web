import { Box, IconButton } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

function SocialLinks() {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <IconButton aria-label='Facebook' color='inherit' size='medium'>
        <FacebookIcon />
      </IconButton>

      <IconButton aria-label='Twitter' color='inherit' size='medium'>
        <TwitterIcon />
      </IconButton>

      <IconButton aria-label='Instagram' color='inherit' size='medium'>
        <InstagramIcon />
      </IconButton>

      <IconButton aria-label='YouTube' color='inherit' size='medium'>
        <YouTubeIcon />
      </IconButton>

      <IconButton aria-label='LinkedIn' color='inherit' size='medium'>
        <LinkedInIcon />
      </IconButton>
    </Box>
  )
}

export default SocialLinks
