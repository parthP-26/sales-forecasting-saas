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

{Object.keys(data).length > 0 && (
  <div>
    {Object.keys(data).map((product) => (
      <div key={product} style={{ marginTop: 20 }}>
        <h2>{product}</h2>

        <ul>
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
    </div>
  );
}

export default App;