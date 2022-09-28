function OutraLista({ itens }) {
  return (
    <>
      <h3>Lista de coisas boas: </h3>
      {itens.length > 0 ? ( // Operador ternário: se houver itens na lista, varre a lista com MAP e gera um paragrafo pra cada item
        itens.map((item, index) => <p key={index}>{item}</p>)
      ) : (
        //senão houver itens na lista, gera um paragracom a mensagem abaixo.
        <p>Não há itens na lista!</p>
      )}
    </>
  );
}

export default OutraLista;
