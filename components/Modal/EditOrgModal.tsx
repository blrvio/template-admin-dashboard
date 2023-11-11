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
import { EditIcon } from "../Icons/EditIcon";

export const EditOrgModal = ({ organization, onEdit }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { editOrg } = useOrganizations();

  // Adiciona estados para manter os valores dos campos de formulário
  const [organizationName, setOrganizationName] = useState(organization.name);
  const [organizationDescription, setOrganizationDescription] = useState(
    organization.description
  );

  // Handlers para atualizar os estados conforme os campos são preenchidos
  const handleOrganizationNameChange = (e) =>
    setOrganizationName(e.target.value);
  const handleOrganizationDescriptionChange = (e) =>
    setOrganizationDescription(e.target.value);

  // Handler para criar organização
  const handleEditOrganization = async () => {
    const organizationData = {
      name: organizationName,
      description: organizationDescription,
    };
    try {
      // Aqui você substituiria por sua lógica de chamada de API para criar a organização
      console.log("Enviando dados da organização:", organizationData);
      onEdit(organization.id, organizationData); // Fechar o modal após sucesso
      onOpenChange();
    } catch (error) {
      console.error("Erro ao editar a organização:", error);
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
                Edit Organization
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col items-center gap-4">
                  <input
                    type="file"
                    id="fileInput-organization"
                    style={{ display: "none" }}
                  />
                  <Image
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
                  <Button color="primary" onPress={handleEditOrganization}>
                    Edit Organization
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
