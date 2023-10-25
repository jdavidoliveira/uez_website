export default interface Pedido {
    _id: string;
    tipo: 'ambos' | 'online' | 'presencial';
    _categoriaServico: string;
    _servico: string;
    titulo: string;
    descricao: string;
    status: string;
    disponivel: boolean;
    _id_uzer: string | null;
    _id_cliente: string;
    dataCriacao: string;
    dataFinalizacao: string | null;
    valor: number;
    __versionOfSchema__: number;
  }
  