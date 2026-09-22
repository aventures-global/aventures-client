import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  getAccessToken,
  getSession,
  signInEmail,
  signInWithGoogle,
  signOut,
  signUpEmail,
} from './authApi'
import { bootstrapUser, type AppUser } from './userApi'

export type AuthUser = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string | null
}

type AuthContextValue = {
  user: AuthUser | null
  appUser: AppUser | null
  token: string | null
  isLoggedIn: boolean
  isLoading: boolean
  error: string | null
  otp: string | null
  setVerificationCode: (otp: string | null) => void
  login: (input: { email: string; password: string }) => Promise<void>
  signup: (input: {
    name: string
    email: string
    password: string
  }) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function toAuthUser(sessionUser: {
  id: string
  email: string
  name?: string | null
  image?: string | null
  emailVerified?: boolean
}): AuthUser {
  return {
    id: sessionUser.id,
    email: sessionUser.email,
    name: sessionUser.name?.trim() || sessionUser.email,
    emailVerified: Boolean(sessionUser.emailVerified),
    image: sessionUser.image,
  }
}

function displayName(appUser: AppUser | null, fallback: string) {
  if (!appUser) return fallback
  const full = [appUser.firstName, appUser.lastName].filter(Boolean).join(' ')
  return full || appUser.email || fallback
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [appUser, setAppUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [otp, setOtp] = useState<string | null>(null)
  const bootstrappedFor = useRef<string | null>(null)

  const syncBootstrap = useCallback(async (accessToken: string, neonUser: AuthUser) => {
    const synced = await bootstrapUser(accessToken, {
      name: neonUser.name,
      email: neonUser.email,
      image: neonUser.image,
    })
    bootstrappedFor.current = neonUser.id
    setAppUser(synced)
  }, [])

  const applySession = useCallback(
    async (options?: { syncApp?: boolean }) => {
      const session = await getSession()
      const sessionUser = session?.user
      if (!sessionUser?.id || !sessionUser.email) {
        setToken(null)
        setUser(null)
        setAppUser(null)
        bootstrappedFor.current = null
        return
      }

      const authUser = toAuthUser(sessionUser)
      const accessToken =
        (session as { session?: { token?: string } } | null)?.session?.token ??
        (await getAccessToken())

      if (!accessToken) {
        setToken(null)
        setUser(authUser)
        return
      }

      setToken(accessToken)
      setUser(authUser)

      const shouldSync =
        options?.syncApp !== false || bootstrappedFor.current !== authUser.id
      if (shouldSync) {
        await syncBootstrap(accessToken, authUser)
      }
    },
    [syncBootstrap],
  )

  const refresh = useCallback(async () => {
    setError(null)
    try {
      await applySession()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh session')
      setToken(null)
      setUser(null)
      setAppUser(null)
    }
  }, [applySession])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setIsLoading(true)
      try {
        await applySession()
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load session')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [applySession])

  const login = useCallback(
    async (input: { email: string; password: string }) => {
      setError(null)
      await signInEmail(input)
      await applySession()
    },
    [applySession],
  )

  const signup = useCallback(
    async (input: { name: string; email: string; password: string }) => {
      setError(null)
      await signUpEmail(input)
      await applySession()
    },
    [applySession],
  )

  const loginWithGoogle = useCallback(async () => {
    setError(null)
    await signInWithGoogle()
  }, [])

  const logout = useCallback(async () => {
    setError(null)
    await signOut()
    setToken(null)
    setUser(null)
    setAppUser(null)
    bootstrappedFor.current = null
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    const mappedUser = user
      ? {
          ...user,
          name: displayName(appUser, user.name),
          email: appUser?.email || user.email,
        }
      : null

    return {
      user: mappedUser,
      appUser,
      token,
      isLoggedIn: Boolean(mappedUser),
      isLoading,
      error,
      otp,
      setVerificationCode: setOtp,
      login,
      signup,
      loginWithGoogle,
      logout,
      refresh,
    }
  }, [
    user,
    appUser,
    token,
    isLoading,
    error,
    otp,
    login,
    signup,
    loginWithGoogle,
    logout,
    refresh,
  ])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
