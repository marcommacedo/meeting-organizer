import AuthCheck from "../auth/AuthCheck"

interface ILayout {
  children?: any
}

export default function Layout(props: ILayout) {
  return <AuthCheck>{props.children}</AuthCheck>
}
