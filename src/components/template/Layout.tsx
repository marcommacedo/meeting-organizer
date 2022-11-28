import AuthCheck from "../auth/AuthCheck"
import Sidebar from "./Sidebar"

interface ILayout {
  public?: boolean
  children?: any
}

export default function Layout(props: ILayout) {
  return props.public ? (
    <>{props.children}</>
  ) : (
    <div className="flex flex-col h-screen w-screen bg-gray-700 text-gray-100">
      <AuthCheck>
        <div className="flex">
          <Sidebar />
          <div className="flex flex-grow m-4">{props.children}</div>
        </div>
      </AuthCheck>
    </div>
  )
}
