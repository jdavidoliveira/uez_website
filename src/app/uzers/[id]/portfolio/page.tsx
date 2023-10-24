export default function Portfolio({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Página de porfolio</h1>
            <p>Em desenvolvimento</p>
            <p>Id do usuario: {params.id}</p>
        </div>
    )
}
