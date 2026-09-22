import { createAuthClient } from '@neondatabase/neon-js/auth'

const neonAuthUrl = import.meta.env.VITE_NEON_AUTH_URL as string | undefined

if (!neonAuthUrl) {
  console.warn('VITE_NEON_AUTH_URL is not set — auth will not work until configured')
}

export const authClient = createAuthClient(neonAuthUrl ?? 'http://localhost/auth')
