import React, { useEffect, useState } from "react";
import ForecastForm from "../components/ForecastForm";
import PolicyForm from "../components/PolicyForm";
import Charts from "../components/Charts";
import SummaryBox from "../components/SummaryBox";
import "../components/styles.css";

const API = "https://magical-croquembouche-f2f64c.netlify.app/api";
console.log("API Loaded:", API);

export default function App() {
  const [history, setHistory] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [policy, setPolicy] = useState({
    tariff_pct: 5,
    subsidy_pct: 3,
    carbon_tax_per_ton: 20,
    renewable_mandate_pct: 5,
  });
  const [sim, setSim] = useState(null);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API}/sample-data`);
      const json = await res.json();
      setHistory(json.history);
      setPolicy(json.policy_defaults);
      // removed: setRegions(json.countries);  (no map now)
    })();
  }, []);

  async function runForecast(h) {
    const r = await fetch(`${API}/forecast`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(h),
    });
    setForecast(await r.json());
  }

  async function runPolicy() {
    const r = await fetch(`${API}/policy-simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history, policy }),
    });
    setSim(await r.json());
  }

  async function getSummary() {
    const r = await fetch(`${API}/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history, policy, region_note: "Global" }),
    });
    const j = await r.json();
    setSummary(j.summary);
  }

  return (
    <div className="app-wrap" style={{ position: "relative" }}>
      {/* ✅ Fixed Top-Right Back Button */}
      <a
        href="https://energy-verse-portal.netlify.app/?feature=5"
        className="btn-back-top"
        style={{
          position: "absolute",
          top: "16px",
          right: "20px",
          background: "linear-gradient(90deg, #caff37, #84ff4b)",
          color: "#000",
          padding: "7px 16px",
          borderRadius: "8px",
          fontWeight: "600",
          textDecoration: "none",
          boxShadow: "0 0 12px rgba(186,255,55,0.7)",
          transition: "all 0.3s ease",
          zIndex: 1000,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = "0 0 20px rgba(186,255,55,1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "0 0 12px rgba(186,255,55,0.7)")
        }
      >
        ← Back to Home
      </a>

      {/* Page Title */}
      <h1 style={{ marginTop: "60px" }}>
        ⚡ Energy Market &amp; Policy Impact Simulator
      </h1>
      <p style={{ opacity: 0.7 }}>
        Predict markets, simulate policy, see global impacts.
      </p>

      {/* Main Grid Layout */}
      <div className="grid-2">
        <div>
          <div className="card">
            <ForecastForm
              history={history}
              onChange={setHistory}
              onRun={() => runForecast(history)}
            />
          </div>

          <div className="card">
            <PolicyForm
              policy={policy}
              onChange={setPolicy}
              onRun={runPolicy}
              onSummary={getSummary}
            />
          </div>

          <div className="card">
            <SummaryBox text={summary} />
          </div>
        </div>

        <div>
          <div className="card">
            <Charts forecast={forecast} sim={sim} />
          </div>
          {/* MapImpact removed – right side now only has charts */}
        </div>
      </div>
    </div>
  );
}
