import React, { ChangeEvent, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Image,
} from "@nextui-org/react";
import { useOrganizations } from "@/src/contexts/organization.context";
import { EditIcon } from "../Icons/EditIcon";
import { EditOrgModalProps } from "@/src/interfaces/organization.interfaces";
import { uploadOrgThumbnail } from "@/src/services/storage.service";

interface EditProjectModalProps {
  project: {
    id: string;
    name: string;
    description: string;
    thumbnail_url: string;
    resource_data: {
      org_id: string;
    };
    // Adicione outras propriedades do projeto que você precisa aqui
  };
  onEdit: (orgId: string, projectId: string, projectData: any) => void; // Atualize com os tipos corretos
}

export const EditProjectModal = ({ project, onEdit }: EditProjectModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // uploadOrgThumbnail(project.id)

  // Adiciona estados para manter os valores dos campos de formulário
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(
    project.description
  );

  // Handlers para atualizar os estados conforme os campos são preenchidos
  const handleProjectNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setProjectName(e.target.value);
  const handleProjectDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setProjectDescription(e.target.value);

  // Handler para criar organização
  const handleEditProject = async () => {
    const projectData = {
      name: projectName,
      description: projectDescription,
      thumbnail_url: selectedImage,
    };
    try {
      // Aqui você substituiria por sua lógica de chamada de API para criar a organização
      onEdit(project.resource_data.org_id, project.id, projectData); // Fechar o modal após sucesso
      onOpenChange();
    } catch (error) {
      console.error("Erro ao editar a organização:", error);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState(project!.thumbnail_url);

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      // Aqui você pode adicionar a lógica para fazer o upload da imagem
      uploadOrgThumbnail(project.id, file).then((url) => {
        setSelectedImage(url);
      });
      
    }
  };

  return (
    <>
      <div onClick={onOpen}>
        <EditIcon />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent className="min-w-[300px] min-h-[650px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Project
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col items-center gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <Image
                    width={300}
                    alt="NextUI hero Image"
                    src={
                      selectedImage
                        ? selectedImage
                        : "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6"
                    }
                    onClick={handleImageClick}
                    style={{ cursor: "pointer" }} // Faz a imagem parecer clicável
                  />
                  <Input
                    isRequired
                    label="Project Name"
                    placeholder="Enter Project name, ex: My Project"
                    value={projectName}
                    onChange={handleProjectNameChange}
                    type="text"
                  />
                  <Input
                    label="Project Description"
                    placeholder="Describe Project"
                    value={projectDescription}
                    onChange={handleProjectDescriptionChange}
                    type="text"
                  />
                </form>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleEditProject}>
                    Edit Project
                  </Button>
                </ModalFooter>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
