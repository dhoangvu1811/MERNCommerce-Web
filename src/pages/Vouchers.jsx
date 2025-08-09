import React, { useMemo, useState } from 'react'
import { Container, Typography, Grid, Box } from '@mui/material'
import VoucherCard from '../components/Voucher/VoucherCard'
import VoucherFilters from '../components/Voucher/VoucherFilters'
import vouchersMock from '../mocks/vouchers'

const Vouchers = () => {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all') // 'all' | 'percent' | 'fixed'
  const [onlyActive, setOnlyActive] = useState(false)

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return vouchersMock.filter((v) => {
      if (onlyActive && !v.isActive) return false
      if (type !== 'all' && v.type !== type) return false
      if (s && !v.code.toLowerCase().includes(s)) return false
      return true
    })
  }, [search, type, onlyActive])

  const handleApply = (code) => {
    navigator.clipboard?.writeText(code)
    alert(`Đã sao chép mã: ${code}. Hãy dán mã ở phần thanh toán.`)
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Typography variant='h4' component='h1' fontWeight={700}>
          Voucher ưu đãi
        </Typography>
        <VoucherFilters
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
          onlyActive={onlyActive}
          setOnlyActive={setOnlyActive}
        />
      </Box>

      <Grid container spacing={2}>
        {filtered.map((v) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={v._id}>
            <VoucherCard voucher={v} onApply={handleApply} />
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Typography align='center' color='text.secondary'>
              Không tìm thấy voucher phù hợp.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default Vouchers
