import Link from "next/link"
import { useState } from "react"
import useAuth from "../../data/hook/useAuth"
import AuthHeader from "./AuthHeader"
import AuthInput from "./AuthInput"

interface AuthProps {
  mode: "in" | "up"
}

export default function AuthSignIn(props: AuthProps) {
  const { signIn, signUp, signInGoogle, forgotPassword } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const submit = async () => {
    try {
      if (props.mode === "in") {
        await signIn?.(email, password, rememberMe)
      } else {
        await signUp?.(email, password)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const submitGoogle = async () => {
    try {
      await signInGoogle?.()
    } catch (e) {
      console.log(e)
    }
  }

  const resetPassword = async () => {
    try {
      await forgotPassword?.(email)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-1/2">
        <AuthHeader
          heading={
            props.mode === "in" ? (
              <Link href="signup">
                Don&#39;t have an account? Create an account
              </Link>
            ) : (
              <Link href="signin">Already have an account? Sign in now</Link>
            )
          }
        />
        <AuthInput
          id="email"
          type="text"
          label="E-mail"
          placeholder="E-mail"
          value={email}
          onChange={setEmail}
        />
        <AuthInput
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />

        {props.mode === "in" ? (
          <div className="flex mt-4 justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-1"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Stay signed in for 2 weeks</label>
            </div>
            <Link href={"/"} onClick={resetPassword}>
              Forgot password?
            </Link>
          </div>
        ) : (
          false
        )}

        <button
          onClick={submit}
          className="bg-red-500 hover:bg-red-400 rounded-lg text-white text-md py-2 mt-4"
        >
          {props.mode === "in" ? "Sign In" : "Sign Up"}
        </button>

        <hr />

        <div className="flex justify-center items-center mt-4">
          <button onClick={submitGoogle}>
            {props.mode === "in" ? "Sign in" : "Sign up"} with Google
          </button>
        </div>
      </div>
    </div>
  )
}
