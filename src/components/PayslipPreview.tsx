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

    // Fix logo size: constrain it during capture
    const logoEl = ref.current.querySelector("img") as HTMLImageElement | null;
    const origWidth = logoEl?.style.width;
    const origHeight = logoEl?.style.height;
    if (logoEl) {
      logoEl.style.width = `${logoEl.offsetWidth}px`;
      logoEl.style.height = `${logoEl.offsetHeight}px`;
    }

    const canvas = await html2canvas(ref.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    // Restore logo styles
    if (logoEl) {
      logoEl.style.width = origWidth || "";
      logoEl.style.height = origHeight || "";
    }

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentW = pageW - margin * 2;
    const imgH = (canvas.height * contentW) / canvas.width;

    if (imgH <= pageH - margin * 2) {
      // Fits on one page
      pdf.addImage(imgData, "PNG", margin, margin, contentW, imgH);
    } else {
      // Scale down to fit one page
      const scale = (pageH - margin * 2) / imgH;
      const fitW = contentW * scale;
      const fitH = imgH * scale;
      const offsetX = (pageW - fitW) / 2;
      pdf.addImage(imgData, "PNG", offsetX, margin, fitW, fitH);
    }

    pdf.save(`Payslip_${data.employee.name || "Employee"}_${data.payPeriod.month}_${data.payPeriod.year}.pdf`);
  };

  return (
    <div className="space-y-4 w-full max-w-[800px]">
      {/* Generate button */}
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

      {/* Payslip document */}
      <div
        ref={ref}
        className="payslip-document bg-card shadow-sm"
        style={{ borderTop: `3px solid ${data.company.logoBorderColor}` }}
      >
        <div className="p-8 text-[11px] leading-relaxed">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            {data.company.logo && (
              <img src={data.company.logo} alt="Logo" className="h-10 object-contain" />
            )}
            <div className="text-right flex-1">
              <div className="font-semibold text-sm">{data.company.name || "Company Name"}</div>
              <div className="text-[10px]">Payslip for the month of {data.payPeriod.month} {data.payPeriod.year}</div>
              <div className="text-[10px]">Financial Period {data.payPeriod.financialYear}</div>
            </div>
          </div>

          <div className="text-right text-[9px] text-muted-foreground italic mb-2">Private & Confidential</div>

          {/* Associate Information */}
          <table className="w-full border-collapse border border-foreground/20 mb-4">
            <thead>
              <tr>
                <th colSpan={6} className="bg-foreground/5 text-center text-[11px] font-semibold py-1 border border-foreground/20">
                  Associate Information
                </th>
              </tr>
            </thead>
            <tbody className="text-[10px]">
              <InfoRow left={["Employee Name", data.employee.name || "—"]} mid={["Location", data.employee.location || "—"]} right={[]} span />
              <InfoRow left={["Associate Id", data.employee.associateId || "—"]} mid={["PAN", data.employee.pan || "—"]} right={[]} />
              <InfoRow left={["Designation", data.employee.designation || "—"]} mid={["Bank A/C", data.employee.bankAccount || "—"]} right={[]} />
              <InfoRow left={["Gender", data.employee.gender || "—"]} mid={["ESI Number", data.employee.esiNumber || "—"]} right={[]} />
              <InfoRow left={["Date Of Joining", data.employee.dateOfJoining || "—"]} mid={["Status", data.employee.status || "—"]} right={[]} />
              <InfoRow left={["PF A/C", data.employee.pfAccount || "—"]} mid={["Available Calendar Days", String(data.payPeriod.availableCalendarDays)]} right={[]} />
              <InfoRow left={["UAN", data.employee.uan || "—"]} mid={["Paid Days", String(data.payPeriod.paidDays)]} right={[]} />
              <InfoRow left={["SA Policy No", data.employee.saPolicyNo || "—"]} mid={["Loss of Pay Days", String(data.payPeriod.lossOfPayDays)]} right={[]} />
              <InfoRow left={["SA LIC ID", data.employee.saLicId || "—"]} mid={["", ""]} right={[]} />
            </tbody>
          </table>

          {/* Earnings & Deductions */}
          <table className="w-full border-collapse border border-foreground/20 mb-4">
            <thead>
              <tr>
                <th className="bg-foreground/5 text-left text-[10px] font-semibold py-1 px-2 border border-foreground/20 w-[35%]">Earnings</th>
                <th className="bg-foreground/5 text-right text-[10px] font-semibold py-1 px-2 border border-foreground/20 w-[15%]">Amount</th>
                <th className="bg-foreground/5 text-left text-[10px] font-semibold py-1 px-2 border border-foreground/20 w-[35%]">Deductions</th>
                <th className="bg-foreground/5 text-right text-[10px] font-semibold py-1 px-2 border border-foreground/20 w-[15%]">Amount</th>
              </tr>
            </thead>
            <tbody className="text-[10px]">
              {Array.from({ length: maxRows }).map((_, i) => (
                <tr key={i}>
                  <td className="py-0.5 px-2 border border-foreground/20">{data.earnings[i]?.label || ""}</td>
                  <td className="py-0.5 px-2 border border-foreground/20 text-right">{data.earnings[i]?.amount ? data.earnings[i].amount.toLocaleString("en-IN") : ""}</td>
                  <td className="py-0.5 px-2 border border-foreground/20">{data.deductions[i]?.label || ""}</td>
                  <td className="py-0.5 px-2 border border-foreground/20 text-right">{data.deductions[i]?.amount ? data.deductions[i].amount.toLocaleString("en-IN") : ""}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-1 px-2 border border-foreground/20">(A) Total Earnings</td>
                <td className="py-1 px-2 border border-foreground/20 text-right">{totalEarnings.toLocaleString("en-IN")}</td>
                <td className="py-1 px-2 border border-foreground/20">(B) Total Deduction</td>
                <td className="py-1 px-2 border border-foreground/20 text-right">{totalDeductions.toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
          </table>

          {/* Net Salary */}
          <table className="w-full border-collapse border border-foreground/20 mb-6">
            <tbody>
              <tr className="font-bold text-[11px]">
                <td className="py-2 px-2 border border-foreground/20 text-right w-[70%]">Net Salary = (A) - (B)</td>
                <td className="py-2 px-2 border border-foreground/20 text-right w-[30%]">{netSalary.toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
          </table>

          {/* Footer */}
          <div className="mt-16 pt-4 border-t border-foreground/10 text-center text-[9px] text-muted-foreground">
            <div>Registered Office: {data.company.name || "Company Name"}</div>
            <div>{data.company.address || "Company Address"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ left, mid, span }: { left: [string, string]; mid: [string, string]; right: string[]; span?: boolean }) {
  return (
    <tr>
      <td className="py-0.5 px-2 border border-foreground/20 font-semibold w-[18%]">{left[0]}</td>
      <td className={`py-0.5 px-2 border border-foreground/20 ${span ? "font-semibold" : ""}`} colSpan={span ? 1 : 1}>{left[1]}</td>
      <td className="py-0.5 px-2 border border-foreground/20 font-semibold w-[18%]">{mid[0]}</td>
      <td className="py-0.5 px-2 border border-foreground/20">{mid[1]}</td>
    </tr>
  );
}
