import React, { useState } from 'react'
import {
  Box,
  Button,
  Avatar,
  Typography,
  CircularProgress,
  IconButton,
  Alert
} from '@mui/material'
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Person as PersonIcon
} from '@mui/icons-material'
import { toast } from 'react-toastify'

const AvatarUpload = ({
  value,
  onChange,
  error,
  helperText,
  disabled = false
}) => {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(value || '')

  // Xử lý chọn file
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Chỉ chấp nhận file ảnh (JPG, PNG, WebP)')
      return
    }

    // Validate file size (max 5MB cho avatar)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      toast.error('Kích thước file không được vượt quá 5MB')
      return
    }

    // Show preview immediately
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target.result)
    }
    reader.readAsDataURL(file)

    // Upload file (simulate upload - có thể tích hợp API upload avatar sau)
    handleUpload(file)
  }

  // Xử lý upload (simulate - có thể thay thế bằng API thực tế)
  const handleUpload = async (file) => {
    setUploading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Tạm thời sử dụng base64 URL cho demo
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        setPreviewUrl(imageUrl)
        onChange(imageUrl) // Truyền URL về parent component
        toast.success('Upload avatar thành công!')
      }
      reader.readAsDataURL(file)
    } catch {
      setPreviewUrl('') // Reset preview nếu upload failed
      toast.error('Upload avatar thất bại!')
    }

    setUploading(false)
  }

  // Xóa ảnh
  const handleRemoveImage = () => {
    setPreviewUrl('')
    onChange('') // Clear value in parent
  }

  return (
    <Box>
      <Typography variant='subtitle2' gutterBottom>
        Avatar
      </Typography>

      <Box
        sx={{
          border: error ? '2px dashed #f44336' : '2px dashed #ccc',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          backgroundColor: disabled ? '#f5f5f5' : '#fafafa',
          position: 'relative',
          minHeight: 150,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {uploading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}
          >
            <CircularProgress size={30} />
            <Typography sx={{ ml: 2 }}>Đang upload...</Typography>
          </Box>
        )}

        {previewUrl ? (
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={previewUrl}
              alt='User avatar'
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 1
              }}
            >
              <PersonIcon sx={{ fontSize: 40 }} />
            </Avatar>

            {!disabled && (
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  backgroundColor: 'rgba(244, 67, 54, 0.8)',
                  color: 'white',
                  width: 24,
                  height: 24,
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.9)'
                  }
                }}
                size='small'
              >
                <DeleteIcon sx={{ fontSize: 14 }} />
              </IconButton>
            )}
          </Box>
        ) : (
          <Box>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 1,
                backgroundColor: '#e0e0e0'
              }}
            >
              <PersonIcon sx={{ fontSize: 40, color: '#9e9e9e' }} />
            </Avatar>
            <Typography variant='body2' color='textSecondary' gutterBottom>
              Chọn ảnh đại diện
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              JPG, PNG, WebP (tối đa 5MB)
            </Typography>
          </Box>
        )}

        {!disabled && (
          <input
            type='file'
            accept='image/jpeg,image/jpg,image/png,image/webp'
            onChange={handleFileSelect}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer'
            }}
            disabled={uploading}
          />
        )}
      </Box>

      {!previewUrl && !disabled && (
        <Button
          variant='outlined'
          startIcon={<CloudUploadIcon />}
          component='label'
          fullWidth
          size='small'
          sx={{ mt: 1 }}
          disabled={uploading}
        >
          Chọn ảnh từ máy tính
          <input
            type='file'
            accept='image/jpeg,image/jpg,image/png,image/webp'
            onChange={handleFileSelect}
            hidden
            disabled={uploading}
          />
        </Button>
      )}

      {error && (
        <Alert severity='error' sx={{ mt: 1 }}>
          {helperText}
        </Alert>
      )}

      {!error && helperText && (
        <Typography
          variant='caption'
          color='textSecondary'
          sx={{ mt: 1, display: 'block' }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  )
}

export default AvatarUpload
