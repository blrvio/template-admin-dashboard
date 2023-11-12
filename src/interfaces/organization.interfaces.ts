// Defina o tipo para a organização
export interface Organization {
    name: string;
    description: string;
    thumbnail_url: string;
    kind: string;
    metadata: {
      created_at: string;
      last_modified: string;
    };
    id: string;
    resource_data: {
      iam: {
        owner_user: string;
        read_users: string[];
        write_users: string[];
      };
      projects: any[]; // Substitua any pelo tipo correto dos projetos, se disponível
    };
  }
  
export  interface EditOrgModalProps {
    organization: Organization;
    onEdit: (updatedOrg: string, organizationData: {name: string, description: string}) => void;
  }