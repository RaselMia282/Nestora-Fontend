export type TenantOverview = {
  activeLease: {
    id: string;
    monthlyRent: number;
    startDate: string;
    endDate: string;
    isSigned: boolean;
  } | null;
  monthlyRent: number;
  totalPayments: number;
  completedPayments: number;
  pendingPayments: number;
};

export interface AdminOverviewData {
  totalUsers: number;
  totalProperties: number;
  totalListings: number;
  pendingApplications: number;
  activeLeases: number;
  completedPayments: number;
  pendingNidVerifications: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "OWNER" | "ADMIN";
  isVerified: boolean;
  createdAt: string;
}

export interface GetAdminUsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User[];
}

export interface NidVerification {
  id: string;
  userId: string;
  nidFront: string;
  nidBack: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface VerificationStatusPayload {
  id: string;
  status: "VERIFIED" | "REJECTED";
}




export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export interface Application {
  id: string;
  tenantId: string;
  propertyId?: string;
  roomId?: string;
  status: ApplicationStatus;
  message?: string;
  createdAt: string;
  updatedAt: string;
  tenant?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  property?: {
    id: string;
    title: string;
    location: string;
    rent: number;
  };
  room?: {
    id: string;
    roomNumber: string;
    rent: number;
  };
}

export interface UpdateApplicationStatusPayload {
  id: string;
  status: ApplicationStatus;
}



export interface Property {
  id: string;
  title: string;
  description?: string;
  location: string;
  rent: number;
  propertyImg?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: string;
    name: string;
    email: string;
  };
}