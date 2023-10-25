export default interface Servico {
    _id: string
    idServico: string,
    nome: string,
    tipo: [
        "Á Distância",
        "Á Domicílio"
    ],
    categoria: string,
    descricao: string,
    quantidadeFeitos: number,
    __versionOfSchema__: number
}