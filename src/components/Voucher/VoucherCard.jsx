import React from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Button,
  Divider,
  Tooltip
} from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { formatPrice, formatDate } from '../../utils/formatUtils'

const VoucherCard = ({ voucher, onApply }) => {
  const {
    code,
    type,
    amount,
    maxDiscount,
    minOrderValue,
    usageLimit,
    usedCount,
    startDate,
    endDate,
    isActive
  } = voucher

  const disabled = !isActive

  return (
    <Card
      variant='outlined'
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <LocalOfferIcon color='primary' />
          <Typography variant='h6' sx={{ fontWeight: 700 }}>
            {code}
          </Typography>
          <Chip
            size='small'
            label={type === 'percent' ? 'Phần trăm' : 'Cố định'}
            color={type === 'percent' ? 'primary' : 'secondary'}
          />
          {!isActive && <Chip size='small' label='Ngừng' color='default' />}
        </Box>

        <Typography variant='body1' sx={{ mb: 1 }}>
          {type === 'percent' ? `${amount}%` : formatPrice(amount)}{' '}
          {maxDiscount > 0 ? `(Tối đa ${formatPrice(maxDiscount)})` : ''}
        </Typography>

        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          ĐH tối thiểu:{' '}
          {minOrderValue > 0 ? formatPrice(minOrderValue) : 'Không yêu cầu'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <AccessTimeIcon fontSize='small' color='action' />
          <Typography variant='body2'>
            {`${formatDate(startDate)} → ${formatDate(endDate)}`}
          </Typography>
        </Box>

        <Typography variant='caption' color='text.secondary'>
          Sử dụng: {usedCount}/{usageLimit === 0 ? '∞' : usageLimit}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ p: 2, pt: 1 }}>
        <Tooltip
          title={
            disabled
              ? 'Voucher không khả dụng'
              : 'Sao chép mã và áp dụng ở giỏ hàng'
          }
        >
          <span>
            <Button
              variant='contained'
              disabled={disabled}
              onClick={() => onApply?.(code)}
            >
              Áp dụng
            </Button>
          </span>
        </Tooltip>
        <Button onClick={() => navigator.clipboard?.writeText(code)}>
          Sao chép mã
        </Button>
      </CardActions>
    </Card>
  )
}

export default VoucherCard
