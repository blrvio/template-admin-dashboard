import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Input,
} from "@nextui-org/react";
import { DeleteIcon } from "../Icons/DeleteIcon";

interface DeleteResourceModalProps {
    context: any;  // Substitua `any` pelo tipo apropriado
    resource: any; // Substitua `any` pelo tipo apropriado
    deleteResource: any; // Substitua `any` pelo tipo apropriado
  }

export default function DeleteResourceModal({
  context,
  resource,
  deleteResource,
}: DeleteResourceModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [resourceFromForm, setResourceFromForm] = useState();

  function handleResourceNameDeletionSubmit(): void {
    if (resourceFromForm === resource.name) {
      // Confirmação de exclusão e chamada da função de contexto para excluir
      deleteResource();
    }
  }

  function handleResourceNameDeletionInput(event: { target: { value: any; }; }): void {
    const { value } = event.target;
    setResourceFromForm(value);
  }

  return (
    <>
      <div onClick={onOpen}>
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon />
        </span>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Excluir {context}
              </ModalHeader>
              <ModalBody>
                <p>
                  Isso excluirá permanentemente o recurso {context} &quot;
                  {resource.name}&quot; e todos os seus recursos.
                </p>
                <p>
                  Esteja certo de que é realmente o que você quer, pois essa
                  ação não pode ser desfeita.
                </p>
                <Divider className="my-4" />
                <p>
                  Digite <b>&quot;{resource.name}&quot;</b> para confirmar a
                  exclusão do recurso.
                </p>
                <Input
                  isRequired
                  isInvalid
                  color="danger"
                  variant="bordered"
                  type="text"
                  onChange={handleResourceNameDeletionInput}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={handleResourceNameDeletionSubmit}>
                  Excluir {context}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
