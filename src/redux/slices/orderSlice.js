import { createSlice } from '@reduxjs/toolkit'

// Kiểu dữ liệu item trong giỏ hàng
// {
//   productId: string | number,
//   name: string,
//   price: number, // Giá gốc
//   discountedPrice: number, // Giá sau giảm giá
//   image: string,
//   countInStock: number,
//   quantity: number,
//   discount?: number, // Phần trăm giảm giá
//   // có thể mở rộng: attributes, shopId, variant...
// }

const initialState = {
  items: [],
  voucher: null,
  shippingAddress: null,
  paymentMethod: '',
  shippingFee: 30000
}

const findProductId = (product) => {
  return product?._id || product?.id || product?.productId || product?.sku
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, quantity = 1 } = action.payload || {}
      const productId = findProductId(product)
      if (!productId) return

      const name = product?.name || product?.title || 'Sản phẩm'
      const price = Number(product?.price) || 0 // Giá gốc
      const discountedPrice = Number(product?.discountedPrice) || price // Giá sau giảm giá
      const countInStock = Number(product?.countInStock || product?.stock || 0)
      const image = product?.image || product?.images?.[0] || ''
      const discount = Number(product?.discount) || 0

      const existing = state.items.find((it) => it.productId === productId)
      if (existing) {
        // Tăng số lượng nhưng không vượt quá tồn kho
        const newQty = Math.min(
          existing.quantity + quantity,
          (existing.countInStock ?? countInStock) || Infinity
        )
        existing.quantity = Math.max(1, newQty)
        // cập nhật thông tin cơ bản nếu có thay đổi (giá, tồn kho, ảnh, tên)
        existing.name = name
        existing.price = price
        existing.discountedPrice = discountedPrice
        existing.image = image
        existing.countInStock = countInStock
        existing.discount = discount
      } else {
        state.items.push({
          productId,
          name,
          price, // Giá gốc
          discountedPrice, // Giá sau giảm giá
          image,
          countInStock,
          discount,
          quantity: Math.max(1, Math.min(quantity, countInStock || quantity))
        })
      }
    },
    removeItem: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter((it) => it.productId !== productId)
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload || {}
      const item = state.items.find((it) => it.productId === productId)
      if (!item) return
      const q = Number(quantity)
      const max = item.countInStock || Infinity
      item.quantity = Math.max(1, Math.min(q, max))
    },
    clearCart: (state) => {
      state.items = []
      state.voucher = null
      state.shippingAddress = null
      state.paymentMethod = ''
      state.shippingFee = 30000
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload || null
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload || ''
    },
    setShippingFee: (state, action) => {
      const fee = Number(action.payload)
      state.shippingFee =
        Number.isFinite(fee) && fee >= 0 ? fee : state.shippingFee
    },
    applyVoucher: (state, action) => {
      state.voucher = action.payload || null
    },
    removeVoucher: (state) => {
      state.voucher = null
    }
  }
})

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setShippingAddress,
  setPaymentMethod,
  setShippingFee,
  applyVoucher,
  removeVoucher
} = orderSlice.actions

export const selectCartCount = (state) =>
  state.order?.items?.reduce(
    (sum, it) => sum + (Number(it.quantity) || 0),
    0
  ) || 0

// Selector để tính tổng tiền giỏ hàng (sử dụng giá sau giảm giá)
export const selectCartSubtotal = (state) =>
  state.order?.items?.reduce(
    (sum, it) =>
      sum + (Number(it.discountedPrice || it.price) * Number(it.quantity) || 0),
    0
  ) || 0

// Selector để tính tổng tiền giỏ hàng theo giá gốc
export const selectCartOriginalSubtotal = (state) =>
  state.order?.items?.reduce(
    (sum, it) => sum + (Number(it.price) * Number(it.quantity) || 0),
    0
  ) || 0

export default orderSlice.reducer
