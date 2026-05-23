import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API = "https://sales-forecasting-saas.onrender.com";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🌙 Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // 📤 Upload + Forecast
  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API}/upload`, formData);

      console.log(res.data);

      setData(res.data);

      alert("Forecast Ready ✅");
    } catch (err) {
      console.error(err);
      alert("Upload/Forecast failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white transition-all duration-500">

      {/* Sidebar */}
      <div className="w-72 bg-blue-600 text-white p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-12">
          Dashboard
        </h1>

        <ul className="space-y-8 text-xl">
          <li>📊 Forecast</li>
          <li>📁 Upload</li>
          <li>⚙️ Settings</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">

        {/* Dark Mode */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-900 text-white px-5 py-2 rounded-xl shadow-lg"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-center text-blue-600 mb-12"
        >
          📊 Sales Forecast Dashboard
        </motion.h1>

        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl"
        >
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-4 border rounded-xl mb-6 dark:bg-gray-700"
          />

          <button
            onClick={uploadFile}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl text-xl font-semibold transition"
          >
            Upload & Forecast
          </button>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center mt-6">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </motion.div>

        {/* Results */}
        {Object.keys(data).length > 0 && (
          <div className="mt-12 space-y-8">

            {Object.keys(data).map((product) => (
              <motion.div
                key={product}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl"
              >
                <h2 className="text-3xl font-bold mb-6 text-blue-500">
                  {product}
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {data[product].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
                    >
                      <p className="font-semibold">
                        {new Date(item.ds).toLocaleDateString()}
                      </p>

                      <p className="text-lg">
                        Forecast: {Math.round(item.yhat)}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;