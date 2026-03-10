import type { PayslipData, LineItem } from "@/types/payslip";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface Props {
  data: PayslipData;
  onChange: (data: PayslipData) => void;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function ControlPanel({ data, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof PayslipData>(section: K, values: Partial<PayslipData[K]>) => {
    onChange({ ...data, [section]: { ...data[section], ...values } });
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Extract dominant color from logo
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorCounts: Record<string, number> = {};
        for (let i = 0; i < imageData.length; i += 16) {
          const r = imageData[i], g = imageData[i + 1], b = imageData[i + 2], a = imageData[i + 3];
          if (a < 128) continue;
          if (r > 240 && g > 240 && b > 240) continue;
          if (r < 15 && g < 15 && b < 15) continue;
          const key = `${Math.round(r / 32) * 32},${Math.round(g / 32) * 32},${Math.round(b / 32) * 32}`;
          colorCounts[key] = (colorCounts[key] || 0) + 1;
        }
        let dominant = "#0047FF";
        let max = 0;
        for (const [key, count] of Object.entries(colorCounts)) {
          if (count > max) {
            max = count;
            const [r, g, b] = key.split(",").map(Number);
            dominant = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
          }
        }
        update("company", { logo: result, logoBorderColor: dominant });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const updateLineItem = (type: "earnings" | "deductions", id: string, field: keyof LineItem, value: string | number) => {
    onChange({
      ...data,
      [type]: data[type].map((item) => item.id === id ? { ...item, [field]: value } : item),
    });
  };

  const addLineItem = (type: "earnings" | "deductions") => {
    onChange({
      ...data,
      [type]: [...data[type], { id: Date.now().toString(), label: "", amount: 0 }],
    });
  };

  const removeLineItem = (type: "earnings" | "deductions", id: string) => {
    onChange({ ...data, [type]: data[type].filter((item) => item.id !== id) });
  };

  return (
    <div className="p-6 space-y-8">
      <header className="border-b border-border pb-4">
        <h1 className="text-lg font-bold tracking-tight">PAYSLIP GENERATOR</h1>
        <p className="text-xs text-muted-foreground mt-1">Fill details to generate payslip</p>
      </header>

      {/* Company */}
      <Section title="COMPANY DETAILS">
        <Field label="Company Name" value={data.company.name} onChange={(v) => update("company", { name: v })} />
        <Field label="Registered Address" value={data.company.address} onChange={(v) => update("company", { address: v })} />
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Company Logo</label>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogo} />
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full h-20 border border-dashed border-border flex items-center justify-center gap-2 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {data.company.logo ? (
              <img src={data.company.logo} alt="Logo" className="h-14 object-contain" />
            ) : (
              <>
                <Upload size={14} />
                Upload Logo
              </>
            )}
          </button>
        </div>
      </Section>

      {/* Pay Period */}
      <Section title="PAY PERIOD">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Month</label>
            <select
              value={data.payPeriod.month}
              onChange={(e) => update("payPeriod", { month: e.target.value })}
              className="w-full h-9 px-2 text-xs border border-border bg-card focus:border-primary focus:outline-none"
            >
              {months.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <Field label="Year" value={data.payPeriod.year} onChange={(v) => update("payPeriod", { year: v })} />
        </div>
        <Field label="Financial Year" value={data.payPeriod.financialYear} onChange={(v) => update("payPeriod", { financialYear: v })} />
        <div className="grid grid-cols-3 gap-3">
          <NumField label="Calendar Days" value={data.payPeriod.availableCalendarDays} onChange={(v) => update("payPeriod", { availableCalendarDays: v })} />
          <NumField label="Paid Days" value={data.payPeriod.paidDays} onChange={(v) => update("payPeriod", { paidDays: v })} />
          <NumField label="LOP Days" value={data.payPeriod.lossOfPayDays} onChange={(v) => update("payPeriod", { lossOfPayDays: v })} />
        </div>
      </Section>

      {/* Employee */}
      <Section title="EMPLOYEE DETAILS">
        <Field label="Employee Name" value={data.employee.name} onChange={(v) => update("employee", { name: v })} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Associate ID" value={data.employee.associateId} onChange={(v) => update("employee", { associateId: v })} />
          <Field label="Designation" value={data.employee.designation} onChange={(v) => update("employee", { designation: v })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Gender" value={data.employee.gender} onChange={(v) => update("employee", { gender: v })} />
          <Field label="Date of Joining" value={data.employee.dateOfJoining} onChange={(v) => update("employee", { dateOfJoining: v })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Location" value={data.employee.location} onChange={(v) => update("employee", { location: v })} />
          <Field label="PAN" value={data.employee.pan} onChange={(v) => update("employee", { pan: v })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Bank A/C" value={data.employee.bankAccount} onChange={(v) => update("employee", { bankAccount: v })} />
          <Field label="ESI Number" value={data.employee.esiNumber} onChange={(v) => update("employee", { esiNumber: v })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="PF A/C" value={data.employee.pfAccount} onChange={(v) => update("employee", { pfAccount: v })} />
          <Field label="UAN" value={data.employee.uan} onChange={(v) => update("employee", { uan: v })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="SA Policy No" value={data.employee.saPolicyNo} onChange={(v) => update("employee", { saPolicyNo: v })} />
          <Field label="SA LIC ID" value={data.employee.saLicId} onChange={(v) => update("employee", { saLicId: v })} />
        </div>
        <Field label="Status" value={data.employee.status} onChange={(v) => update("employee", { status: v })} />
      </Section>

      {/* Earnings */}
      <Section title="EARNINGS">
        {data.earnings.map((item) => (
          <div key={item.id} className="flex gap-2 items-end">
            <div className="flex-1">
              <Field label="" value={item.label} onChange={(v) => updateLineItem("earnings", item.id, "label", v)} placeholder="Label" />
            </div>
            <div className="w-28">
              <NumField label="" value={item.amount} onChange={(v) => updateLineItem("earnings", item.id, "amount", v)} />
            </div>
            <button onClick={() => removeLineItem("earnings", item.id)} className="text-xs text-muted-foreground hover:text-destructive h-9 px-1">×</button>
          </div>
        ))}
        <button onClick={() => addLineItem("earnings")} className="text-xs text-primary font-semibold hover:underline">+ Add Earning</button>
      </Section>

      {/* Deductions */}
      <Section title="DEDUCTIONS">
        {data.deductions.map((item) => (
          <div key={item.id} className="flex gap-2 items-end">
            <div className="flex-1">
              <Field label="" value={item.label} onChange={(v) => updateLineItem("deductions", item.id, "label", v)} placeholder="Label" />
            </div>
            <div className="w-28">
              <NumField label="" value={item.amount} onChange={(v) => updateLineItem("deductions", item.id, "amount", v)} />
            </div>
            <button onClick={() => removeLineItem("deductions", item.id)} className="text-xs text-muted-foreground hover:text-destructive h-9 px-1">×</button>
          </div>
        ))}
        <button onClick={() => addLineItem("deductions")} className="text-xs text-primary font-semibold hover:underline">+ Add Deduction</button>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-[11px] font-bold tracking-[0.15em] text-foreground border-b border-border pb-2">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      {label && <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 px-2 text-xs border border-border bg-card focus:border-primary focus:outline-none"
      />
    </div>
  );
}

function NumField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      {label && <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{label}</label>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-9 px-2 text-xs border border-border bg-card focus:border-primary focus:outline-none"
      />
    </div>
  );
}
