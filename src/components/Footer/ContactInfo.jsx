import { Typography, Box, Grid } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'

function ContactInfo() {
  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold' }}>
        Liên hệ
      </Typography>

      <Grid container spacing={1}>
        <Grid item size={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOnIcon color='inherit' fontSize='small' sx={{ mr: 1 }} />
            <Typography variant='body2'>
              123 Đường ABC, Quận XYZ, TP. Hà Nội
            </Typography>
          </Box>
        </Grid>
        <Grid item size={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PhoneIcon color='inherit' fontSize='small' sx={{ mr: 1 }} />
            <Typography variant='body2'>Hotline: 1900 1234</Typography>
          </Box>
        </Grid>
        <Grid item size={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon color='inherit' fontSize='small' sx={{ mr: 1 }} />
            <Typography variant='body2'>Email: support@myshop.com</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContactInfo
