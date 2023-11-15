import React, { useState } from "react";
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

export const CreateOrgModal = ({} ) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("login");

  const handleProjectUploadClick = () => {
    // Isto irá simular um clique no input de arquivo
    document.getElementById("fileInput-project")?.click();
  };

  // Esta função lida com o evento onChange do input de arquivo
// Esta função lida com o evento onChange do input de arquivo
const handleProjectFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    // Preparar um FormData com o arquivo para upload
    const formData = new FormData();
    formData.append("file", file);

    // Fazer a requisição para o endpoint de upload
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Arquivo enviado com sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro ao enviar o arquivo:", error);
    });
  }
};


  const handleOrganizationUploadClick = () => {
    // Isto irá simular um clique no input de arquivo
    document.getElementById("fileInput-organization")?.click();
  };

  const handleOrganizationFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]; // Pegue o primeiro arquivo
  
      const formData = new FormData();
      formData.append("file", file); // Adicione o arquivo ao objeto FormData
  
      // Substitua '/api/upload' pelo endpoint correto de upload da sua API
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      .then((response) => {
        if (!response.ok) {
          // Se a resposta não for ok, lance um novo erro com o status
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json(); // Converta a resposta em JSON
      })
      .then((data) => {
        console.log("Arquivo enviado com sucesso:", data);
        // Aqui você pode implementar qualquer lógica adicional após o sucesso do upload
      })
      .catch((error) => {
        console.error("Erro ao enviar o arquivo:", error);
        // Tratamento adicional de erros pode ser feito aqui
      });
    }
  };
  

  const { organizations, addOrganization, currentSelectedOrganization, addProject } = useOrganizations();

  // Adiciona estados para manter os valores dos campos de formulário
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationDescription, setOrganizationDescription] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState(
    currentSelectedOrganization.id
  );
  // Handlers para atualizar os estados conforme os campos são preenchidos
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value);
  const handleProjectDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProjectDescription(e.target.value);
  const handleOrganizationNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOrganizationName(e.target.value);
  const handleOrganizationDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOrganizationDescription(e.target.value);
  const handleOrganizationChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedOrganization(event.target.value);


  const handleCreateProject = async () => {
  console.log("Target Org:", selectedOrganization);
  
    const projectData = {
      name: projectName,
      description: projectDescription || "",
      thumbnail_url: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc",
      orgId: selectedOrganization,
    };
    try {
      // Aqui você substituiria por sua lógica de chamada de API para criar o projeto
      console.log('Enviando dados do projeto:', projectData);
      addProject(projectData.orgId, projectData);
      // Fechar o modal após sucesso
      onOpenChange();
    } catch (error) {
      console.error('Erro ao criar o projeto:', error);
    }
  };
  
  // Handler para criar organização
  const handleCreateOrganization = async () => {
    const organizationData = {
      name: organizationName,
      description: organizationDescription,
    };
    try {
      // Aqui você substituiria por sua lógica de chamada de API para criar a organização
      console.log('Enviando dados da organização:', organizationData);
      addOrganization(organizationData);
      // Fechar o modal após sucesso
      onOpenChange();
    } catch (error) {
      console.error('Erro ao criar a organização:', error);
    }
  };


  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent className="min-w-[300px] min-h-[650px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create</ModalHeader>
              <ModalBody>
                <Tabs
                  fullWidth
                  size="md"
                  aria-label="Tabs form"
                  selectedKey={selected}
                  onSelectionChange={(key) => setSelected(String(key))}
                >
                  <Tab key="project" title="Project">
                    <form className="flex flex-col items-center gap-4">
                      <input
                        type="file"
                        id="fileInput-project"
                        style={{ display: "none" }}
                        onChange={handleProjectFileChange}
                      />
                      <Image
                        onClick={handleProjectUploadClick}
                        width={300}
                        alt="NextUI hero Image"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                      />
                      <Input
                        isRequired
                        label="Project Name"
                        placeholder="Enter project name, ex: My Project"
                        value={projectName}
                        onChange={handleProjectNameChange}
                        type="text"
                      />
                      <Input
                        label="Project Description"
                        placeholder="Describe project"
                        value={projectDescription}
                        onChange={handleProjectDescriptionChange}
                        type="text"
                      />
                      <Select
                        isRequired
                        label="Organization"
                        placeholder="Select an organization"
                        // defaultSelectedKeys={[selectedOrganization?.id]}
                        // value={selectedOrganization}
                        onChange={handleOrganizationChange}
                        // className="max-w-xs"
                        defaultSelectedKeys={[selectedOrganization]}
                      >
                        {organizations.map((org) => (
                          <SelectItem key={org.id} value={org.id}>
                            {org.name}
                          </SelectItem>
                        ))}
                      </Select>
                    </form>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={handleCreateProject}>
                        Create Project
                      </Button>
                    </ModalFooter>
                  </Tab>

                  <Tab key="organization" title="Organization">
                    <form className="flex flex-col items-center gap-4">
                      <input
                        type="file"
                        id="fileInput-organization"
                        style={{ display: "none" }}
                        onChange={handleOrganizationFileChange}
                      />
                      <Image
                        onClick={handleOrganizationUploadClick}
                        width={300}
                        alt="NextUI hero Image"
                        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                      />
                      <Input
                        isRequired
                        label="Organization Name"
                        placeholder="Enter Organization name, ex: My Organization"
                        value={organizationName}
                        onChange={handleOrganizationNameChange}
                        type="text"
                      />
                      <Input
                        label="Organization Description"
                        placeholder="Describe Organization"
                        value={organizationDescription}
                        onChange={handleOrganizationDescriptionChange}
                        type="text"
                      />
                    </form>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={handleCreateOrganization}>
                        Create Organization
                      </Button>
                    </ModalFooter>
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
