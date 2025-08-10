import React, { useEffect, useMemo, useState } from 'react'
import { Container, Typography, Grid, Box } from '@mui/material'
import VoucherCard from '../components/Voucher/VoucherCard'
import VoucherFilters from '../components/Voucher/VoucherFilters'
import { getActiveVouchers } from '../apis'

const Vouchers = () => {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all') // 'all' | 'percent' | 'fixed'
  const [onlyActive, setOnlyActive] = useState(false)
  const [vouchers, setVouchers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    const fetch = async () => {
      setLoading(true)
      try {
        const res = await getActiveVouchers()
        // Hỗ trợ nhiều format response: {data: {vouchers}}, {data: [...]}, {vouchers: [...]}
        const list = res?.data?.vouchers || res?.data || res?.vouchers || []
        if (mounted) setVouchers(Array.isArray(list) ? list : [])
      } catch {
        if (mounted) setVouchers([])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetch()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return vouchers.filter((v) => {
      if (onlyActive && !v.isActive) return false
      if (type !== 'all' && v.type !== type) return false
      if (s && !v.code?.toLowerCase().includes(s)) return false
      return true
    })
  }, [search, type, onlyActive, vouchers])

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

      {loading ? (
        <Typography align='center' color='text.secondary'>
          Đang tải voucher...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((v) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={v._id}>
              <VoucherCard voucher={v} onApply={handleApply} />
            </Grid>
          ))}
          {!filtered.length && (
            <Grid item xs={12}>
              <Typography align='center' color='text.secondary'>
                Không tìm thấy voucher phù hợp.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  )
}

export default Vouchers
