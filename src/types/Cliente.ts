export default interface ClienteInterface {
    _id: string;
    nome: string;
    username: string | null;
    email: string;
    situacao: string;
    motivoBloqueio: string;
    CEP: string;
    endereco: {
        logradouro: string;
        numero: string;
        complemento: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
    dataNascimento: string;
    dataCadastro: string;
    telefone: string | null;
    userType: string;
    aprovacao: boolean;
    avaliacao: number;
    reprovacao: boolean;
    quantidadePedidos: number;
    photoUrl: string;
    __versionOfSchema__: number;
    bannerImage: string;
    chats: any[]; // Você pode definir um tipo mais específico se necessário
}
