import styles from "./Project.module.css"; // CSS
import { useParams } from "react-router-dom"; // biblioteca para obter parametros atraves da URL
import { useEffect, useState } from "react"; // biblioteca de state
import { v4 as uuidv4 } from "uuid"; // gerador de id dinamico

import ProjectForm from "../project/ProjectForm"; // Component: formulario de projeto
import ServiceForm from "../service/ServiceForm"; // Component: formulario de serviços
import Container from "../layout/Container"; // Component: container
import Message from "../layout/Message"; // Component: Flash-message
import ServiceCard from "../service/ServiceCard"; // Component: Card de serviços
import Loading from "../layout/Loading"; // gif de loading

function Project() {
  const { id } = useParams(); // recebe o id do projeto pela URL

  const [project, setProject] = useState([]); // state do projeto
  const [services, setServices] = useState([]); // state dos serviços
  const [showProjectForm, setShowProjectForm] = useState(false); // state de exibição do form de projeto
  const [showServiceForm, setShowServiceForm] = useState(false); // state de exibição do form de serviços
  const [message, setMessage] = useState(""); // state da flash-message
  const [type, setType] = useState(""); // state do tipo de mensagem

  useEffect(() => {
    // recupera o contrato pelo Id
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data); // atualiza o state com o projeto obtido
        setServices(data.services); // atualiza o state com os serviços do projeto
      })
      .catch((err) => console.log(err));
  }, [id]);

  function removeService(id, cost) {
    setMessage("");
    //remove do projeto, o serviço q tem o id informado no parametro e gera um novo array de serviços
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    //atualiza o projeto com a nova lista de serviços, q não tem mais o serviço excluído
    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;

    projectUpdated.cpst = parseFloat(projectUpdated.cost) - parseFloat(cost); // tira o custo do serviço removido do custo do projeto

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((data) => {
        setProject(projectUpdated); //atualiza state do projeto
        setServices(servicesUpdated); // atualiza state dos serviços
        setMessage("Serviço removido com sucesso!"); // atualiza a flash-message
        setType("success"); // atualiza o tipo da message
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function editPost(project) {
    setMessage("");
    // budget validation
    if (project.budget < project.cost) {
      //mensagem
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(!showProjectForm);
        //mensagem
        setMessage("Projeto atualizado com sucesso!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function createService(project) {
    setMessage("");
    //last service - obtem o último serviço adicionado
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4(); //atribui um id ao serviço
    const lastServiceCost = lastService.cost; // obtem o custo do serviço adicionado
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost); // Soma o custo total do projeto com o custo do serviço adicionado

    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento excedido! Verifique o valor do serviço.");
      setType("error");
      project.services.pop(); // retira o serviço do projeto
      return false;
    }

    //add service cost to project total cost
    project.cost = newCost;
    //update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // exibir os serviços
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento: </span>
                    R${project.budget}
                  </p>
                  <p>
                    <span>Total de Utilizado: </span>
                    R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            {
              //Área de serviços do projeto
            }
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço ao projeto:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}></div>
              {showServiceForm && (
                <ServiceForm
                  handleSubmit={createService}
                  btnText="Criar serviço"
                  projectData={project}
                />
              )}
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && (
                <p>Não há servições cadastrados para este projeto.</p>
              )}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
export default Project;
