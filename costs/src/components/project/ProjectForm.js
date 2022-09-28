import React, { useEffect, useState } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

import styles from "./ProjectForm.module.css";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  //Hook para guardar state da database que será carregada.
  const [categories, setCategories] = useState([]);
  //Hook para guardar state do projeto incluído
  const [project, setProject] = useState(projectData || {});

  //useEffect impede que a requisição fique sendo acionada infinitamente
  useEffect(() => {
    //Request via GET para obter as categorias do db.json
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json()) // converte o response em json
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err)); // logar o erro no console se um abend acontecer
  }, []);

  //Salva o projeto no submit do formulário
  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  //identifica qqer alteração em um input e atualiza o objeto Project
  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  //identifica qqer alteração em um select e atualiza o objeto Project
  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  //Retorna o jsx para montagem da página
  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name}
      />

      <Input
        type="number"
        text="Orçamento do Projeto(R$)"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget}
      />

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ""}
      />

      <SubmitButton text={btnText} />
    </form>
  );
}
export default ProjectForm;
