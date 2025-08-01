import { Box, Typography } from '@mui/material'
import OrderProductItem from './OrderProductItem'

function OrderProductList({
  items,
  showAll = false,
  maxVisible = 1,
  productSize = 'medium'
}) {
  const visibleItems = showAll ? items : items.slice(0, maxVisible)
  const hiddenCount = items.length - maxVisible

  return (
    <Box>
      {visibleItems.map((item, index) => (
        <Box key={item.id} sx={{ mb: index < visibleItems.length - 1 ? 2 : 0 }}>
          <OrderProductItem
            product={item}
            size={productSize}
            showQuantity={true}
          />
        </Box>
      ))}

      {!showAll && hiddenCount > 0 && (
        <Typography variant='body2' color='primary.main' sx={{ mt: 1 }}>
          +{hiddenCount} sản phẩm khác
        </Typography>
      )}
    </Box>
  )
}

export default OrderProductList
