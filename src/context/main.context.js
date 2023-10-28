// import React from 'react';

// export const MainContextProvider = MainContext.Provider;
// export const MainContextConsumer = MainContext.Consumer;
// export default MainContext;
// context/auth.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './auth.context';
import apiRequest from 'src/services/api.service';

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [availableOrgs, setAvailableOrgs] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    console.log('useEffect triggered. User:', user);

    const fetchOrgs = async () => {
      try {
        const orgsData = await apiRequest('/orgs');
        // 2. Atualize o estado orgProjectItems com os dados da API
        const items = orgsData.map((org) => ({
          name: org.name,
          id: org.id,
          description: org.description,
          thumbnail: org.thumbnail_url,
        }));
        setAvailableOrgs(items);

        setSelectedOrg(items[0]);
      } catch (error) {
        console.error('Erro ao buscar os dados da API', error);
      }
    };

    fetchOrgs();
  }, [user]);

   useEffect(() => {
    console.log('useEffect triggered. User:', user);

    const fetchProject = async () => {
      try {
        const projectsData = await apiRequest(
          `/orgs/${selectedOrg.id}/projects`,
        );
        // 2. Atualize o estado orgProjectItems com os dados da API

        console.log('Projects:', projectsData);

        setAvailableProjects(projectsData);

        setSelectedProject(projectsData[0]);
      } catch (error) {
        console.error('Erro ao buscar os dados da API', error);
      }
    };

    fetchProject();
  }, [selectedOrg]);

  return (
    <MainContext.Provider
      value={{
        selectedOrg,
        setSelectedOrg,
        selectedProject,
        setSelectedProject,
        availableOrgs,
        availableProjects,
        setAvailableOrgs,
        setAvailableProjects,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  return useContext(MainContext);
};
