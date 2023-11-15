import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "./firebase.service";
const storage = getStorage(firebase_app);

async function uploadOrgThumbnail(orgId: string, file: any) {
  try {
    // Gerar um timestamp
    const timestamp = new Date().toISOString().replace(/:/g, "-");

    // Alterar o nome do arquivo para incluir o timestamp
    const fileName = `thumbnail-${timestamp}.jpg`;

    // Referência do Storage com o novo nome de arquivo
    const storageRef = ref(
      storage,
      `prd/saas-comercecloud/thumbnails/organizations/${orgId}/${fileName}`
    );

    await uploadBytes(storageRef, file, {
      contentType: "image/jpeg",
    }).then((snapshot) => {
    });

    return await getDownloadURL(storageRef);
  } catch (error) {
    throw error;
  }
}

async function uploadProjectThumbnail(orgId: string, projectId: string, file: any) {
    try {
      // Gerar um timestamp
      const timestamp = new Date().toISOString().replace(/:/g, "-");
  
      // Alterar o nome do arquivo para incluir o timestamp
      const fileName = `thumbnail-${timestamp}.jpg`;
  
      // Referência do Storage com o novo nome de arquivo
      const storageRef = ref(
        storage,
        `prd/saas-comercecloud/thumbnails/organizations/${orgId}/projects/${projectId}/${fileName}`
      );
  
      await uploadBytes(storageRef, file, {
        contentType: "image/jpeg",
      });
  
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Erro no upload do arquivo:", error);
      throw error;
    }
  }

export { uploadOrgThumbnail, uploadProjectThumbnail };
