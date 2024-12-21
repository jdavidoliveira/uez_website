import NotSession from "./NotSession"

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {<NotSession />}
    </>
  )
}
