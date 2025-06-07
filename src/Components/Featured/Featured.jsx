import { data } from "../../result.js"
import "./Featured.css"
import Chart from "../Chart/Chart"
import Bigchart from "../Bigchart/Bigchart"
import Piechart from "../Piechart/Piechart"
import { getTopFertilizers } from "../../utils.js"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function Featured() {
  return (
    <div className="featured">

      <div className="featuredpiechart">
        <Piechart
          data={data}
          title="Top 5 Required products"
          dataKey="requirement_in_mt_"
        />
        <Piechart
          data={data}
          title="Top 5 Available products"
          dataKey="availability_in_mt_"
        />
      </div>

      <Bigchart
        data={data}
        title="Product Availability and Requirements"
        grid
      />

      <div className="featuredItem">
        <div className="widgetsm">
          <Chart
            data={data}
            title="State wise product"
            grid
            parent="state"
            child="product"
            defaultValue={data[0]}
          />
        </div>

        <div className="widgetsm">
          <Chart
            data={data}
            title="Year wise product"
            grid
            parent="_year"
            child="product"
            defaultValue={data[0]}
          />
        </div>

        <div className="widgetsm">
          <Chart
            data={data}
            title="Month wise product"
            grid
            parent="month"
            child="product"
            defaultValue={data[0]}
          />
        </div>
      </div>

      {/* Now this part is moved below */}
      <div className="featuredbarcharts">
        <div className="widgetsm">
          <h3 className="chartTitle">Top 5 Most Required Fertilizers</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getTopFertilizers(data, "requirement_in_mt_", 5, "desc")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="widgetsm">
          <h3 className="chartTitle">Top 5 Least Available Fertilizers</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getTopFertilizers(data, "availability_in_mt_", 5, "asc")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}

export default Featured