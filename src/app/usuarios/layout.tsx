import NotSession from "../../components/NotSession"

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {<NotSession />}
    </>
  )
}
