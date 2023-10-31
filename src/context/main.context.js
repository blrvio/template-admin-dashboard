import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './auth.context';
import apiRequest from 'src/services/api.service';

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [availableOrgs, setAvailableOrgs] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);

  const { user } = useAuth();

  const router = useRouter();
  const projectIdFromUrl = router.query.project;
  const orgIdFromUrl = router.query.org;

  useEffect(() => {
    if (projectIdFromUrl && availableProjects.length > 0) {
      const foundProject = availableProjects.find(
        (proj) => proj.id === projectIdFromUrl,
      );
      if (foundProject) {
        setSelectedProject(foundProject);
      }
    }
  }, [projectIdFromUrl, availableProjects]);

  useEffect(() => {
    if (orgIdFromUrl && availableOrgs.length > 0) {
      const foundOrg = availableOrgs.find((org) => org.id === orgIdFromUrl);
      if (foundOrg) {
        setSelectedOrg(foundOrg);
      }
    }
  }, [orgIdFromUrl, availableOrgs]);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const orgsData = await apiRequest('/orgs');
        const items = orgsData ? orgsData.map((org) => ({
          name: org.name,
          id: org.id,
          description: org.description,
          thumbnail: org.thumbnail_url,
        })) : [];
        
        setAvailableOrgs(items);

        const storedOrgId = localStorage.getItem('selectedOrgId');
        const orgToSet = items.find(org => org.id === storedOrgId) || items[0];
        setSelectedOrg(orgToSet);

      } catch (error) {
        console.error('Erro ao buscar os dados da API', error);
      }
    };
    fetchOrgs();
  }, [user]);

  useEffect(() => {
    if (!selectedOrg) return;
    const fetchProjects = async () => {
      try {
        const projectsData = await apiRequest(`/orgs/${selectedOrg.id}/projects`);
        setAvailableProjects(projectsData);

        const storedProjectId = localStorage.getItem('selectedProjectId');
        const projectToSet = projectsData.find(proj => proj.id === storedProjectId) || projectsData[0];
        setSelectedProject(projectToSet);

      } catch (error) {
        console.error('Erro ao buscar os dados da API', error);
      }
    };
    fetchProjects();
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedProject) {
      localStorage.setItem('selectedProjectId', selectedProject.id);
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, project: selectedProject.id },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedOrg) {
      localStorage.setItem('selectedOrgId', selectedOrg.id);
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, org: selectedOrg.id },
        },
        undefined,
        { shallow: true },
      );
    }
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

export default MainContext;
