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
  Image as ImageIcon
} from '@mui/icons-material'
import { toast } from 'react-toastify'
import { uploadProductImage } from '~/apis'

const ImageUpload = ({
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

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      toast.error('Kích thước file không được vượt quá 10MB')
      return
    }

    // Show preview immediately
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target.result)
    }
    reader.readAsDataURL(file)

    // Upload file
    handleUpload(file)
  }

  // Xử lý upload
  const handleUpload = async (file) => {
    setUploading(true)

    const response = await uploadProductImage(file)

    if (response.code === 200) {
      const imageUrl = response.data.imageUrl
      setPreviewUrl(imageUrl)
      onChange(imageUrl) // Truyền URL về parent component
      toast.success('Upload ảnh thành công!')
    } else {
      setPreviewUrl('') // Reset preview nếu upload failed
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
        Hình ảnh sản phẩm *
      </Typography>

      <Box
        sx={{
          border: error ? '2px dashed #f44336' : '2px dashed #ccc',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          backgroundColor: disabled ? '#f5f5f5' : '#fafafa',
          position: 'relative',
          minHeight: 200,
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
            <CircularProgress size={40} />
            <Typography sx={{ ml: 2 }}>Đang upload...</Typography>
          </Box>
        )}

        {previewUrl ? (
          <Box sx={{ position: 'relative', width: '100%', maxWidth: 300 }}>
            <Avatar
              src={previewUrl}
              alt='Product preview'
              variant='rounded'
              sx={{
                width: '100%',
                height: 200,
                mx: 'auto',
                mb: 2
              }}
            >
              <ImageIcon sx={{ fontSize: 60 }} />
            </Avatar>

            {!disabled && (
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(244, 67, 54, 0.8)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.9)'
                  }
                }}
                size='small'
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ) : (
          <Box>
            <CloudUploadIcon sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
            <Typography variant='body2' color='textSecondary' gutterBottom>
              Kéo thả ảnh vào đây hoặc click để chọn
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              Hỗ trợ: JPG, PNG, WebP (tối đa 10MB)
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
          sx={{ mt: 2 }}
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

export default ImageUpload
