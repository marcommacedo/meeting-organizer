import Link from "next/link"
import { useState } from "react"
import useAuth from "../../data/hook/useAuth"
import AuthHeader from "./AuthHeader"
import AuthInput from "./AuthInput"

interface AuthProps {
  mode: "signin" | "singup"
}

export default function AuthSignIn(props: AuthProps) {
  const { signIn, signUp } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = async () => {
    try {
      if (props.mode === "signin") {
        await signIn?.(email, password)
      } else {
        await signUp?.(email, password)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col w-1/2">
      <AuthHeader heading="Hello World" />
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

      <div className="flex mt-4 justify-between">
        <div className="flex items-center">
          <input type="checkbox" className="mr-1" id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <Link href={"/"}>Forgot password?</Link>
      </div>

      <button
        onClick={submit}
        className="bg-red-500 hover:bg-red-400 rounded-lg text-white text-md py-2 mt-4"
      >
        {props.mode === "signin" ? "Sign In" : "Sign Up"}
      </button>

      <hr />
    </div>
  )
}
