
import { format } from "date-fns";

export interface UtilityBilling {
  id: number;
  name: string;
  energyProduced: number; // MWh
  goIssued: number; // Each GO is 1 MWh
  allocatedGOs: number;
  unallocatedGOs: number;
  invoiceDate: string;
  dueDate: string;
  paymentStatus: "paid" | "pending" | "overdue";
  goFeeAmount?: number;
  registrationFeeAmount?: number;
  totalAmount?: number;
}

export const getUtilityBillings = (firstDayOfMonth: Date): UtilityBilling[] => {
  return [
    {
      id: 1,
      name: "GreenPower Utilities",
      energyProduced: 25000, // MWh
      goIssued: 25000, // Each GO is 1 MWh
      allocatedGOs: 23000,
      unallocatedGOs: 2000,
      invoiceDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      dueDate: format(new Date(firstDayOfMonth.getTime() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
      paymentStatus: "paid"
    },
    {
      id: 2,
      name: "Nordic Energy Trading",
      energyProduced: 18000, // MWh
      goIssued: 18000, 
      allocatedGOs: 15000,
      unallocatedGOs: 3000,
      invoiceDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      dueDate: format(new Date(firstDayOfMonth.getTime() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
      paymentStatus: "pending"
    },
    {
      id: 3,
      name: "EcoEnergy Partners",
      energyProduced: 32000, // MWh
      goIssued: 32000,
      allocatedGOs: 29500,
      unallocatedGOs: 2500,
      invoiceDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      dueDate: format(new Date(firstDayOfMonth.getTime() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
      paymentStatus: "overdue"
    },
    {
      id: 4,
      name: "CleanGrid Solutions",
      energyProduced: 12500, // MWh
      goIssued: 12500,
      allocatedGOs: 12500,
      unallocatedGOs: 0,
      invoiceDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      dueDate: format(new Date(firstDayOfMonth.getTime() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
      paymentStatus: "paid"
    },
    {
      id: 5,
      name: "SustainPower Network",
      energyProduced: 9800, // MWh
      goIssued: 9800,
      allocatedGOs: 8200,
      unallocatedGOs: 1600,
      invoiceDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      dueDate: format(new Date(firstDayOfMonth.getTime() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
      paymentStatus: "pending"
    }
  ];
};

export const calculateBillingAmounts = (
  utilities: UtilityBilling[],
  ratePerGO: number,
  registrationFeePerGO: number
): UtilityBilling[] => {
  return utilities.map(utility => {
    // Calculate fee amount (GO fee + registration fee)
    const goFeeAmount = utility.goIssued * ratePerGO;
    const registrationFeeAmount = utility.goIssued * registrationFeePerGO;
    const totalAmount = goFeeAmount + registrationFeeAmount;
    
    return {
      ...utility,
      goFeeAmount,
      registrationFeeAmount,
      totalAmount
    };
  });
};
