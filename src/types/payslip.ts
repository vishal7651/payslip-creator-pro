export interface CompanyInfo {
  name: string;
  address: string;
  logo: string | null;
  logoBorderColor: string;
  cinNo: string;
  pan: string;
  tanNo: string;
}

export interface EmployeeInfo {
  name: string;
  associateId: string;
  designation: string;
  gender: string;
  dateOfJoining: string;
  location: string;
  pan: string;
  bankAccount: string;
  status: string;
}

export interface PayPeriod {
  month: string;
  year: string;
  financialYear: string;
  availableCalendarDays: number;
  paidDays: number;
  lossOfPayDays: number;
}

export interface LineItem {
  id: string;
  label: string;
  amount: number;
}

export interface PayslipData {
  company: CompanyInfo;
  employee: EmployeeInfo;
  payPeriod: PayPeriod;
  earnings: LineItem[];
  deductions: LineItem[];
}
