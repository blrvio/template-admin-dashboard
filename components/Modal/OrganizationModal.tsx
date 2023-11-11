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

export const OrganizationModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Select
        size={"sm"}
        label="Select an project"
        className="max-w-xs"
        onClick={onOpen}
      ></Select>
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
                    <Tab key="photos" title="Recent Projects">
                      <Card>
                        <CardBody>
                          <OrganizationsTable />
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="music" title="Orgs">
                      <Card>
                        <CardBody>
                          <OrganizationsTable />
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="videos" title="Projects">
                      <Card>
                        <CardBody>
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum.
                        </CardBody>
                      </Card>
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
