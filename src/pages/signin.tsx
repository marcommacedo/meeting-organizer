import AuthSignIn from "../components/auth/AuthSignIn"

export default function SignIn() {
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthSignIn mode="signin" />
    </div>
  )
}
