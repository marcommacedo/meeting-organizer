import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import DbContext from "../../../data/hook/useDb"

export default function ClienteById() {
  const { create } = DbContext()

  const router = useRouter()
  const [id, setId] = useState<any>()

  useEffect(() => {
    const id = router?.query.id
    setId(id)
  }, [router?.query])

  async function newClient() {
    await create?.("client", 1, "Teste")
  }

  return (
    <div>
      <button onClick={newClient}>criar</button>
    </div>
  )
}
