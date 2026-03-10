import { useState } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { PayslipPreview } from "@/components/PayslipPreview";
import type { PayslipData } from "@/types/payslip";

const defaultData: PayslipData = {
  company: {
    name: "",
    address: "",
    logo: null,
    logoBorderColor: "#0047FF",
    cinNo: "",
    pan: "",
    tanNo: "",
  },
  employee: {
    name: "",
    associateId: "",
    designation: "",
    gender: "",
    dateOfJoining: "",
    location: "",
    pan: "",
    bankAccount: "",
    status: "Salary Credited",
  },
  payPeriod: {
    month: "January",
    year: "2025",
    financialYear: "2024-2025",
    availableCalendarDays: 31,
    paidDays: 31,
    lossOfPayDays: 0,
  },
  earnings: [
    { id: "1", label: "Basic", amount: 0 },
    { id: "2", label: "House Rent Allowance", amount: 0 },
    { id: "3", label: "Conveyance Allowance", amount: 0 },
    { id: "4", label: "Special Allowance", amount: 0 },
  ],
  deductions: [
    { id: "1", label: "Professional Tax", amount: 0 },
    { id: "2", label: "Provident Fund", amount: 0 },
    { id: "3", label: "TDS", amount: 0 },
  ],
};

const Index = () => {
  const [data, setData] = useState<PayslipData>(defaultData);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/3 min-w-[380px] border-r border-border overflow-y-auto control-panel bg-background">
        <ControlPanel data={data} onChange={setData} />
      </div>
      <div className="flex-1 flex items-start justify-center overflow-y-auto bg-secondary p-8">
        <PayslipPreview data={data} />
      </div>
    </div>
  );
};

export default Index;
