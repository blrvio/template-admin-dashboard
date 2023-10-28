import React from 'react';
import styles from './OrgProjectDropdown.module.css';
import { useMain } from 'src/context/main.context';

function ProjectDropdown() {
  // Extrai valores do contexto
  const { selectedProject, availableProjects, setSelectedProject } = useMain();
  
  const handleChange = (value) => {
    // Busca a organização correspondente no array availableProjects
    const orgSelected = availableProjects.find(org => org.id === value);

    // Passa o objeto completo para setSelectedProject
    setSelectedProject(orgSelected);
  };

  return (
    <div className={styles.dropdownContainer}>
      <select
        className={styles.dropdown}
        onChange={(e) => handleChange(e.target.value)}
        value={selectedProject?.id} // Usa o id da organização selecionada como valor
      >
        {/* Se nenhum item estiver disponível, a opção principal será "crie uma org" */}
        {availableProjects.map((item) => (
          <option key={item.id} value={item.id}>
            {`PRJ: ${item.name}`}
          </option>
        ))}

        {/* Adicione a opção "crie uma org" ao final da lista */}
        <option value="createOrg">crie uma org</option>
      </select>
    </div>
  );
}

export default ProjectDropdown;
