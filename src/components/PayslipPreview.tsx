import type { PayslipData } from "@/types/payslip";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  data: PayslipData;
}

export function PayslipPreview({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const totalEarnings = data.earnings.reduce((s, e) => s + e.amount, 0);
  const totalDeductions = data.deductions.reduce((s, d) => s + d.amount, 0);
  const netSalary = totalEarnings - totalDeductions;

  const isValid = data.company.name && data.employee.name && totalEarnings > 0;

  const maxRows = Math.max(data.earnings.length, data.deductions.length, 5);

  const handleGenerate = async () => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current, {
      scale: 4,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 5;
    const contentW = pageW - margin * 2;
    const imgH = (canvas.height * contentW) / canvas.width;

    if (imgH <= pageH - margin * 2) {
      pdf.addImage(imgData, "PNG", margin, margin, contentW, imgH);
    } else {
      const scale = (pageH - margin * 2) / imgH;
      const fitW = contentW * scale;
      const fitH = imgH * scale;
      const offsetX = (pageW - fitW) / 2;
      pdf.addImage(imgData, "PNG", offsetX, margin, fitW, fitH);
    }

    pdf.save(`Payslip_${data.employee.name || "Employee"}_${data.payPeriod.month}_${data.payPeriod.year}.pdf`);
  };

  const border = "border border-[#000]";
  const cellPad = "py-1 px-2";
  const labelCell = `${cellPad} ${border} font-bold w-[18%] text-[11px]`;
  const valueCell = `${cellPad} ${border} text-[11px]`;

  return (
    <div className="space-y-4 w-full max-w-[800px]">
      <div className="flex justify-end">
        <button
          onClick={handleGenerate}
          disabled={!isValid}
          className={`px-6 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors ${
            isValid
              ? "bg-success text-success-foreground hover:opacity-90"
              : "bg-disabled text-card cursor-not-allowed"
          }`}
        >
          Generate PDF
        </button>
      </div>

      <div
        ref={ref}
        className="bg-white shadow-sm"
        style={{ fontFamily: "'Arial', 'Helvetica', sans-serif", color: "#000" }}
      >
        <div className="p-10" style={{ borderTop: `4px solid ${data.company.logoBorderColor}` }}>
          {/* Header */}
          <div className="flex items-start gap-4 mb-1">
            {data.company.logo && (
              <img src={data.company.logo} alt="Logo" className="w-16 h-16 object-contain flex-shrink-0" />
            )}
            <div className="flex-1 text-right">
              <div className="font-bold text-base">{data.company.name || "Company Name"}</div>
              <div className="text-[11px]">Payslip for the month of {data.payPeriod.month} {data.payPeriod.year}</div>
              <div className="text-[11px]">Financial Period {data.payPeriod.financialYear}</div>
            </div>
          </div>

          <div className="text-right text-[10px] italic mb-3" style={{ color: "#666" }}>Private & Confidential</div>

          {/* Associate Information */}
          <table className="w-full border-collapse mb-5" style={{ borderColor: "#000" }}>
            <thead>
              <tr>
                <th colSpan={4} className={`${border} text-center text-[12px] font-bold py-1.5`} style={{ backgroundColor: "#f0f0f0" }}>
                  Associate Information
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2} className={`${labelCell}`}>Employee Name</td>
                <td colSpan={2} className={`${valueCell} font-bold`}>{data.employee.name || "—"}</td>
              </tr>
              <tr>
                <td className={labelCell}>Associate Id</td>
                <td className={valueCell}>{data.employee.associateId || "—"}</td>
                <td className={labelCell}>Location</td>
                <td className={valueCell}>{data.employee.location || "—"}</td>
              </tr>
              <tr>
                <td className={labelCell}>Designation</td>
                <td className={valueCell}>{data.employee.designation || "—"}</td>
                <td className={labelCell}>PAN</td>
                <td className={valueCell}>{data.employee.pan || "—"}</td>
              </tr>
              <tr>
                <td className={labelCell}>Gender</td>
                <td className={valueCell}>{data.employee.gender || "—"}</td>
                <td className={labelCell}>Bank A/C</td>
                <td className={valueCell}>{data.employee.bankAccount || "—"}</td>
              </tr>
              <tr>
                <td className={labelCell}>Date Of Joining</td>
                <td className={valueCell}>{data.employee.dateOfJoining || "—"}</td>
                <td className={labelCell}>Status</td>
                <td className={valueCell}>{data.employee.status || "—"}</td>
              </tr>
              <tr>
                <td className={labelCell}>CIN No</td>
                <td className={valueCell}>{data.company.cinNo || "—"}</td>
                <td className={labelCell}>Available Calendar Days</td>
                <td className={valueCell}>{data.payPeriod.availableCalendarDays}</td>
              </tr>
              <tr>
                <td className={labelCell}>PAN</td>
                <td className={valueCell}>{data.company.pan || "—"}</td>
                <td className={labelCell}>Paid Days</td>
                <td className={valueCell}>{data.payPeriod.paidDays}</td>
              </tr>
              <tr>
                <td className={labelCell}>TAN No</td>
                <td className={valueCell}>{data.company.tanNo || "—"}</td>
                <td className={labelCell}>Loss of Pay Days</td>
                <td className={valueCell}>{data.payPeriod.lossOfPayDays}</td>
              </tr>
            </tbody>
          </table>

          {/* Earnings & Deductions */}
          <table className="w-full border-collapse mb-5" style={{ borderColor: "#000" }}>
            <thead>
              <tr>
                <th className={`${border} text-left text-[11px] font-bold py-1.5 px-2 w-[35%]`} style={{ backgroundColor: "#f0f0f0" }}>Earnings</th>
                <th className={`${border} text-right text-[11px] font-bold py-1.5 px-2 w-[15%]`} style={{ backgroundColor: "#f0f0f0" }}>Amount</th>
                <th className={`${border} text-left text-[11px] font-bold py-1.5 px-2 w-[35%]`} style={{ backgroundColor: "#f0f0f0" }}>Deductions</th>
                <th className={`${border} text-right text-[11px] font-bold py-1.5 px-2 w-[15%]`} style={{ backgroundColor: "#f0f0f0" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxRows }).map((_, i) => (
                <tr key={i}>
                  <td className={`${cellPad} ${border} text-[11px]`}>{data.earnings[i]?.label || ""}</td>
                  <td className={`${cellPad} ${border} text-[11px] text-right`}>{data.earnings[i]?.amount ? data.earnings[i].amount.toLocaleString("en-IN") : ""}</td>
                  <td className={`${cellPad} ${border} text-[11px]`}>{data.deductions[i]?.label || ""}</td>
                  <td className={`${cellPad} ${border} text-[11px] text-right`}>{data.deductions[i]?.amount ? data.deductions[i].amount.toLocaleString("en-IN") : ""}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className={`${cellPad} ${border} text-[11px]`}>(A) Total Earnings</td>
                <td className={`${cellPad} ${border} text-[11px] text-right`}>{totalEarnings.toLocaleString("en-IN")}</td>
                <td className={`${cellPad} ${border} text-[11px]`}>(B) Total Deduction</td>
                <td className={`${cellPad} ${border} text-[11px] text-right`}>{totalDeductions.toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
          </table>

          {/* Net Salary */}
          <table className="w-full border-collapse mb-8" style={{ borderColor: "#000" }}>
            <tbody>
              <tr className="font-bold text-[12px]">
                <td className={`py-2 px-2 ${border} text-center w-[70%]`}>Net Salary = (A) - (B)</td>
                <td className={`py-2 px-2 ${border} text-right w-[30%]`}>{netSalary.toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
          </table>

          {/* System generated note */}
          <div className="text-center text-[11px] italic mb-6" style={{ color: "#555" }}>
            This is a system generated payslip. No signature required.
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#ccc] text-center text-[10px]" style={{ color: "#666" }}>
            <div>Registered Office: {data.company.name || "Company Name"}</div>
            <div>{data.company.address || "Company Address"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
