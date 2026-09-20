import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type DemoUser = {
  name: string
  email: string
}

type AuthContextValue = {
  user: DemoUser | null
  isLoggedIn: boolean
  login: (input?: Partial<DemoUser>) => void
  signup: (input?: Partial<DemoUser>) => void
  logout: () => void
}

const STORAGE_KEY = 'aventures-demo-user'

const DEFAULT_USER: DemoUser = {
  name: 'Guest Traveler',
  email: 'guest@aventures.demo',
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredUser(): DemoUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<DemoUser>
    if (!parsed || typeof parsed !== 'object') return null
    return {
      name: parsed.name?.trim() || DEFAULT_USER.name,
      email: parsed.email?.trim() || DEFAULT_USER.email,
    }
  } catch {
    return null
  }
}

function normalizeUser(input?: Partial<DemoUser>): DemoUser {
  return {
    name: input?.name?.trim() || DEFAULT_USER.name,
    email: input?.email?.trim() || DEFAULT_USER.email,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => readStoredUser())

  const persist = useCallback((next: DemoUser | null) => {
    setUser(next)
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const login = useCallback(
    (input?: Partial<DemoUser>) => {
      persist(normalizeUser(input))
    },
    [persist],
  )

  const signup = useCallback(
    (input?: Partial<DemoUser>) => {
      persist(normalizeUser(input))
    },
    [persist],
  )

  const logout = useCallback(() => {
    persist(null)
  }, [persist])

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
