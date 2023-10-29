import React from 'react';
import styles from './OrgProjectDropdown.module.css';
import { useMain } from 'src/context/main.context';

function ProjectDropdown() {
  // Extrai valores do contexto
  const { selectedProject, availableProjects, setSelectedProject } = useMain();
  
  const handleChange = (value) => {
    if (value === 'createProject') {
      // Aqui você pode redirecionar o usuário para a página de criação de projeto ou qualquer outra ação necessária
      console.log("Criar projeto");
      return;
    }

    // Busca o projeto correspondente no array availableProjects
    const projectSelected = availableProjects.find(project => project.id === value);

    // Passa o objeto completo para setSelectedProject
    setSelectedProject(projectSelected);
  };

  if (!availableProjects || availableProjects.length === 0) {
    return <button onClick={() => console.log("Criar projeto")}>Criar projeto</button>;
  }

  return (
    <div className={styles.dropdownContainer}>
      <select
        className={styles.dropdown}
        onChange={(e) => handleChange(e.target.value)}
        value={selectedProject?.id} // Usa o id do projeto selecionado como valor
      >
        {availableProjects.map((item) => (
          <option key={item.id} value={item.id}>
            {`PRJ: ${item.name}`}
          </option>
        ))}
        
        <option value="createProject">crie um projeto</option>
      </select>
    </div>
  );
}

export default ProjectDropdown;
