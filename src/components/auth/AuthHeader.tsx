import Link from "next/link"

interface AuthHeaderProps {
  heading: any
  paragraph?: string
  linkName?: string
  linkUrl?: string
}

export default function AuthHeader(props: AuthHeaderProps) {
  return (
    <div>
      <h2>{props.heading}</h2>
      <p>
        {props.paragraph}
        <Link href={props.linkUrl ?? "#"}>{props.linkName}</Link>
      </p>
    </div>
  )
}
