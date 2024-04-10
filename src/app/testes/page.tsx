import { cookies } from "next/headers"

export default async function Testes() {
  const response = await fetch("http://localhost:3333/clientes/82933", {
    credentials: "include",
    headers: {
      cookie: cookies().toString(),
    },
  }).then((res) => res.json())
  return <div>{JSON.stringify(response)}</div>
}

// "use client"

// import { useEffect, useState } from "react"

// export default function Testes() {
//   const [clientes, setClientes] = useState([])

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch("http://localhost:3333/clientes/82933", { credentials: "include" }).then((res) =>
//         res.json()
//       )

//       setClientes(response)
//     }

//     fetchData()
//   }, [])

//   return <div>{JSON.stringify(clientes)}</div>
// }
