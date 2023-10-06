export default function Cliente({ params }: { params: { id: string } }) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1>Uzer</h1>
        <h2>Id do cliente: {params.id}</h2>
      </div>
    )
  }
  