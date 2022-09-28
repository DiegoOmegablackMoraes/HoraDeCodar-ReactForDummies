import PropTypes from "prop-types";

function Item({ marca, ano_lancamento }) {
  return (
    <>
      <li>
        {marca} - {ano_lancamento}
      </li>
    </>
  );
}

//Validação de campos através do PropTypes
Item.propTypes = {
  marca: PropTypes.string.isRequired,
  ano_lancamento: PropTypes.number,
};

//Definição de valores padroes para as props
Item.defaultProps = {
  marca: "Faltou a marca",
  ano_lancamento: 1900,
};

export default Item;
