import { useState } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import RecommendedProducts from '../components/Cart/RecommendedProducts'
import CartHeader from '../components/Cart/CartHeader'
import CartItem from '../components/Cart/CartItem'
import ShippingAddressCard from '../components/Cart/ShippingAddressCard'
import PaymentSummaryCard from '../components/Cart/PaymentSummaryCard'

// Mock data
const cartItems = [
  {
    id: 1,
    shopName: 'Official Apple Store',
    product: {
      id: 101,
      name: 'iPhone 14 Pro Max 256GB',
      image: '/src/assets/products/productimg.png',
      price: 29990000,
      originalPrice: 32990000,
      color: 'Black',
      size: '256GB',
      quantity: 1,
      stock: 10,
      deliveryDate: 'Jun 28 - Jun 30'
    }
  },
  {
    id: 2,
    shopName: 'Samsung Official',
    product: {
      id: 102,
      name: 'Samsung Galaxy S23 Ultra',
      image: '/src/assets/products/detail.png',
      price: 28990000,
      originalPrice: 31990000,
      color: 'Blue',
      size: '512GB',
      quantity: 2,
      stock: 5,
      deliveryDate: 'Jun 29 - Jul 01'
    }
  }
]

const recommendedProducts = [
  {
    id: 301,
    name: 'AirPods Pro 2',
    image: '/src/assets/products/detail.png',
    price: 5990000,
    originalPrice: 6990000,
    discount: 14,
    freeShipping: true
  },
  {
    id: 302,
    name: 'iPhone 14 Pro Max Silicon Case',
    image: '/src/assets/products/iphone-1.jpg',
    price: 790000,
    originalPrice: 990000,
    discount: 20,
    freeShipping: true
  },
  {
    id: 303,
    name: '20W USB-C Fast Charger',
    image: '/src/assets/products/detail.png',
    price: 590000,
    originalPrice: 790000,
    discount: 25,
    freeShipping: true
  },
  {
    id: 304,
    name: 'USB-C to Lightning Cable',
    image: '/src/assets/products/iphone-1.jpg',
    price: 490000,
    originalPrice: 590000,
    discount: 17,
    freeShipping: true
  },
  {
    id: 305,
    name: 'iPhone Tempered Glass Screen Protector',
    image: '/src/assets/products/detail.png',
    price: 290000,
    originalPrice: 390000,
    discount: 26,
    freeShipping: true
  }
]

// Default shipping address
const defaultShippingAddress = {
  id: 1,
  name: 'John Smith',
  phone: '0987654321',
  address: '123 Le Loi Street',
  city: 'District 1',
  province: 'Ho Chi Minh City',
  postalCode: '70000',
  isDefault: true
}

function CartPage() {
  // Component state is managed here and passed to child components

  // State for selected items
  const [selectedItems, setSelectedItems] = useState({})
  const [selectAll, setSelectAll] = useState(false)
  const [shippingAddress, setShippingAddress] = useState(defaultShippingAddress)

  const [quantities, setQuantities] = useState(
    // trả về 1 object với key là product id và value là quantity
    cartItems.reduce((acc, item) => {
      acc[item.product.id] = item.product.quantity
      return acc
    }, {})
  )

  const [appliedVoucher, setAppliedVoucher] = useState(null)

  // Calculate total selected items and price
  const totalItems = Object.keys(selectedItems).filter(
    (id) => selectedItems[id]
  ).length
  const subtotal = cartItems.reduce((sum, item) => {
    if (selectedItems[item.product.id]) {
      return sum + item.product.price * quantities[item.product.id]
    }
    return sum
  }, 0)

  const discount = appliedVoucher?.discount || 0

  // Check if all items are selected
  const allItemsCount = cartItems.length

  // Handle select all
  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    const newSelectedItems = {}
    cartItems.forEach((item) => {
      newSelectedItems[item.product.id] = newSelectAll
    })
    setSelectedItems(newSelectedItems)
  }

  // Handle single item selection
  const handleSelectItem = (productId) => {
    const newSelectedItems = { ...selectedItems }
    // Đảo ngược trạng thái chọn của sản phẩm
    newSelectedItems[productId] = !selectedItems[productId]
    setSelectedItems(newSelectedItems)

    // Update select all state
    const allSelected = cartItems.every(
      (item) => newSelectedItems[item.product.id]
    )
    setSelectAll(allSelected)
  }

  // Handle quantity change
  const handleQuantityChange = (productId, delta) => {
    const currentQty = quantities[productId]
    const product = cartItems.find(
      (item) => item.product.id === productId
    ).product

    // Đảm bảo số lượng không dưới 1 và không vượt quá số lượng trong kho
    const newQty = Math.max(1, Math.min(product.stock, currentQty + delta))

    setQuantities({
      ...quantities,
      [productId]: newQty
    })
  }

  // Handle item removal
  const handleRemoveItem = (productId) => {
    // In a real app, this would call an API to remove the item
    // Implementation would dispatch a redux action or call API
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev }
      delete newSelectedItems[productId]
      return newSelectedItems
    })
  }

  // Handle checkout
  const handleCheckout = () => {
    // Implement checkout logic
    // In a real app, this would dispatch a redux action or call an API
    // const selectedItemsList = cartItems.filter(item => selectedItems[item.product.id])
    // Process checkout with selected items
  }

  // Handle shipping address change
  const handleAddressChange = (newAddress) => {
    // Update shipping address state with the new selected address
    if (newAddress) {
      // If we receive the fullAddress field (from new dialog format)
      if (newAddress.fullAddress) {
        setShippingAddress({
          ...newAddress,
          // Make sure we have the full address in the address property too for backwards compatibility
          address: newAddress.address
        })
      } else {
        setShippingAddress(newAddress)
      }
    }
  }

  return (
    <Box sx={{ py: 4, minHeight: '100vh' }}>
      <Container maxWidth='xl'>
        <Typography variant='h4' sx={{ mb: 3, fontWeight: 'bold' }}>
          Shopping Cart
        </Typography>

        <Grid container spacing={3}>
          {/* Main Cart Column */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Cart Header */}
            <CartHeader
              selectAll={selectAll}
              itemCount={allItemsCount}
              onSelectAll={handleSelectAll}
            />

            {/* Cart Items */}
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                isSelected={Boolean(selectedItems[item.product.id])}
                quantity={quantities[item.product.id]}
                onSelect={handleSelectItem}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                orderTotal={subtotal}
                onApplyVoucher={setAppliedVoucher}
              />
            ))}

            {/* Recommended Products */}
            <Box sx={{ mt: 4 }}>
              <RecommendedProducts products={recommendedProducts} />
            </Box>
          </Grid>

          {/* Order Summary Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                position: { xs: 'static', md: 'sticky' },
                top: 16
              }}
            >
              {/* Shipping Address */}
              <ShippingAddressCard
                address={shippingAddress}
                onChangeClick={handleAddressChange}
              />

              {/* Payment Summary */}
              <PaymentSummaryCard
                subtotal={subtotal}
                shippingFee={30000}
                discount={discount}
                totalItems={totalItems}
                onCheckout={handleCheckout}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default CartPage
