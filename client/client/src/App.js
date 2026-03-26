import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 DARK MODE HANDLER
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const uploadFile = async () => {
    if (!file) return alert("Select a file");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API}/upload`, formData);
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Error ❌");
    } finally {
      setLoading(false);
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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white transition-all duration-500">

      {/* 🌙 DARK MODE BUTTON */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-lg"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* 📊 SIDEBAR */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-3">
          <li className="hover:bg-blue-500 p-2 rounded">📊 Forecast</li>
          <li className="hover:bg-blue-500 p-2 rounded">📁 Upload</li>
          <li className="hover:bg-blue-500 p-2 rounded">⚙️ Settings</li>
        </ul>
      </div>

      {/* 🧾 MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-blue-600 mb-8 text-center"
        >
          📊 Sales Forecast Dashboard
        </motion.h1>

        {/* UPLOAD CARD */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"
        >
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 w-full p-2 border rounded-lg"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={uploadFile}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Upload & Forecast
          </motion.button>
        </motion.div>

        {/* ⏳ LOADING */}
        {loading && (
          <div className="flex justify-center mt-6">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* 📈 CHART */}
        {data.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"
          >
            <Line data={chartData} />
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default App;