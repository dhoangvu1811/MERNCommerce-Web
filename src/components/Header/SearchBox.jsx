import { InputBase, Paper, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

function SearchBox() {
  return (
    <Paper
      component='form'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', sm: '300px', md: '400px' },
        maxWidth: '100%',
        borderRadius: '20px',
        backgroundColor: 'background.paper'
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Tìm kiếm sản phẩm...'
        inputProps={{ 'aria-label': 'tìm kiếm sản phẩm' }}
      />
      <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBox
