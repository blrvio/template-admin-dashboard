import React from 'react';
import styles from './OrgProjectDropdown.module.css';
import { useMain } from 'src/context/main.context';

function OrgDropdown() {
  // Extrai valores do contexto
  const { selectedOrg, availableOrgs, setSelectedOrg } = useMain();
  
  const handleChange = (value) => {
    // Busca a organização correspondente no array availableOrgs
    const orgSelected = availableOrgs.find(org => org.id === value);

    // Passa o objeto completo para setSelectedOrg
    setSelectedOrg(orgSelected);
  };

  return (
    <div className={styles.dropdownContainer}>
      <select
        className={styles.dropdown}
        onChange={(e) => handleChange(e.target.value)}
        value={selectedOrg?.id} // Usa o id da organização selecionada como valor
      >
        {/* Se nenhum item estiver disponível, a opção principal será "crie uma org" */}
        {availableOrgs.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}

        {/* Adicione a opção "crie uma org" ao final da lista */}
        <option value="createOrg">crie uma org</option>
      </select>
    </div>
  );
}

export default OrgDropdown;
