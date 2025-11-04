import React from 'react'
export default function SummaryBox({text}){
  return (<div style={{background:'#1112', padding:16, borderRadius:12, marginTop:12}}>
    <h3>Text Summary</h3>
    <div style={{whiteSpace:'pre-wrap'}}>{text || 'Run "Generate Summary" to see interpretation.'}</div>
  </div>)
}
