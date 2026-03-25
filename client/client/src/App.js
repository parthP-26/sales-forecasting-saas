import React, { useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const API = "https://sales-forecasting-saas.onrender.com";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const uploadFile = async () => {
    if (!file) return alert("Select a file");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API}/upload`, formData);
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Upload/Forecast failed ❌");
    }
  };

  const chartData = {
    labels: data.map((item) =>
      new Date(item.ds).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Sales Forecast",
        data: data.map((item) => Math.round(item.yhat)),
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        📊 Sales Forecast Dashboard
      </h1>

      {/* Upload Card */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full"
        />

        <button
          onClick={uploadFile}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Upload & Forecast
        </button>
      </div>

      {/* Chart */}
      {data.length > 0 && (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
          <Line data={chartData} />
        </div>
      )}

    </div>
  );
}

export default App;