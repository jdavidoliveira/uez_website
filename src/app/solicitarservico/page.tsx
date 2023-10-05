export default function SolicitarServico() {
    return (
        <main className="w-full h-full flex flex-col items-center gap-24 p-20">
            <div className="w-full flex flex-col items-center gap-4 justify-center">
                <h1 className="text-4xl font-bold">Solicitar serviço</h1>
                <h2 className="text-xl font-semibold">Preencha os campos para lançar seu serviço na nossa platafoma</h2>
            </div>
            <div className="w-full flex flex-row items-center self-center justify-center">
                <div className=""></div>
                <div>
                    <button className="bg-azulao p-4 h-14 w-80 rounded-lg font-bold text-white text-xl transition hover:scale-105">Solicitar</button>
                </div>
            </div>

        </main>
    )
}
