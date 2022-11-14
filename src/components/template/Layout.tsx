import AuthCheck from "../auth/AuthCheck"

interface ILayout {
  public?: boolean
  children?: any
}

export default function Layout(props: ILayout) {
  return props.public ? (
    <>{props.children}</>
  ) : (
    <AuthCheck>{props.children}</AuthCheck>
  )
}
