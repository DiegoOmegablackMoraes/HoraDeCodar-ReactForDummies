import Button from "./evento/Button";

function Evento() {
  function meuEvento() {
    console.log(`Ativando primeiro evento!`);
  }

  function segundoEvento() {
      console.log('Ativando o segundo evento!');
  }

  return (
    <>
      <p>Clique para disparar um evento:</p>
      <Button event={meuEvento} text="Primeto evento" />
    </>
  );
}

export default Evento;
