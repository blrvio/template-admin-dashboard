// src/contexts/OrganizationsContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  createOrganization,
  deleteOrganization,
  editOrganization,
  getOrganizations,
} from "../controllers/org.controller";
import { useAuth } from "./auth.context";
import {
  createProject as createProject_c,
  editProject as editProject_c,
  deleteProject as deleteProject_c,
} from "../controllers/projects.controller";

// Tipagem para o estado e funções disponíveis no contexto
interface OrganizationsContextType {
  organizations: any[]; // Substitua any pelo tipo correto da sua organização
  addOrganization: (data: any) => void;
  editOrg: (id: string, updatedData: any) => void;
  deleteOrg: (id: string) => void;
  currentSelectedOrganization: any;
  setCurrentSelectedOrganization: (data: any) => void;
  addProject: (orgId: string, projectData: any) => void;
  editProject: (orgId: string, projectId: string, projectData: any) => void;
  deleteProject: (orgId: string, projectId: string) => void;
}

// Criação do contexto com um valor default
const OrganizationsContext = createContext<OrganizationsContextType>({
  organizations: [],
  addOrganization: () => {},
  deleteOrg: () => {},
  editOrg: () => {},
  currentSelectedOrganization: [],
  setCurrentSelectedOrganization: () => {},
  addProject: () => {},
  editProject: () => {},
  deleteProject: () => {},
});

interface OrganizationsProviderProps {
  children: React.ReactNode;
}

export const OrganizationsProvider: React.FC<OrganizationsProviderProps>  = ({ children }) => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  // Selected items
  const [currentSelectedOrganization, setCurrentSelectedOrganization] =
    useState<any>([]);
  const [selectedProject, setSelectedProject] = useState<any>([]);

  const addOrganization = async (newData: any) => {
    // Substitua any pelo tipo correto do dado de sua organização
    try {
      const newOrg = await createOrganization(newData);
      setOrganizations((prevOrgs) => [...prevOrgs, newOrg]);
    } catch (error) {
      console.error("Erro ao criar organização:", error);
    }
  };

  const editOrg = async (id: string, updatedData: any) => {
    try {
      const updatedOrg = await editOrganization(id, updatedData);
      setOrganizations((prevOrgs) =>
        prevOrgs.map((org) => (org.id === id ? updatedOrg : org))
      );
    } catch (error) {
      console.error("Erro ao editar organização:", error);
    }
  };

  const deleteOrg = async (id: string) => {
    try {
      await deleteOrganization(id);
      setOrganizations((prevOrgs) => prevOrgs.filter((org) => org.id !== id));
    } catch (error) {
      console.error("Erro ao deletar organização:", error);
    }
  };

  // funções para projects:

  const addProject = async (orgId: string, projectData: any) => {
    try {
      const newProject = await createProject_c(orgId, projectData);
      // Atualizar estado dos projetos aqui
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  };

  const editProject = async (
    orgId: string,
    projectId: string,
    projectData: any
  ) => {
    try {
      const updatedProject = await editProject_c(orgId, projectId, projectData);
      // Atualizar estado dos projetos aqui
    } catch (error) {
      console.error("Erro ao editar projeto:", error);
    }
  };

  const deleteProject = async (orgId: string, projectId: string) => {
    try {
      await deleteProject_c(orgId, projectId);
      // Atualizar estado dos projetos aqui
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  };

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const orgsData = await getOrganizations();
        setOrganizations(orgsData);
      } catch (error) {
        console.error("Erro ao buscar os dados da API", error);
      }
    };
    fetchOrgs();
    console.log("organizations:", organizations);
    
    // setCurrentSelectedOrganization(organizations[0]);
  }, [user]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getOrganizations();
        setProjects(projectsData);
      } catch (error) {
        console.error("Erro ao buscar os dados da API", error);
      }
    };
    fetchProjects();

    // setCurrentSelectedOrganization(organizations[0]);
  }, [currentSelectedOrganization]);

  return (
    <OrganizationsContext.Provider
      value={{
        organizations,
        addOrganization,
        editOrg,
        deleteOrg,
        currentSelectedOrganization,
        setCurrentSelectedOrganization,
        addProject,
        editProject,
        deleteProject,
      }}
    >
      {children}
    </OrganizationsContext.Provider>
  );
};

// Hook personalizado para uso do contexto
export const useOrganizations = () => useContext(OrganizationsContext);
