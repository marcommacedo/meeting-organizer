import { useEffect, useState } from "react"
import Layout from "../components/template/Layout"
import UseDb from "../services/clients.service"

export default function Home() {
  const [clients, setClients] = useState<any>([])

  useEffect(() => {
    const { get } = UseDb()

    const getClients = async () => {
      const data = await get?.()
      setClients(data)
    }

    getClients()
  }, [])

  return (
    <>
      <Layout>
        <h1>Oi</h1>
        <ul>
          {clients.map((client: any) => (
            <li key={client.id}>{client.name}</li>
          ))}
        </ul>
      </Layout>
    </>
  )
}
