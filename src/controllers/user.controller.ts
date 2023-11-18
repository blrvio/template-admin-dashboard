import apiRequest from "../services/api.service";

async function getUsers(appuid: string) {
  const endpoint = `/users/${appuid}`; // Endpoint para buscar os usuários
  try {
    const users = await apiRequest(endpoint);
    return users; // Deve ser um array de acordo com a resposta da sua API
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error; // Propague o erro para ser tratado por quem chama a função
  }
}

async function createUser(data: any) {
  const endpoint = "/users"; // Endpoint para criar um usuário
  try {
    const newUser = await apiRequest(endpoint, "POST", data);
    return newUser; // Retornará o usuário criado de acordo com a resposta da sua API
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error; // Propague o erro para ser tratado por quem chama a função
  }
}

async function editUser(id: string, data: any) {
  const endpoint = `/users/${id}`; // Endpoint para editar um usuário com seu ID
  try {
    const updatedUser = await apiRequest(endpoint, "PATCH", data);
    return updatedUser; // Retornará o usuário atualizado de acordo com a resposta da sua API
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    throw error; // Propague o erro para ser tratado por quem chama a função
  }
}

async function deleteUser(id: string) {
  const endpoint = `/users/${id}`; // Endpoint para deletar um usuário com seu ID
  try {
    await apiRequest(endpoint, "DELETE");
    return { message: 'Usuário deletado com sucesso.' }; // Ou simplesmente pode não retornar nada
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error; // Propague o erro para ser tratado por quem chama a função
  }
}

export { getUsers, createUser, editUser, deleteUser };
