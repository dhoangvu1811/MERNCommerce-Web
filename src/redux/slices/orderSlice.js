import { createSlice } from '@reduxjs/toolkit'

// Kiểu dữ liệu item trong giỏ hàng
// {
//   productId: string | number,
//   name: string,
//   price: number,
//   image: string,
//   countInStock: number,
//   quantity: number,
//   discount?: number,
//   // có thể mở rộng: attributes, shopId, variant...
// }

const initialState = {
  items: [],
  voucher: null,
  shippingAddress: null
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
      const price = Number(product?.price) || 0
      const countInStock = Number(
        product?.countInStock || product?.stock || 0
      )
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
        existing.image = image
        existing.countInStock = countInStock
        existing.discount = discount
      } else {
        state.items.push({
          productId,
          name,
          price,
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
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload || null
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
  applyVoucher,
  removeVoucher
} = orderSlice.actions

export const selectCartCount = (state) =>
  state.order?.items?.reduce(
    (sum, it) => sum + (Number(it.quantity) || 0),
    0
  ) || 0

export default orderSlice.reducer
