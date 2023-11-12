import apiRequest from "../services/api.service";

// Função para buscar projetos de uma organização
async function getProjects(orgId: string) {
  const endpoint = `/orgs/${orgId}/projects`;
  try {
    const projects = await apiRequest(endpoint);
    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw error;
  }
}

// Função para criar um novo projeto em uma organização
async function createProject(orgId: string, data:any) {
  const endpoint = `/orgs/${orgId}/projects`;
  try {
    const newProject = await apiRequest(endpoint, "POST", data);
    return newProject;
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    throw error;
  }
}

// Função para editar um projeto existente
async function editProject(orgId: string, projectId: string, data:any) {
  const endpoint = `/orgs/${orgId}/projects/${projectId}`;
  try {
    const updatedProject = await apiRequest(endpoint, "PATCH", data);
    return updatedProject;
  } catch (error) {
    console.error("Erro ao editar projeto:", error);
    throw error;
  }
}

// Função para deletar um projeto
async function deleteProject(orgId: string, projectId: string) {
  const endpoint = `/orgs/${orgId}/projects/${projectId}`;
  try {
    await apiRequest(endpoint, "DELETE");
    return { message: 'Projeto deletado com sucesso.' };
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    throw error;
  }
}

export { getProjects, createProject, editProject, deleteProject };
