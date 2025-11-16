import React from "react";
import { Settings } from "lucide-react";

export default function PolicyForm({ policy, onChange, onRun, onMap, onSummary }) {
  const upd = (k, v) => onChange({ ...policy, [k]: v });

  return (
    <div className="card fade">
      <h3 className="form-title flex-title">
        <Settings size={16} style={{ marginRight: 6 }} /> Policy Scenario
      </h3>

      <div className="form-grid">
        <div className="form-field">
          <label>Tariff %</label>
          <input
            type="number"
            value={policy.tariff_pct}
            onChange={(e) => upd("tariff_pct", Number(e.target.value))}
          />
        </div>

        <div className="form-field">
          <label>Subsidy %</label>
          <input
            type="number"
            value={policy.subsidy_pct}
            onChange={(e) => upd("subsidy_pct", Number(e.target.value))}
          />
        </div>

        <div className="form-field">
          <label>Carbon Tax $/t</label>
          <input
            type="number"
            value={policy.carbon_tax_per_ton}
            onChange={(e) => upd("carbon_tax_per_ton", Number(e.target.value))}
          />
        </div>

        <div className="form-field">
          <label>Renewable Mandate %</label>
          <input
            type="number"
            value={policy.renewable_mandate_pct}
            onChange={(e) => upd("renewable_mandate_pct", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="btn-row">
        <button onClick={onRun}>Run Policy</button>
        
        <button onClick={onSummary}>Generate Summary</button>
      </div>
    </div>
  );
}
