import { authClient } from './neonAuth'

export type NeonSessionUser = {
  id: string
  email: string
  name: string
  image?: string | null
  emailVerified?: boolean
}

async function unwrap<T>(promise: Promise<{ data: T; error: { message?: string } | null }>) {
  const { data, error } = await promise
  if (error) {
    throw new Error(error.message || 'Authentication failed')
  }
  return data
}

export async function signUpEmail(input: {
  name: string
  email: string
  password: string
}) {
  return unwrap(authClient.signUp.email(input))
}

export async function signInEmail(input: { email: string; password: string }) {
  return unwrap(authClient.signIn.email(input))
}

export async function signInWithGoogle() {
  await authClient.signIn.social({
    provider: 'google',
    callbackURL: window.location.origin,
    newUserCallbackURL: '/',
    errorCallbackURL: '/login',
  })
}

export async function signOut() {
  await authClient.signOut()
}

export async function getSession() {
  return unwrap(authClient.getSession())
}

export async function getAccessToken(): Promise<string | null> {
  const { data, error } = await authClient.token()
  if (error || !data?.token) return null
  return data.token
}

export async function verifyEmailOtp(input: { email: string; otp: string }) {
  return unwrap(authClient.emailOtp.verifyEmail(input))
}

export async function resendVerificationEmail(email: string) {
  return unwrap(authClient.sendVerificationEmail({ email }))
}

export async function requestPasswordReset(email: string) {
  return unwrap(authClient.emailOtp.requestPasswordReset({ email }))
}

export async function verifyResetOtp(input: { email: string; otp: string }) {
  return unwrap(
    authClient.emailOtp.checkVerificationOtp({
      email: input.email,
      type: 'forget-password',
      otp: input.otp,
    }),
  )
}

export async function resetPassword(input: {
  email: string
  otp: string
  password: string
}) {
  return unwrap(authClient.emailOtp.resetPassword(input))
}
