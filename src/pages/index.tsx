import Layout from "../components/template/Layout"
import useAuth from "../data/hook/useAuth"

export default function Home() {
  const { logout } = useAuth()

  return (
    <Layout>
      <h1>Oi</h1>
      <button onClick={logout}>sing out</button>
    </Layout>
  )
}
