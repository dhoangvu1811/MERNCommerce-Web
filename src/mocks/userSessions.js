// Mock data cho user sessions
export const mockUsers = [
  {
    _id: '66f1234567890abcdef01234',
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@example.com',
    phone: '+84901234567',
    address: '123 Đường Lê Loi, Quận 1, TP.HCM',
    avatar: null,
    isActive: true,
    isEmailVerified: true,
    createdAt: '2024-01-15T08:30:00Z',
    lastLoginAt: '2024-03-20T14:30:00Z'
  },
  {
    _id: '66f1234567890abcdef01235',
    name: 'Trần Thị Bình',
    email: 'tranthibinh@example.com',
    phone: '+84902345678',
    address: '456 Đường Nguyễn Huệ, Quận 3, TP.HCM',
    avatar: null,
    isActive: true,
    isEmailVerified: false,
    createdAt: '2024-02-10T10:15:00Z',
    lastLoginAt: '2024-03-19T09:45:00Z'
  },
  {
    _id: '66f1234567890abcdef01236',
    name: 'Lê Hoàng Cường',
    email: 'lehoangcuong@example.com',
    phone: '+84903456789',
    address: '789 Đường Pasteur, Quận 1, TP.HCM',
    avatar: null,
    isActive: false,
    isEmailVerified: true,
    createdAt: '2024-01-25T16:20:00Z',
    lastLoginAt: '2024-03-18T11:20:00Z'
  },
  {
    _id: '66f1234567890abcdef01237',
    name: 'Phạm Minh Dũng',
    email: 'phamminhdung@example.com',
    phone: '+84904567890',
    address: '321 Đường Võ Văn Tần, Quận 3, TP.HCM',
    avatar: null,
    isActive: true,
    isEmailVerified: true,
    createdAt: '2024-03-01T12:45:00Z',
    lastLoginAt: '2024-03-20T16:10:00Z'
  },
  {
    _id: '66f1234567890abcdef01238',
    name: 'Hoàng Thị Em',
    email: 'hoangthiem@example.com',
    phone: '+84905678901',
    address: '654 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM',
    avatar: null,
    isActive: true,
    isEmailVerified: false,
    createdAt: '2024-02-20T09:30:00Z',
    lastLoginAt: '2024-03-19T13:25:00Z'
  },
  {
    _id: '66f1234567890abcdef01239',
    name: 'Vũ Đình Phong',
    email: 'vudinhphong@example.com',
    phone: '+84906789012',
    address: '987 Đường Nam Kỳ Khởi Nghĩa, Quận 1, TP.HCM',
    avatar: null,
    isActive: true,
    isEmailVerified: true,
    createdAt: '2024-01-05T14:00:00Z',
    lastLoginAt: '2024-03-20T10:15:00Z'
  }
]

// Mock data cho sessions của từng user
export const mockUserSessions = {
  '66f1234567890abcdef01234': [
    {
      _id: 'session_01234_001',
      userId: '66f1234567890abcdef01234',
      sessionId: 'sess_abc123def456',
      device: 'Chrome on Windows 10',
      ipAddress: '192.168.1.100',
      location: 'TP.HCM, Việt Nam',
      loginTime: '2024-03-20T14:30:00Z',
      lastActivity: '2024-03-20T16:45:00Z',
      isActive: true,
      expiresAt: '2024-03-27T14:30:00Z'
    },
    {
      _id: 'session_01234_002',
      userId: '66f1234567890abcdef01234',
      sessionId: 'sess_xyz789ghi012',
      device: 'Safari on iPhone 15',
      ipAddress: '192.168.1.101',
      location: 'TP.HCM, Việt Nam',
      loginTime: '2024-03-19T09:15:00Z',
      lastActivity: '2024-03-19T22:30:00Z',
      isActive: false,
      expiresAt: '2024-03-26T09:15:00Z'
    },
    {
      _id: 'session_01234_003',
      userId: '66f1234567890abcdef01234',
      sessionId: 'sess_mno345pqr678',
      device: 'Chrome on Android 14',
      ipAddress: '192.168.1.102',
      location: 'Hà Nội, Việt Nam',
      loginTime: '2024-03-18T11:20:00Z',
      lastActivity: '2024-03-18T15:45:00Z',
      isActive: false,
      expiresAt: '2024-03-25T11:20:00Z'
    }
  ],
  '66f1234567890abcdef01235': [
    {
      _id: 'session_01235_001',
      userId: '66f1234567890abcdef01235',
      sessionId: 'sess_def456ghi789',
      device: 'Firefox on Windows 11',
      ipAddress: '192.168.2.50',
      location: 'TP.HCM, Việt Nam',
      loginTime: '2024-03-19T09:45:00Z',
      lastActivity: '2024-03-19T18:20:00Z',
      isActive: true,
      expiresAt: '2024-03-26T09:45:00Z'
    },
    {
      _id: 'session_01235_002',
      userId: '66f1234567890abcdef01235',
      sessionId: 'sess_jkl012mno345',
      device: 'Edge on Windows 11',
      ipAddress: '192.168.2.51',
      location: 'TP.HCM, Việt Nam',
      loginTime: '2024-03-17T14:10:00Z',
      lastActivity: '2024-03-17T20:35:00Z',
      isActive: false,
      expiresAt: '2024-03-24T14:10:00Z'
    }
  ],
  '66f1234567890abcdef01236': [
    {
      _id: 'session_01236_001',
      userId: '66f1234567890abcdef01236',
      sessionId: 'sess_pqr678stu901',
      device: 'Chrome on MacOS',
      ipAddress: '192.168.3.25',
      location: 'Đà Nẵng, Việt Nam',
      loginTime: '2024-03-18T11:20:00Z',
      lastActivity: '2024-03-18T17:45:00Z',
      isActive: false,
      expiresAt: '2024-03-25T11:20:00Z'
    }
  ],
  '66f1234567890abcdef01237': [
    {
      _id: 'session_01237_001',
      userId: '66f1234567890abcdef01237',
      sessionId: 'sess_vwx234yz567',
      device: 'Chrome on Windows 10',
      ipAddress: '192.168.4.80',
      location: 'TP.HCM, Việt Nam',
      loginTime: '2024-03-20T16:10:00Z',
      lastActivity: '2024-03-20T18:30:00Z',
      isActive: true,
      expiresAt: '2024-03-27T16:10:00Z'
    },
    {
      _id: 'session_01237_002',
      userId: '66f1234567890abcdef01237',
      sessionId: 'sess_abc890def123',
      device: 'Safari on iPad Pro',
      ipAddress: '192.168.4.81',
      location: 'TP.HCM, Việt Nam',
      loginTime: '2024-03-19T13:25:00Z',
      lastActivity: '2024-03-19T21:15:00Z',
      isActive: false,
      expiresAt: '2024-03-26T13:25:00Z'
    },
    {
      _id: 'session_01237_003',
      userId: '66f1234567890abcdef01237',
      sessionId: 'sess_ghi456jkl789',
      device: 'Firefox on Ubuntu',
      ipAddress: '192.168.4.82',
      location: 'Cần Thơ, Việt Nam',
      loginTime: '2024-03-16T08:30:00Z',
      lastActivity: '2024-03-16T12:45:00Z',
      isActive: false,
      expiresAt: '2024-03-23T08:30:00Z'
    }
  ],
  '66f1234567890abcdef01238': [
    {
      _id: 'session_01238_001',
      userId: '66f1234567890abcdef01238',
      sessionId: 'sess_mno012pqr345',
      device: 'Chrome on Android 13',
      ipAddress: '192.168.5.15',
      location: 'TP.HCM, Việt Nam',
      loginTime: '2024-03-19T13:25:00Z',
      lastActivity: '2024-03-19T19:50:00Z',
      isActive: true,
      expiresAt: '2024-03-26T13:25:00Z'
    }
  ],
  '66f1234567890abcdef01239': [
    {
      _id: 'session_01239_001',
      userId: '66f1234567890abcdef01239',
      sessionId: 'sess_stu678vwx901',
      device: 'Chrome on Windows 10',
      ipAddress: '192.168.6.45',
      location: 'TP.HCM, Việt Nam',
      loginTime: '2024-03-20T10:15:00Z',
      lastActivity: '2024-03-20T17:20:00Z',
      isActive: true,
      expiresAt: '2024-03-27T10:15:00Z'
    },
    {
      _id: 'session_01239_002',
      userId: '66f1234567890abcdef01239',
      sessionId: 'sess_yzab234cdef567',
      device: 'Safari on MacBook Pro',
      ipAddress: '192.168.6.46',
      location: 'Hà Nội, Việt Nam',
      loginTime: '2024-03-18T15:40:00Z',
      lastActivity: '2024-03-18T23:55:00Z',
      isActive: false,
      expiresAt: '2024-03-25T15:40:00Z'
    }
  ]
}

// Helper functions để lấy data
export const getUserById = (userId) => {
  return mockUsers.find((user) => user._id === userId)
}

export const getSessionsByUserId = (userId) => {
  return mockUserSessions[userId] || []
}

export const getAllUsersWithSessionCount = () => {
  return mockUsers.map((user) => ({
    ...user,
    sessionCount: mockUserSessions[user._id]?.length || 0,
    activeSessionCount:
      mockUserSessions[user._id]?.filter((session) => session.isActive)
        .length || 0
  }))
}
