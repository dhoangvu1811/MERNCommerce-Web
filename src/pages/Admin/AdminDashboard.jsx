import React, { useState } from 'react'
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  Grid,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'

// Configure dayjs
dayjs.locale('vi')
import PersonIcon from '@mui/icons-material/Person'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SecurityIcon from '@mui/icons-material/Security'
import AdminHeader from '../../components/Admin/AdminHeader'

// Import table components
import UserTable from '../../components/Admin/UserTable'
import ProductTable from '../../components/Admin/ProductTable'
import OrderTable from '../../components/Admin/OrderTable'
import VoucherTable from '../../components/Admin/VoucherTable'
import SessionTable from '../../components/Admin/SessionTable'

// TabPanel component to render tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%', height: '100%' }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, height: '100%' }}>{children}</Box>}
    </div>
  )
}

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AdminHeader />
      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant='h4' component='h1'>
            Quản lý hệ thống
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Hôm nay: {dayjs().format('DD/MM/YYYY')}
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {/* Dashboard summary cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={3}>
              <CardContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography color='text.secondary' variant='subtitle2'>
                      Người dùng
                    </Typography>
                    <Typography variant='h4' sx={{ mt: 1, mb: 2 }}>
                      152
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                      +12 tuần này
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'primary.lighter',
                      p: 1,
                      borderRadius: '50%',
                      color: 'primary.main'
                    }}
                  >
                    <PeopleIcon fontSize='large' />
                  </Box>
                </Box>
                <LinearProgress
                  variant='determinate'
                  value={70}
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={3}>
              <CardContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography color='text.secondary' variant='subtitle2'>
                      Sản phẩm
                    </Typography>
                    <Typography variant='h4' sx={{ mt: 1, mb: 2 }}>
                      87
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                      +5 tuần này
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'success.lighter',
                      p: 1,
                      borderRadius: '50%',
                      color: 'success.main'
                    }}
                  >
                    <InventoryIcon fontSize='large' />
                  </Box>
                </Box>
                <LinearProgress
                  variant='determinate'
                  value={55}
                  color='success'
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={3}>
              <CardContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography color='text.secondary' variant='subtitle2'>
                      Đơn hàng
                    </Typography>
                    <Typography variant='h4' sx={{ mt: 1, mb: 2 }}>
                      43
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                      +8 tuần này
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'info.lighter',
                      p: 1,
                      borderRadius: '50%',
                      color: 'info.main'
                    }}
                  >
                    <LocalShippingIcon fontSize='large' />
                  </Box>
                </Box>
                <LinearProgress
                  variant='determinate'
                  value={65}
                  color='info'
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card elevation={3}>
              <CardContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography color='text.secondary' variant='subtitle2'>
                      Doanh thu
                    </Typography>
                    <Typography variant='h4' sx={{ mt: 1, mb: 2 }}>
                      25.2M
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                      +15% so với tháng trước
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'warning.lighter',
                      p: 1,
                      borderRadius: '50%',
                      color: 'warning.main'
                    }}
                  >
                    <TrendingUpIcon fontSize='large' />
                  </Box>
                </Box>
                <LinearProgress
                  variant='determinate'
                  value={85}
                  color='warning'
                  sx={{ mt: 2, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            height: 'calc(100vh - 320px)',
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}
        >
          <Tabs
            orientation={isMobile ? 'horizontal' : 'vertical'}
            variant='scrollable'
            value={tabValue}
            onChange={handleTabChange}
            aria-label='Admin dashboard tabs'
            TabIndicatorProps={{
              sx: {
                left: 0,
                ...(isMobile ? {} : { width: '4px' })
              }
            }}
            sx={{
              borderRight: isMobile ? 0 : 1,
              borderBottom: isMobile ? 1 : 0,
              borderColor: 'divider',
              [isMobile ? 'width' : 'minWidth']: isMobile ? '100%' : '250px',
              [isMobile ? 'minHeight' : 'height']: isMobile ? '72px' : '100%',
              '& .MuiTab-root': {
                alignItems: 'flex-start',
                minHeight: 60,
                py: 1,
                px: 3,
                ...(isMobile ? {} : { borderLeft: '4px solid transparent' }),
                '&.Mui-selected': {
                  color: 'primary.main',
                  ...(isMobile ? {} : { borderLeft: '4px solid' }),
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                }
              }
            }}
          >
            <Tab
              label={!isMobile && 'Quản lý người dùng'}
              icon={<PersonIcon />}
              iconPosition={isMobile ? 'top' : 'start'}
            />
            <Tab
              label={!isMobile && 'Quản lý sản phẩm'}
              icon={<ShoppingBasketIcon />}
              iconPosition={isMobile ? 'top' : 'start'}
            />
            <Tab
              label={!isMobile && 'Quản lý đơn hàng'}
              icon={<ShoppingCartIcon />}
              iconPosition={isMobile ? 'top' : 'start'}
            />
            <Tab
              label={!isMobile && 'Quản lý voucher'}
              icon={<LocalOfferIcon />}
              iconPosition={isMobile ? 'top' : 'start'}
            />
            <Tab
              label={!isMobile && 'Quản lý sessions'}
              icon={<SecurityIcon />}
              iconPosition={isMobile ? 'top' : 'start'}
            />
          </Tabs>

          <Box
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              width: isMobile ? '100%' : 'calc(100% - 250px)',
              bgcolor: 'background.default'
            }}
          >
            <TabPanel value={tabValue} index={0}>
              <UserTable />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <ProductTable />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <OrderTable />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <VoucherTable />
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              <SessionTable />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default AdminDashboard
