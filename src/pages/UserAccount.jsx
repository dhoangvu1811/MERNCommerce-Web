import { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material'
import ProfileTab from '../components/UserAccount/ProfileTab'
import SecurityTab from '../components/UserAccount/SecurityTab'
import SessionsTab from '../components/UserAccount/SessionsTab'

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom sx={{ mb: 4 }}>
        My Account
      </Typography>

      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? 'fullWidth' : 'standard'}
            centered={!isMobile}
            sx={{
              '& .MuiTab-root': {
                py: 2,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }
            }}
          >
            <Tab label='Profile' />
            <Tab label='Security' />
            <Tab label='Sessions' />
          </Tabs>
        </Box>

        <Box sx={{ p: { xs: 2, md: 4 } }}>
          {activeTab === 0 && <ProfileTab />}
          {activeTab === 1 && <SecurityTab />}
          {activeTab === 2 && <SessionsTab />}
        </Box>
      </Paper>
    </Container>
  )
}

export default UserAccount
