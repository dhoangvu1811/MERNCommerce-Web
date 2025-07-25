import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box component='main' sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}

export default MainLayout
