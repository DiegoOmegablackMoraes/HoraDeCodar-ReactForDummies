import React, { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";

import styles from "../project/ProjectForm.module.css";

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({});

  function submit(e) {
    e.preventDefault(); // impede a pagina de atualizar
    projectData.services.push(service); //Adiciona o serviço ao objeto
    handleSubmit(projectData); // submete o objeto
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value }); //Adiciona os dados do serviço ao objeto
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />

      <Input
        type="number"
        text="Custo do Serviço"
        name="cost"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />

      <Input
        type="text"
        text="Descrição do Serviço"
        name="description"
        placeholder="Descreva do serviço"
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
