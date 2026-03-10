export interface CompanyInfo {
  name: string;
  address: string;
  logo: string | null;
  logoBorderColor: string;
}

export interface EmployeeInfo {
  name: string;
  associateId: string;
  designation: string;
  gender: string;
  dateOfJoining: string;
  pfAccount: string;
  uan: string;
  saPolicyNo: string;
  saLicId: string;
  location: string;
  pan: string;
  bankAccount: string;
  esiNumber: string;
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
