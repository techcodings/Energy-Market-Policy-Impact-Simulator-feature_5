import React from 'react'
export default function ForecastForm({history, onChange, onRun}){
  if(!history) return <div>Loading sample history…</div>
  const update = (k,v)=> onChange({...history, [k]: v})
  return (<div style={{background:'#1112', padding:16, borderRadius:12, marginBottom:12}}>
    <h3>Numerical Forecasts</h3>
    <label>Steps <input type="number" value={history.steps} onChange={e=>update('steps', Number(e.target.value))}/></label>
    <div><button onClick={onRun}>Run Forecast</button></div>
  </div>)
}
