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
    <div className="min-h-screen bg-gray-100 p-6">
      <div>
    <motion.h1
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
    >
      TEST ANIMATION
    </motion.h1>
  </div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center text-blue-600 mb-8"
      >
        📊 Sales Forecast Dashboard
      </motion.h1>

      {/* Upload Card */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full"
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={uploadFile}
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Upload & Forecast
        </motion.button>
      </motion.div>

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