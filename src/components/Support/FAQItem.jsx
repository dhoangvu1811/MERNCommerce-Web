import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
  Divider
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

function FAQItem({ faq, expanded, onChange }) {
  const panelId = `panel${faq.id}`

  return (
    <Accordion
      expanded={expanded === panelId}
      onChange={onChange(panelId)}
      sx={{
        mb: 1,
        '&:before': {
          display: 'none'
        },
        boxShadow: 'none',
        border: '1px solid #e0e0e0',
        borderRadius: '8px !important'
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${panelId}bh-content`}
        id={`${panelId}bh-header`}
        sx={{
          '& .MuiAccordionSummary-content': {
            alignItems: 'center'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Chip
            label={faq.category}
            size='small'
            sx={{
              mr: 2,
              bgcolor: 'primary.light'
            }}
          />
          <Typography variant='subtitle1' sx={{ fontWeight: 'medium' }}>
            {faq.question}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Divider sx={{ mb: 2 }} />
        <Typography color='text.secondary' sx={{ lineHeight: 1.7 }}>
          {faq.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default FAQItem
