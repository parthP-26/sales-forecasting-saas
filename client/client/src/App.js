import { motion } from "framer-motion";
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

console.log("App loaded");

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center text-blue-600 mb-8"
      >
        📊 Sales Forecast Dashboard
      </motion.h1>

      {/* Upload Card */}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full p-2 border rounded-lg"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={uploadFile}
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Upload & Forecast
        </motion.button>
      </motion.div>

      {/* Chart */}
      {data.length > 0 && (
  <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto mt-10 bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
      >
        <Line data={chartData} />
      </motion.div>
    )}

    </div>
  );
}

export default App;