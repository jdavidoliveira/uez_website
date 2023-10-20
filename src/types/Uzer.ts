export default interface UzerInterface {
    _id: string;
    nome: string;
    username: string | null;
    email: string;
    situacao: string;
    motivoBloqueio: string | null;
    CEP: string;
    endereco: {
      logradouro: string;
      numero: string;
      complemento: string;
      bairro: string;
      cidade: string;
      estado: string;
    };
    historicoCriminal: string | null;
    dataNascimento: string;
    dataCadastro: string;
    numeroTelefone: string;
    avaliacao: number;
    aprovacao: boolean;
    reprovacao: boolean;
    quantidadePedidosRealizados: number;
    servicosPrestados: {
      nomeServico: string;
      tipoServico: string;
      categoriaServico: string;
      areaAtuacao: number;
    }[];
    photoUrl: string;
    __versionOfSchema__: number;
  }
  