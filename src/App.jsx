import { Button, Typography } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {
  return (
    <>
      <ModeToggle />
      <Typography variant='body2' color='secondary.main'>
        Test Typography
      </Typography>
      <Button variant='text'>Text</Button>
      <Button variant='contained'>Contained</Button>
    </>
  )
}

export default App
