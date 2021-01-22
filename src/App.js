import React, { useState, useEffect }  from 'react'
import api from './services/api'

import "./styles.css";

function App() {
  const [repos,setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    });
}, [])

  async function handleAddRepository() {

    const response = await api.post('repositories',{
      title: `Novo repo  ${Date.now()}`,
      url: 'www.github.com',
      techs: ['Node','React','React-Native']
    });

    const repo = response.data;
    setRepos([...repos,repo]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    setRepos(repos.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        { repos.map(repo => <li key={repo.id} > {repo.title}  <button onClick={() => handleRemoveRepository(repo.id)} >Remover</button> </li> )}
      </ul>    
    </div>
  );
}

export default App;
