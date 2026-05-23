import React, { useState } from "react";
import axios from "axios";

const API = "https://sales-forecasting-saas.onrender.com"; 

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({});

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API}/upload`, formData);

      console.log("Forecast data:", res.data);
      setData(res.data);

      alert("Forecast Ready ✅");
    } catch (err) {
      console.error(err);
      alert("Upload/Forecast failed ❌");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sales Forecast</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={uploadFile}>Upload & Forecast</button>

      <ul>
        {Object.keys(data).length > 0 && (
          <div className="mt-10">
            {Object.keys(data).map((product) => (
              <div
                key={product}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-6"
              >
                <h2 className="text-2xl font-bold mb-4">
                  {product}
                </h2>

                <ul className="space-y-2">
                  {data[product].map((item, i) => (
                    <li key={i}>
                      {new Date(item.ds).toLocaleDateString()} →{" "}
                      {Math.round(item.yhat)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}

export default App;
