// Centralized mock vouchers aligned with Joi schema
// Fields: code, type('percent'|'fixed'), amount, maxDiscount, minOrderValue,
// usageLimit(0=unlimited), usedCount, startDate, endDate, isActive, createdAt, updatedAt

import dayjs from 'dayjs'

const now = dayjs().valueOf()

const vouchers = [
  {
    _id: 'v1',
    code: 'WELCOME10',
    type: 'percent',
    amount: 10,
    maxDiscount: 50000,
    minOrderValue: 200000,
    usageLimit: 1000,
    usedCount: 123,
    startDate: '2025-01-01T00:00:00.000Z',
    endDate: '2025-12-31T23:59:59.999Z',
    isActive: true,
    createdAt: now - 1000 * 60 * 60 * 24 * 200,
    updatedAt: now - 1000 * 60 * 60 * 24 * 30
  },
  {
    _id: 'v2',
    code: 'FREESHIP',
    type: 'fixed',
    amount: 30000,
    maxDiscount: 0,
    minOrderValue: 150000,
    usageLimit: 500,
    usedCount: 88,
    startDate: '2025-05-01T00:00:00.000Z',
    endDate: '2025-09-30T23:59:59.999Z',
    isActive: true,
    createdAt: now - 1000 * 60 * 60 * 24 * 90,
    updatedAt: now - 1000 * 60 * 60 * 24 * 10
  },
  {
    _id: 'v3',
    code: 'SUMMER15',
    type: 'percent',
    amount: 15,
    maxDiscount: 70000,
    minOrderValue: 300000,
    usageLimit: 0,
    usedCount: 12,
    startDate: '2025-06-01T00:00:00.000Z',
    endDate: '2025-08-31T23:59:59.999Z',
    isActive: false,
    createdAt: now - 1000 * 60 * 60 * 24 * 70,
    updatedAt: now - 1000 * 60 * 60 * 24 * 60
  }
]

export default vouchers
