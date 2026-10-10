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