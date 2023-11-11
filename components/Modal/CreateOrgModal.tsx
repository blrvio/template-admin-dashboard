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

export const CreateOrgModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState("login");

  const handleProjectUploadClick = () => {
    // Isto irá simular um clique no input de arquivo
    document.getElementById("fileInput-project")?.click();
  };

  // Esta função lida com o evento onChange do input de arquivo
  const handleProjectFileChange = (event) => {
    const file = event.target.files[0]; // Pegar o arquivo
    if (!file) return;

    // Aqui você pode implementar a lógica de upload do arquivo
    // Por exemplo, utilizando a API `fetch` para enviar o arquivo para o servidor
    const formData = new FormData();
    formData.append("file", file);

    fetch("/api/upload", {
      // Substitua '/api/upload' pelo endpoint correto
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
  };

  const handleOrganizationUploadClick = () => {
    // Isto irá simular um clique no input de arquivo
    document.getElementById("fileInput-organization")?.click();
  };

  // Esta função lida com o evento onChange do input de arquivo
  const handleOrganizationFileChange = (event) => {
    const file = event.target.files[0]; // Pegar o arquivo
    if (!file) return;

    // Aqui você pode implementar a lógica de upload do arquivo
    // Por exemplo, utilizando a API `fetch` para enviar o arquivo para o servidor
    const formData = new FormData();
    formData.append("file", file);

    fetch("/api/upload", {
      // Substitua '/api/upload' pelo endpoint correto
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
  };

  const { organizations, addOrganization, currentSelectedOrganization } = useOrganizations();

  // Adiciona estados para manter os valores dos campos de formulário
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationDescription, setOrganizationDescription] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState(
    currentSelectedOrganization.name
  );

  // Handlers para atualizar os estados conforme os campos são preenchidos
  const handleProjectNameChange = (e) => setProjectName(e.target.value);
  const handleProjectDescriptionChange = (e) =>
    setProjectDescription(e.target.value);
  const handleOrganizationNameChange = (e) =>
    setOrganizationName(e.target.value);
  const handleOrganizationDescriptionChange = (e) =>
    setOrganizationDescription(e.target.value);
  const handleOrganizationChange = (value) => setSelectedOrganization(value);


  const handleCreateProject = async () => {
    const projectData = {
      name: projectName,
      description: projectDescription,
      organization: selectedOrganization,
      orgId: organizations.find((org) => org.name === selectedOrganization).id,
    };
    try {
      // Aqui você substituiria por sua lógica de chamada de API para criar o projeto
      console.log('Enviando dados do projeto:', projectData);
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
        Open Modal
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
                  onSelectionChange={setSelected}
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
                        defaultSelectedKeys={[organizations[0].id]}
                        value={selectedOrganization}
                        onChange={handleOrganizationChange}
                        // className="max-w-xs"
                      >
                        {organizations.map((org) => (
                          <SelectItem key={org.id} value={org.name}>
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
