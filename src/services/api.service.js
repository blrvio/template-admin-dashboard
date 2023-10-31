import { auth } from './auth.service';

// const BASE_URL = 'http://api-dev.internal.blrv.io'; // Altere isso para o URL base da sua API.
const BASE_URL = 'http://localhost:3000'; // Altere isso para o URL base da sua API.

async function apiRequest(endpoint, method = 'GET', body = null) {
  try {
    if (auth.currentUser) {
      // Obter o token JWT do usuário.
      console.log('token:',await auth.currentUser.getIdToken(true));
      const token = await auth.currentUser.getIdToken(true);
      // const token = "ok google"
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const config = {
        method,
        headers,
      };

      if (body) {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Algo deu errado na requisição.');
      }

      return data;
    }
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    throw error;
  }
}

export default apiRequest;
