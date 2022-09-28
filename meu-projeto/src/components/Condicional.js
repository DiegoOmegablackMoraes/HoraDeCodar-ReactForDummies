import React, { useState } from "react";

function Condicional() {
  const [email, setEmail] = useState();
  const [userEmail, setUserEmail] = useState();

  function enviarEmail(e) {
    e.preventDefault();
    setUserEmail(email);
  }

  function limparEmail() {
    setUserEmail("");
    let valor = document.getElementById("email");
    valor.value = "";
  }
  return (
    <>
      <h2>Cadastre o seu e-mail:</h2>
      <form>
        <input
          type="email"
          id="email"
          placeholder="Digite o seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" onClick={enviarEmail}>
          Enviar email
        </button>
        {userEmail && ( // não é o comparador "E", mas sim uma maneira de fazer um IF no React
          <div>
            <p>O email do usuário é: {userEmail} </p>
            <button onClick={limparEmail}>Limpar Email</button>
          </div>
        )}
      </form>
    </>
  );
}

export default Condicional;
