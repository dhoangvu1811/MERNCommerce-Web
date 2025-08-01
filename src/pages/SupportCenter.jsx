import { useState } from 'react'
import { Box, Container } from '@mui/material'
import MainLayout from '../layouts/MainLayout'
import {
  SupportHeader,
  QuickContact,
  SupportCategories,
  FAQSection,
  ContactForm
} from '../components/Support'

function SupportCenter() {
  const [searchQuery, setSearchQuery] = useState('')

  // Dữ liệu FAQ
  const faqData = [
    {
      id: 1,
      category: 'Đặt hàng',
      question: 'Làm thế nào để đặt hàng trên website?',
      answer:
        'Bạn có thể đặt hàng bằng cách: 1) Tìm sản phẩm cần mua, 2) Thêm vào giỏ hàng, 3) Điền thông tin giao hàng, 4) Chọn phương thức thanh toán, 5) Xác nhận đơn hàng.'
    },
    {
      id: 2,
      category: 'Thanh toán',
      question: 'Những phương thức thanh toán nào được hỗ trợ?',
      answer:
        'Chúng tôi hỗ trợ thanh toán qua: Thẻ tín dụng/ghi nợ (Visa, Mastercard), Ví điện tử (MoMo, ZaloPay), Chuyển khoản ngân hàng, Thanh toán khi nhận hàng (COD).'
    },
    {
      id: 3,
      category: 'Vận chuyển',
      question: 'Thời gian giao hàng là bao lâu?',
      answer:
        'Thời gian giao hàng: Nội thành HCM/HN: 1-2 ngày làm việc. Các tỉnh thành khác: 3-5 ngày làm việc. Vùng xa: 5-7 ngày làm việc.'
    },
    {
      id: 4,
      category: 'Đổi trả',
      question: 'Chính sách đổi trả như thế nào?',
      answer:
        'Bạn có thể đổi/trả hàng trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm phải còn nguyên vẹn, chưa sử dụng và có đầy đủ bao bì gốc.'
    },
    {
      id: 5,
      category: 'Tài khoản',
      question: 'Làm sao để thay đổi thông tin tài khoản?',
      answer:
        'Đăng nhập vào tài khoản → Vào "Thông tin cá nhân" → Chỉnh sửa thông tin cần thiết → Lưu thay đổi. Một số thông tin có thể cần xác thực bổ sung.'
    }
  ]

  const handleSearchChange = (value) => {
    setSearchQuery(value)
  }

  return (
    <Box sx={{ py: 4, flexGrow: 1 }}>
      <Container maxWidth='xl'>
        {/* Header Section với Search */}
        <SupportHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Quick Contact Section */}
        <QuickContact />

        {/* Support Categories */}
        <SupportCategories />

        {/* FAQ Section */}
        <FAQSection faqData={faqData} searchQuery={searchQuery} />

        {/* Contact Form Section */}
        <ContactForm />
      </Container>
    </Box>
  )
}

export default SupportCenter
