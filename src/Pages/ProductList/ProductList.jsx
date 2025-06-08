import "./ProductList.css";
import { data } from "../../result";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useState, useMemo } from "react";

const monthsOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const columns = [
  { field: "id", headerName: "ID", width: 140 },
  { field: "_year", headerName: "Year", width: 200 },
  { field: "month", headerName: "Month", width: 150 },
  { field: "product", headerName: "Product", width: 180 },
  { field: "state", headerName: "State", width: 250 },
  { field: "requirement_in_mt_", headerName: "Requirement (MT)", width: 250 },
  { field: "availability_in_mt_", headerName: "Availability (MT)", width: 190 },
];

const sortOptions = {
  _year: ["Recent - Old", "Old - Recent"],
  month: ["Jan - Dec", "Dec - Jan"],
  state: ["A - Z", "Z - A"],
  requirement_in_mt_: ["Low - High", "High - Low"],
  availability_in_mt_: ["Low - High", "High - Low"],
};

function ProductList() {
  const [sortState, setSortState] = useState({});

  const sortedData = useMemo(() => {
    let sorted = [...data];
    Object.entries(sortState).forEach(([key, dir]) => {
      if (!dir) return;
      sorted.sort((a, b) => {
        if (key === "month") {
          const valA = monthsOrder.indexOf(a[key]);
          const valB = monthsOrder.indexOf(b[key]);
          return dir === "asc" ? valA - valB : valB - valA;
        }
        if (key === "state" || key === "_year") {
          return dir === "asc"
            ? a[key].localeCompare(b[key])
            : b[key].localeCompare(a[key]);
        }
        return dir === "asc"
          ? Number(a[key]) - Number(b[key])
          : Number(b[key]) - Number(a[key]);
      });
    });
    return sorted;
  }, [sortState]);

  const handleSortChange = (field, label) => {
    const mapLabelToDir = {
      "Recent - Old": "desc",
      "Old - Recent": "asc",
      "Jan - Dec": "asc",
      "Dec - Jan": "desc",
      "A - Z": "asc",
      "Z - A": "desc",
      "Low - High": "asc",
      "High - Low": "desc",
    };
    setSortState((prev) => ({
      ...prev,
      [field]: mapLabelToDir[label] || null,
    }));
  };

  return (
    <div className="productList">
      <div style={{ fontSize: 24, marginBottom: "1rem" }}>ProductList</div>

      <button onClick={() => setSortState({})} style={{ marginBottom: "1rem" }}>
        Reset Sort
      </button>

      <div className="productListTable">
        <div className="ag-theme-alpine" style={{ width: "100%" }}>
          <div style={{ display: "flex", paddingBottom: "0.5rem" }}>
            {columns.map((col) =>
              sortOptions[col.field] ? (
                <div
                  key={col.field}
                  style={{ width: col.width, textAlign: "center" }}
                >
                  <select
                    onChange={(e) =>
                      handleSortChange(col.field, e.target.value)
                    }
                    value={
                      Object.entries(sortOptions[col.field]).find(
                        ([label]) => sortState[col.field] === label
                      ) || ""
                    }
                    style={{ width: "100%" }}
                  >
                    <option value="">Sort</option>
                    {sortOptions[col.field].map((label) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <div style={{ fontWeight: "bold", marginTop: "4px" }}>
                    {col.headerName}
                  </div>
                </div>
              ) : (
                <div
                  key={col.field}
                  style={{ width: col.width, textAlign: "center" }}
                >
                  <div style={{ fontWeight: "bold" }}>{col.headerName}</div>
                </div>
              )
            )}
          </div>

          <AgGridReact
            rowData={sortedData}
            columnDefs={columns}
            headerHeight={50}
            domLayout="autoHeight"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductList;