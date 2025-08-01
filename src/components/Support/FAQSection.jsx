import { useState } from 'react'
import { Paper, Typography, Box } from '@mui/material'
import { Help } from '@mui/icons-material'
import FAQItem from './FAQItem'

function FAQSection({ faqData, searchQuery }) {
  const [expandedFAQ, setExpandedFAQ] = useState(false)

  // Lọc FAQ theo từ khóa tìm kiếm
  const filteredFAQ = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFAQChange = (panel) => (event, isExpanded) => {
    setExpandedFAQ(isExpanded ? panel : false)
  }

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
      <Typography
        variant='h5'
        sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}
      >
        Câu hỏi thường gặp
      </Typography>

      {filteredFAQ.length === 0 ? (
        <Box textAlign='center' sx={{ py: 4 }}>
          <Help sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant='h6' color='text.secondary'>
            Không tìm thấy kết quả phù hợp
          </Typography>
          <Typography color='text.secondary'>
            Thử tìm kiếm với từ khóa khác hoặc liên hệ hỗ trợ trực tiếp
          </Typography>
        </Box>
      ) : (
        filteredFAQ.map((faq) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            expanded={expandedFAQ}
            onChange={handleFAQChange}
          />
        ))
      )}
    </Paper>
  )
}

export default FAQSection
