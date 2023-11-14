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
  Pagination,
  Selection,
} from "@nextui-org/react";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { EyeIcon } from "../Icons/EyeIcon";
import { EditOrgModal } from "../Modal/EditOrgModal";
import { useOrganizations } from "@/src/contexts/organization.context";

const organizationStatusColor = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export const ProjectsTable = () => {
  const { projects, deleteOrg, editOrg, deleteProject, setCurrentSelectedProject, currentSelectedProject} = useOrganizations();

  const handleDelete = (organizationId: string, projectId: string) => {
    // Confirmação de exclusão e chamada da função de contexto para excluir
    deleteProject(organizationId, projectId);
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
              <div
                onClick={() =>
                  handleDelete(
                    organization.resource_data.org_id,
                    organization.id
                  )
                }
              >
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

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(projects.length / rowsPerPage);

  const projectItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return projects.slice(start, end);
  }, [page, projects]);

  const onProjectSelected = (keys: Selection) => {
    if (keys === "all") {
      // Trate o caso em que todas as linhas estão selecionadas
      console.log("Todas as linhas selecionadas");
    } else if (keys instanceof Set) {
      // Trate o caso em que um conjunto específico de chaves está selecionado
      // Como a seleção é 'single', você pode querer acessar o primeiro elemento do Set
      const selectedKey = keys.values().next().value;
      console.log(selectedKey);
      setCurrentSelectedProject(
        projects.find((prj) => prj.id === selectedKey)
      );
    }
  };

  return (
    <Table
      aria-label="Example table with custom cells"
      className="min-w-[200px] min-h-[300px]"
      selectionMode="single"
      defaultSelectedKeys={[currentSelectedProject?.id]}
      onSelectionChange={onProjectSelected}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
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
        {projectItems.map((organization) => (
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
