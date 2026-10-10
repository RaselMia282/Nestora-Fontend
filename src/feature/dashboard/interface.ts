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