function Saudacao({ nome }) {
  function gerarSaudacao(algumNome) {
    return `Olá, ${algumNome}! Tudo bem?`;
  }
  return (
    <>
      {nome ? (
        <p>{gerarSaudacao(nome)}</p>
      ) : (
        <p>Aguardando um nome ser digitado</p>
      )}
    </>
  );
}
export default Saudacao;
