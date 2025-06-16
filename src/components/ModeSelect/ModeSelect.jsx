import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import { useColorScheme } from '@mui/material/styles'

function ModeSelect() {
  const { mode = 'light', setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectMode = event.target.value
    setMode(selectMode)
  }

  return (
    <Box sx={{ m: 1, minWidth: 120 }}>
      <FormControl size='small'>
        <InputLabel id='demo-simple-select-label'>Mode</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={mode}
          label='Mode'
          onChange={handleChange}
        >
          <MenuItem value='light'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LightModeIcon fontSize='small' /> Light
            </Box>
          </MenuItem>
          <MenuItem value='dark'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DarkModeIcon fontSize='small' /> Dark
            </Box>
          </MenuItem>
          <MenuItem value='system'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SettingsBrightnessIcon fontSize='small' /> System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default ModeSelect
