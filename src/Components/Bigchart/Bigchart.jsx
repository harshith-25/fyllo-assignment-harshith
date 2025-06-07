import { useState } from "react"
import "./Bigchart.css"
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Legend,
} from "recharts"

function Bigchart({ title, data }) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const products = [...new Set(data.map((item) => item.product))]
  const states = [...new Set(data.map((item) => item.state))]

  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [selectedState, setSelectedState] = useState(states[1])

  function handleProductChange(e) {
    setSelectedProduct(e.target.value)
  }

  function handleStateChange(e) {
    setSelectedState(e.target.value)
  }

  // Prepare chart data based on selected state and product
  const chartData = months.map((month) => {
    const monthlyEntries = data.filter(
      (item) =>
        item.product === selectedProduct &&
        item.state === selectedState &&
        item.month === month
    )

    const totalAvailability = monthlyEntries.reduce(
      (sum, item) => sum + parseFloat(item.availability_in_mt_ || 0), 0
    )
    const totalRequirement = monthlyEntries.reduce(
      (sum, item) => sum + parseFloat(item.requirement_in_mt_ || 0), 0
    )

    return {
      month,
      availability: totalAvailability,
      requirement: totalRequirement,
    }
  })

  return (
    <div className="bigchart">
      <h3 className="bigchartTitle">{title}</h3>

      <div className="bigchartSelect">
        <div>
          <h5>Product</h5>
          <select onChange={handleProductChange} value={selectedProduct}>
            {products.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <h5>State</h5>
          <select onChange={handleStateChange} value={selectedState}>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%" aspect={2 / 1}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="requirement" fill="#60AC4A" />
          <Bar dataKey="availability" fill="#FF6347" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Bigchart