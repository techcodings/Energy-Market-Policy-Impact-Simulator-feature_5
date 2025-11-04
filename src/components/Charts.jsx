import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

export default function Charts({ forecast, sim }) {
  const has = forecast || sim?.policy_adjusted
  if (!has) return <div style={{ opacity: 0.7 }}>Run a forecast or policy simulation to see charts.</div>

  const data = (() => {
    const src = sim?.policy_adjusted || forecast
    const n = src.price.length
    return Array.from({ length: n }, (_, i) => ({
      h: i,
      price: src.price[i],
      demand: src.demand[i],
      supply: src.supply[i],
      ren: src.renewable_share[i]
    }))
  })()

  return (
    <div className="chart-grid">

      {/* PRICE */}
      <div className="card">
        <h3>Energy Pricing Projection</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(200,255,80,0.25)" strokeDasharray="4 3" />
            <XAxis dataKey="h" stroke="#d8ff3a" tick={{ fill:"#d8ff3a" }} />
            <YAxis stroke="#d8ff3a" tick={{ fill:"#d8ff3a" }} />
            <Tooltip contentStyle={{
              background:"rgba(5,15,5,0.85)",
              border:"1px solid #baff3a",
              borderRadius:8,
              color:"#fff"
            }} />
            <Legend wrapperStyle={{ color:"#baff3a" }} />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#d8ff39"
              strokeWidth={2.5}
              dot={{ r:4, stroke:"#d8ff39", fill:"#031a08" }}
              activeDot={{ r:6 }}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SUPPLY VS DEMAND */}
      <div className="card">
        <h3>Supply vs Demand</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(200,255,80,0.25)" strokeDasharray="4 3" />
            <XAxis dataKey="h" stroke="#d8ff3a" tick={{ fill:"#d8ff3a" }} />
            <YAxis stroke="#d8ff3a" tick={{ fill:"#d8ff3a" }} />
            <Tooltip contentStyle={{
              background:"rgba(5,15,5,0.85)",
              border:"1px solid #baff3a",
              borderRadius:8,
              color:"#fff"
            }} />
            <Legend wrapperStyle={{ color:"#baff3a" }} />

            <Line type="monotone" dataKey="demand" stroke="#ffeb3b" strokeWidth={2} animationDuration={1200}/>
            <Line type="monotone" dataKey="supply" stroke="#8aff47" strokeWidth={2} animationDuration={1500}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* RENEWABLE SHARE */}
      <div className="card">
        <h3>Renewable Share</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(200,255,80,0.25)" strokeDasharray="4 3" />
            <XAxis dataKey="h" stroke="#d8ff3a" tick={{ fill:"#d8ff3a" }} />
            <YAxis stroke="#d8ff3a" tick={{ fill:"#d8ff3a" }} />
            <Tooltip contentStyle={{
              background:"rgba(5,15,5,0.85)",
              border:"1px solid #baff3a",
              borderRadius:8,
              color:"#fff"
            }} />
            <Legend wrapperStyle={{ color:"#baff3a" }} />

            <Line type="monotone" dataKey="ren" stroke="#72ff4d" strokeWidth={2.5} animationDuration={1500}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
