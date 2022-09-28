import React, { useState } from "react"; // biblioteca para guardar o estado da página

function Form() {
  function cadastrarUsuario(e) {
    e.preventDefault(); //Utilizado para quebrar o funcionamento normal do submit para não atualizar a tela
    console.log("Cadastrou usuário");
    console.log(name);
    console.log(password);
  }

  const [name, setName] = useState(); // seta o estado do input de nome
  const [password, setPassword] = useState(); // seta o estado do input de senha

  return (
    <>
      <h1>Meu cadastro:</h1>
      <form onSubmit={cadastrarUsuario}>
        <div>
          <label htmlFor="name">Nome: </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite o seu nome"
            onChange={(e) => setName(e.target.value)} // quando o valor do campo mudar, atualiza o valor do nome
          />
        </div>
        <div>
          <label htmlFor="password">Senha: </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digite a sua senha"
            onChange={(e) => setPassword(e.target.value)} //quando o valor do campo mudar, atualiza o valor da senha
          />
        </div>
        <div>
          <input type="submit" value="Cadastrar" />
        </div>
      </form>
    </>
  );
}

export default Form;
