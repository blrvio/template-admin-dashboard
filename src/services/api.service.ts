import { auth } from "./auth.service";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Use a variável de ambiente para o URL base

interface Config {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body?: string; // A propriedade body é opcional e do tipo string
}

async function apiRequest(endpoint: string, method: string = "GET", body: any = null) {
  try {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken(true);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const config: Config = { // Defina o objeto com o tipo Config
        method,
        headers,
      };

      if (body) {
        config.body = JSON.stringify(body); // O TypeScript agora entende que body é uma string
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Algo deu errado na requisição.");
      }

      return data;
    }
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
    throw error;
  }
}

export default apiRequest;
