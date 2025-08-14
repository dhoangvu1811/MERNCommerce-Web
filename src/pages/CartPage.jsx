import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Grid, Typography } from '@mui/material'
import RecommendedProducts from '../components/Cart/RecommendedProducts'
import CartHeader from '../components/Cart/CartHeader'
import CartItem from '../components/Cart/CartItem/CartItem'
import ShippingAddressCard from '../components/Cart/ShippingAddressCard'
import PaymentSummaryCard from '../components/Cart/PaymentSummaryCard'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateQuantity as updateCartQuantity,
  removeItem as removeCartItem,
  setShippingAddress as setCartShippingAddress,
  selectCartSubtotal
} from '~/redux/slices/orderSlice'
import { useAuth } from '~/hooks/useAuth'

// Items sẽ lấy từ Redux order slice

const recommendedProducts = [
  {
    id: 301,
    name: 'AirPods Pro 2',
    image: '/src/assets/products/detail.png',
    price: 5990000,
    discount: 14,
    freeShipping: true
  },
  {
    id: 302,
    name: 'iPhone 14 Pro Max Silicon Case',
    image: '/src/assets/products/iphone-1.jpg',
    price: 790000,
    discount: 20,
    freeShipping: true
  },
  {
    id: 303,
    name: '20W USB-C Fast Charger',
    image: '/src/assets/products/detail.png',
    price: 590000,
    discount: 25,
    freeShipping: true
  },
  {
    id: 304,
    name: 'USB-C to Lightning Cable',
    image: '/src/assets/products/iphone-1.jpg',
    price: 490000,
    discount: 17,
    freeShipping: true
  },
  {
    id: 305,
    name: 'iPhone Tempered Glass Screen Protector',
    image: '/src/assets/products/detail.png',
    price: 290000,
    discount: 26,
    freeShipping: true
  }
]

function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, currentUser } = useAuth()
  const items = useSelector((state) => state.order.items)
  const persistedAddress = useSelector((state) => state.order.shippingAddress)

  // State for selected items
  const [selectedItems, setSelectedItems] = useState({})
  const [selectAll, setSelectAll] = useState(false)
  // Build default shipping address from current user (auth slice) - standardized to user schema
  const userDefaultShippingAddress = useMemo(() => {
    if (!currentUser) return null
    return {
      id: currentUser?._id ?? 1,
      name: currentUser?.name || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '', // user.address is a string per schema
      city: '',
      province: '',
      postalCode: '',
      isDefault: true
    }
  }, [currentUser])

  const [shippingAddress, setShippingAddress] = useState(
    persistedAddress || userDefaultShippingAddress
  )

  // Update shipping address when user info loads (if nothing persisted yet)
  useEffect(() => {
    if (!persistedAddress && userDefaultShippingAddress) {
      setShippingAddress(userDefaultShippingAddress)
    }
  }, [persistedAddress, userDefaultShippingAddress])

  const quantities = useMemo(() => {
    const map = {}
    items?.forEach((it) => {
      map[it.productId] = it.quantity
    })
    return map
  }, [items])

  const [appliedVoucher, setAppliedVoucher] = useState(null)
  const [requireEditAddress, setRequireEditAddress] = useState(false)
  const [addressConfirmedAt, setAddressConfirmedAt] = useState(null)

  // Calculate total selected items and price
  const totalItems = Object.keys(selectedItems).filter(
    (id) => selectedItems[id]
  ).length

  // Tính subtotal dựa trên giá sau giảm giá của các sản phẩm được chọn
  const subtotal = (items || []).reduce((sum, item) => {
    if (selectedItems[item.productId]) {
      // Sử dụng discountedPrice nếu có, không thì dùng price
      const itemPrice = item.discountedPrice || item.price
      return sum + Number(itemPrice) * Number(item.quantity)
    }
    return sum
  }, 0)

  const discount = appliedVoucher?.discount || 0

  // Check if all items are selected
  const allItemsCount = items?.length || 0

  // Handle select all
  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)

    const newSelectedItems = {}
    ;(items || []).forEach((item) => {
      newSelectedItems[item.productId] = newSelectAll
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
    const allSelected = (items || []).every(
      (item) => newSelectedItems[item.productId]
    )
    setSelectAll(allSelected)
  }

  // Handle quantity change
  const handleQuantityChange = (productId, delta) => {
    const currentQty = quantities[productId] || 1
    const newQty = currentQty + delta
    dispatch(updateCartQuantity({ productId, quantity: Math.max(1, newQty) }))
  }

  // Handle item removal
  const handleRemoveItem = (productId) => {
    dispatch(removeCartItem(productId))
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev }
      delete newSelectedItems[productId]
      return newSelectedItems
    })
  }

  // Handle checkout
  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Yêu cầu đăng nhập trước khi checkout (UI: đã có logic mở dialog ở BuyBox)
      return
    }
    // Bắt buộc người dùng cập nhật/ xác nhận địa chỉ giao hàng trước khi checkout
    const requiredFields = ['name', 'phone', 'address']
    const hasValidAddress = requiredFields.every(
      (k) =>
        shippingAddress && String(shippingAddress[k] || '').trim().length > 0
    )
    if (!hasValidAddress) {
      setRequireEditAddress(true)
      return
    }
    // Optional: enforce reconfirmation if user just logged in and never confirmed
    if (!addressConfirmedAt) {
      setRequireEditAddress(true)
      return
    }
    navigate('/checkout')
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
      dispatch(setCartShippingAddress(newAddress))
      setAddressConfirmedAt(Date.now())
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
            {items?.map((item) => (
              <CartItem
                key={item.productId}
                item={{
                  id: item.productId,
                  shopName: 'Shop',
                  product: {
                    id: item.productId,
                    name: item.name,
                    image: item.image,
                    price: item.price, // Giá gốc
                    discount: item.discount || 0, // Phần trăm giảm giá
                    color: item.color || 'N/A',
                    size: item.size || 'N/A',
                    quantity: item.quantity,
                    countInStock: item.countInStock || 999,
                    deliveryDate: '2-4 days'
                  }
                }}
                isSelected={Boolean(selectedItems?.[item.productId])}
                quantity={quantities?.[item.productId]}
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
                requestEdit={requireEditAddress}
                onEditHandled={() => setRequireEditAddress(false)}
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
