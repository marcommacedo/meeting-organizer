import { initFirebase } from "../firebase/config"
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  DocumentData,
} from "firebase/firestore"

interface IUseDb {
  create?: (id: string, obj: any) => Promise<void>
  get?: () => Promise<void | any>
  getById?: (id: string) => Promise<DocumentData | any>
  update?: (id: string) => Promise<void>
  remove?: (id: string) => Promise<void>
}

const UseDb = (): IUseDb => {
  initFirebase()
  const db = getFirestore()
  const clientsCollectionRef = collection(db, "clients")

  const create = async (client: string) => {
    await addDoc(clientsCollectionRef, {
      name: client,
    })
  }

  const get = async () => {
    const data = await getDocs(clientsCollectionRef)
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  }

  const getById = async (id: string) => {
    const ref = doc(db, "clients", id)
    const client = await getDoc(ref)
    const data = client.data()
    return data
  }

  const update = async (id: string) => {
    const clientDoc = doc(db, "clients", id)
    await updateDoc(clientDoc, { name: "Updated" })
  }

  const remove = async (id: string) => {
    const clientDoc = doc(db, "clients", id)
    await deleteDoc(clientDoc)
  }

  return {
    create,
    get,
    update,
    remove,
    getById,
  }
}

export default UseDb
