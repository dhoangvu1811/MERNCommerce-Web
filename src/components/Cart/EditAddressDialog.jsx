import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
  Grid,
  Box,
  InputAdornment,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import PhoneIcon from '@mui/icons-material/Phone'
import HomeIcon from '@mui/icons-material/Home'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import PublicIcon from '@mui/icons-material/Public'
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox'
import { FIELD_REQUIRED_MESSAGE } from '../../utils/validators'

/**
 * Edit address dialog with text fields for direct editing
 */
function EditAddressDialog({ open, onClose, onSave, currentAddress }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      id: '',
      name: '',
      phone: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      isDefault: false
    },
    mode: 'onBlur' // Validate on blur for better user experience
  })

  // Initialize form with current address data when dialog opens
  useEffect(() => {
    if (open && currentAddress) {
      // Parse the address into components if it's a single string
      let addressParts = {
        address: currentAddress.address || '',
        city: currentAddress.city || '',
        province: currentAddress.province || '',
        postalCode: currentAddress.postalCode || ''
      }

      // For backwards compatibility if address is stored as a single string
      if (
        !currentAddress.city &&
        currentAddress.address &&
        currentAddress.address.includes(',')
      ) {
        const parts = currentAddress.address
          .split(',')
          .map((part) => part.trim())
        if (parts.length >= 3) {
          addressParts = {
            address: parts[0],
            city: parts[1],
            province: parts[2],
            postalCode: parts.length > 3 ? parts[3] : ''
          }
        }
      }

      // Reset form with current address data
      reset({
        id: currentAddress.id,
        name: currentAddress.name,
        phone: currentAddress.phone,
        address: addressParts.address,
        city: addressParts.city,
        province: addressParts.province,
        postalCode: addressParts.postalCode,
        isDefault: currentAddress.isDefault || false
      })
    }
  }, [open, currentAddress, reset])

  // Form submission handler
  const onSubmit = (data) => {
    // Format the full address as a string for backwards compatibility
    const formattedAddress = {
      ...data,
      // Keep the original address field but also add the formatted full address
      fullAddress: `${data.address}, ${data.city}, ${data.province}${
        data.postalCode ? ', ' + data.postalCode : ''
      }`
    }

    onSave(formattedAddress)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      {/* Enhanced Header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          py: 2.5,
          px: 3,
          color: 'white',
          position: 'relative'
        }}
      >
        <Typography variant='h5' fontWeight='bold' sx={{ mb: 0.5 }}>
          Edit Shipping Address
        </Typography>
        <Typography variant='body2'>
          Please enter your shipping details below
        </Typography>
        <IconButton
          edge='end'
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)'
            }
          }}
          onClick={onClose}
          aria-label='close'
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, py: 4 }}>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <Typography variant='subtitle1' fontWeight='medium' gutterBottom>
            Contact Information
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('name', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                label='Full Name'
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message || ''}
                variant='outlined'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonOutlineIcon color='action' />
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 0 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('phone', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: 'Enter a valid 10-11 digit phone number'
                  }
                })}
                label='Phone Number'
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message || ''}
                variant='outlined'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PhoneIcon color='action' />
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 0 }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography
                variant='subtitle1'
                fontWeight='medium'
                gutterBottom
                sx={{ mt: 2 }}
              >
                Address Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                {...register('address', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                label='Street Address'
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message || ''}
                variant='outlined'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HomeIcon color='action' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('city', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                label='City'
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message || ''}
                variant='outlined'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LocationCityIcon color='action' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('province', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                label='State/Province'
                fullWidth
                error={!!errors.province}
                helperText={errors.province?.message || ''}
                variant='outlined'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PublicIcon color='action' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                {...register('postalCode', {
                  pattern: {
                    value: /^\d{5,6}$/,
                    message: 'Enter a valid 5-6 digit postal code'
                  }
                })}
                label='Postal Code'
                fullWidth
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message || ''}
                variant='outlined'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MarkunreadMailboxIcon color='action' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register('isDefault')}
                    color='primary'
                    checked={watch('isDefault')}
                  />
                }
                label='Set as default shipping address'
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 3,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button onClick={onClose} variant='outlined' sx={{ mr: 1.5 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant='contained'
          color='primary'
          disableElevation
          sx={{
            px: 3,
            py: 1,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          Save Address
        </Button>
      </Box>
    </Dialog>
  )
}

export default EditAddressDialog
