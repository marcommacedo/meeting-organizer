import { createContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import User from "../../model/User"
import { initFirebase } from "../../firebase/config"
import {
  User as userFirebase,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onIdTokenChanged,
} from "firebase/auth"
import { useRouter } from "next/router"

interface IAuthContext {
  user?: User
  loading?: boolean
  signIn?: (email: string, password: string) => Promise<void>
  signUp?: (email: string, password: string) => Promise<void>
  logout?: () => Promise<void>
}

const AuthContext = createContext<IAuthContext>({})

async function formatUser(userFirebase: userFirebase): Promise<User> {
  const token = await userFirebase.getIdToken()
  return {
    uid: userFirebase.uid,
    name: userFirebase.displayName,
    email: userFirebase.email,
    token,
  }
}

export function AuthProvider(props: any) {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies([
    "meeting-organizer-auth",
  ])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User>()

  const manageCookie = async (logged: boolean) => {
    if (logged) {
      setCookie("meeting-organizer-auth", logged, {
        maxAge: 604.8,
      })
    } else {
      removeCookie("meeting-organizer-auth")
    }
  }

  initFirebase()
  const auth = getAuth()

  const configSession = async (userFirebase: userFirebase) => {
    if (userFirebase?.email) {
      const user = await formatUser(userFirebase)
      setUser(user)
      setLoading(false)
      return user.email
    } else {
      setUser(null as any)
      setLoading(true)
      return false
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      await configSession(res.user)
      await manageCookie(true)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await configSession(res.user)
      await manageCookie(true)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await signOut(auth)
      await configSession(null as any)
      await manageCookie(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (cookies["meeting-organizer-auth"]) {
      const cancel = onIdTokenChanged(auth, configSession as any)
      return cancel
    } else {
      setLoading(false)
    }
  }, [auth, cookies])

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
