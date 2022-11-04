import Head from "next/head"
import { useRouter } from "next/router"
import useAuth from "../../data/hook/useAuth"

export default function AuthCheck(props: any) {
  const router = useRouter()
  const { user, loading } = useAuth()

  function renderContent() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    if(!document.cookie?.includes("meeting-organizer-auth")) {
                        window.location.href = "/signin"
                    }
                `,
            }}
          />
        </Head>
        {props.children}
      </>
    )
  }

  function renderLoading() {
    return (
      <div>
        <div>Loading</div>
      </div>
    )
  }

  if (!loading && user?.email) {
    return renderContent()
  } else if (loading) {
    return renderLoading()
  } else {
    router.push("/signin")
    return <></>
  }
}
