import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Collapse
} from '@mui/material'
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

function CategoryTypeFilter({ categoryTypes, onChange }) {
  const [expanded, setExpanded] = useState(true)

  const handleChange = (event, categoryType) => {
    if (onChange) {
      onChange(categoryType, event.target.checked)
    }
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
          Loại sản phẩm
        </Typography>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Collapse in={expanded}>
        <FormGroup>
          {categoryTypes.map((type) => (
            <FormControlLabel
              key={type.id}
              control={<Checkbox />}
              onChange={(e) => handleChange(e, type)}
              label={
                <Typography variant='body2'>
                  {type.name} ({type.count})
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Collapse>
    </Box>
  )
}

export default CategoryTypeFilter
