import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "../Icons/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { EyeIcon } from "../Icons/EyeIcon";
import { useOrganizations } from "@/src/contexts/organization.context";
import { EditOrgModal } from "../Modal/EditOrgModal";

const organizationStatusColor = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export const OrganizationsTable = () => {
  const { organizations, deleteOrg, editOrg } = useOrganizations();

  const handleEdit = (id:string) => {
    // Lógica para abrir o modal de edição com os dados da organização
  };

  const handleDelete = (id:string) => {
    // Confirmação de exclusão e chamada da função de contexto para excluir
    deleteOrg(id);
  };

  const renderOrganizationCell = useCallback((organization: any, key: any) => {
    const value = organization[key];

    switch (key) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src:
                organization.thumbnail_url ||
                "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6",
            }}
            name={value}
          />
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{value}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {organization.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={"default"}
            size="sm"
            variant="flat"
          >
            {value}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Details">
              <EyeIcon />
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditOrgModal organization={organization} onEdit={editOrg} />
              </span>
            </Tooltip>
            <Tooltip content="Delete" color="danger">
              <div onClick={() => handleDelete(organization.id)}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </div>
            </Tooltip>
          </div>
        );
      default:
        return value;
    }
  }, []);

  const tableColumns = [
    { name: "PROJECT", key: "name" },
    { name: "Description", key: "description" },
    { name: "ACTIONS", key: "actions" },
  ];

  return (
    <Table
      aria-label="Example table with custom cells"
      className="min-w-[200px] min-h-[300px]"
    >
      <TableHeader>
        {tableColumns.map((column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {organizations.map((organization) => (
          <TableRow key={organization.id}>
            {tableColumns.map((column) => (
              <TableCell key={column.key}>
                {renderOrganizationCell(organization, column.key)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
