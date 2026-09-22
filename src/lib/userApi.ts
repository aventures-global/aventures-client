import { apiFetch } from './apiClient'

export type AppUser = {
  id: string
  email: string | null
  firstName: string | null
  lastName: string | null
  phone: string | null
  profilePicture: string | null
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN'
  createdAt: string
  updatedAt: string
}

function splitName(name?: string | null) {
  const trimmed = name?.trim() ?? ''
  if (!trimmed) return { firstName: null, lastName: null }
  const parts = trimmed.split(/\s+/)
  return {
    firstName: parts[0] ?? null,
    lastName: parts.slice(1).join(' ') || null,
  }
}

export async function bootstrapUser(
  token: string,
  seed: { name?: string | null; email?: string | null; image?: string | null },
) {
  const { firstName, lastName } = splitName(seed.name)
  const body = {
    email: seed.email ?? null,
    firstName,
    lastName,
    profilePicture:
      seed.image && /^https?:\/\//i.test(seed.image) ? seed.image : null,
  }

  const result = await apiFetch<{ user: AppUser }>('/api/me/bootstrap', {
    method: 'POST',
    token,
    body: JSON.stringify(body),
  })
  return result.user
}

export async function fetchMe(token: string) {
  const result = await apiFetch<{ user: AppUser }>('/api/me', { token })
  return result.user
}
