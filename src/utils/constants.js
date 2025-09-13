// API Configuration (reads from Vite env)
// Prefer VITE_API_BASE_URL; fall back to legacy VITE_API_ROOT; then default local
const ENV_BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL ||
  import.meta?.env?.VITE_API_ROOT ||
  'http://localhost:8017/v1'

const ENV_TIMEOUT_MS = Number(import.meta?.env?.VITE_API_TIMEOUT_MS)

export const API_CONFIG = {
  BASE_URL: ENV_BASE_URL,
  TIMEOUT: Number.isFinite(ENV_TIMEOUT_MS) && ENV_TIMEOUT_MS > 0
    ? ENV_TIMEOUT_MS
    : 1000 * 60 * 10
}
