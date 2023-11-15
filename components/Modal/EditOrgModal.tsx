import React, { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";
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

export const EditOrgModal = ({ organization, onEdit }: EditOrgModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // uploadOrgThumbnail(organization.id)

  // Adiciona estados para manter os valores dos campos de formulário
  const [organizationName, setOrganizationName] = useState(organization.name);
  const [organizationDescription, setOrganizationDescription] = useState(
    organization.description
  );

  // Handlers para atualizar os estados conforme os campos são preenchidos
  const handleOrganizationNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setOrganizationName(e.target.value);
  const handleOrganizationDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setOrganizationDescription(e.target.value);

  // Handler para criar organização
  const handleEditOrganization = async () => {
    const organizationData = {
      name: organizationName,
      description: organizationDescription,
      thumbnail_url: selectedImage,
    };
    try {
      // Aqui você substituiria por sua lógica de chamada de API para criar a organização
      onEdit(organization.id, organizationData); // Fechar o modal após sucesso
      onOpenChange();
    } catch (error) {
      console.error("Erro ao editar a organização:", error);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState(organization!.thumbnail_url);

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Verifique se algum arquivo foi selecionado
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // Aqui você pode adicionar a lógica para fazer o upload da imagem
      uploadOrgThumbnail(organization.id, file).then((url) => {
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
                Edit Organization
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
