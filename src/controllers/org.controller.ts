import apiRequest from "../services/api.service";

async function getOrganizations() {
  const endpoint = "/orgs"; // Endpoint para buscar as organizações
  try {
    const organizations = await apiRequest(endpoint);
    console.log(organizations[0]);
    
    return organizations; // Deve ser um array de acordo com a resposta da sua API
  } catch (error) {
    console.error("Erro ao buscar organizações:", error);
    throw error; // Propague o erro para ser tratado por quem chama a função
  }
}

async function createOrganization(data:any) {
  const endpoint = "/orgs"; // Endpoint para criar uma organização
  try {
    const newOrganization = await apiRequest(endpoint, "POST", data);
    return newOrganization; // Retornará a organização criada de acordo com a resposta da sua API
  } catch (error) {
    console.error("Erro ao criar organização:", error);
    throw error; // Propague o erro para ser tratado por quem chama a função
  }
}

async function editOrganization(id:string, data:any) {
  const endpoint = `/orgs/${id}`; // Endpoint para editar uma organização com seu ID
  try {
    const updatedOrganization = await apiRequest(endpoint, "PATCH", data);
    return updatedOrganization; // Retornará a organização atualizada de acordo com a resposta da sua API
  } catch (error) {
    console.error("Erro ao editar organização:", error);
    throw error; // Propague o erro para ser tratado por quem chama a função
  }
}

async function deleteOrganization(id:string) {
  const endpoint = `/orgs/${id}`; // Endpoint para deletar uma organização com seu ID
  try {
    await apiRequest(endpoint, "DELETE");
    return { message: 'Organização deletada com sucesso.' }; // Ou simplesmente pode não retornar nada
  } catch (error) {
    console.error("Erro ao deletar organização:", error);
    throw error; // Propague o erro para ser tratado por quem chama a função
  }
}

export { getOrganizations, createOrganization, editOrganization, deleteOrganization };
