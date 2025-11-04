import React, { useEffect, useState } from 'react'
import ForecastForm from '../components/ForecastForm'
import PolicyForm from '../components/PolicyForm'
import Charts from '../components/Charts'
import MapImpact from '../components/MapImpact'
import SummaryBox from '../components/SummaryBox'
import "../components/styles.css"

const API = import.meta.env.VITE_API_URL || 'http://localhost:8001'

export default function App() {
  const [history, setHistory] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [policy, setPolicy] = useState({tariff_pct:5, subsidy_pct:3, carbon_tax_per_ton:20, renewable_mandate_pct:5})
  const [sim, setSim] = useState(null)
  const [regions, setRegions] = useState([])
  const [summary, setSummary] = useState('')

  useEffect(()=>{ (async()=>{
    const res = await fetch(`${API}/sample-data`)
    const json = await res.json()
    setHistory(json.history)
    setPolicy(json.policy_defaults)
    setRegions(json.countries)
  })()},[])

  async function runForecast(h){ const r = await fetch(`${API}/forecast`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(h)}); setForecast(await r.json()) }
  async function runPolicy(){ const r = await fetch(`${API}/policy-simulate`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({history, policy})}); setSim(await r.json()) }
  async function getMap(){ const r = await fetch(`${API}/map`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({base_index:50, policy, countries:regions})}); const j = await r.json(); setRegions(j.regions) }
  async function getSummary(){ const r = await fetch(`${API}/summarize`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({history, policy, region_note:'Global'})}); const j = await r.json(); setSummary(j.summary) }

  return (
    <div className="app-wrap">
      <h1>⚡ Energy Market & Policy Impact Simulator</h1>
      <p style={{opacity:0.7}}>Predict markets, simulate policy, see global impacts.</p>

      <div className="grid-2">
        <div>
          <div className="card"><ForecastForm history={history} onChange={setHistory} onRun={()=>runForecast(history)} /></div>
          <div className="card"><PolicyForm policy={policy} onChange={setPolicy} onRun={runPolicy} onMap={getMap} onSummary={getSummary} /></div>
          <div className="card"><SummaryBox text={summary} /></div>
        </div>

        <div>
          <div className="card"><Charts forecast={forecast} sim={sim} /></div>
          <div className="card"><MapImpact data={regions} /></div>
        </div>
      </div>
    </div>
  )
}
