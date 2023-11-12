"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import { CreateOrgModal } from "./CreateOrgModal";
import { OrganizationsTable } from "../Table/OrganizationsTable";
import { useOrganizations } from "@/src/contexts/organization.context";
import { ProjectsTable } from "../Table/ProjectsTable";

export const OrganizationModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { currentSelectedProject, projects } = useOrganizations();
  
  return (
    <>
      <Select
        size={"sm"}
        label={currentSelectedProject?.name || "Select a project"}
        className="max-w-xs"
        onClick={onOpen}
      >

      </Select>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        size={"5xl"}
        onOpenChange={onOpenChange}
        className="min-w-[300px] min-h-[550px]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Projects
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs aria-label="Options">
                    <Tab key="music" title="Orgs">
                      <OrganizationsTable />
                    </Tab>
                    <Tab
                      key="videos"
                      title="Projects"
                      className="flex h-full w-full items-center justify-center"
                    >
                      {projects && projects.length > 0 ? (
                        <ProjectsTable />
                      ) : (
                        <div>
                          Nenhuma organização disponível. Crie uma nova
                          organização.
                        </div>
                      )}
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <CreateOrgModal />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
