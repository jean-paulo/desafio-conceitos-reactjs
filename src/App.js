import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  
  async function handleAddRepository(e) {
    e.preventDefault();

    const repositoryData = ({
      title,
      url,
      techs
    });

    const response = await api.post('repositories', repositoryData)
    const repository = response.data;

    setRepositories([...repositories, repository]);

  };

  async function handleRemoveRepository(id) {
     await api.delete(`repositories/${id}`);

     //filtra os repositórios e só deixa os que não tem o id que foi removido
     setRepositories(repositories.filter(
       repository => repository.id !== id
     )) 
  }

  return (
    <div>

      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>)}
      </ul>

      <div>
        <h1>Cadastrar novo projeto</h1>
        <input type="text" value={repositories.title} placeholder="Titulo do projeto" onChange={e => setTitle(e.target.value)}/>
        <input type="text" value={repositories.url} placeholder="URL" onChange={e => setUrl(e.target.value)}/>
        <input type="text" value={repositories.techs} placeholder="Tecnologias utilizadas" onChange={e => setTechs(e.target.value)}/>
      </div>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
