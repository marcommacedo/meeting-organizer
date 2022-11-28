import { useEffect, useState } from "react"
import Maps from "../components/maps/Maps"
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
        <Maps />
      </Layout>
    </>
  )
}
