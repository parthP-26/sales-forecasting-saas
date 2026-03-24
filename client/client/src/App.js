import React, { useState } from "react";
import axios from "axios";

const API = "https://sales-forecasting-saas.onrender.com";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const uploadFile = async () => {
    try{
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("https://web-production-94ee7.up.railway.app/upload", formData);
    console.log(res.data);
    alert("Uploaded✅");
  } catch(err){
    onsole.error(err);
    alert("Upload failed❌");
    }
  };

  const getForecast = async () => {
    const res = await axios.get("https://web-production-94ee7.up.railway.app/forecast");
    setData(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sales Forecast</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>

      <button onClick={getForecast}>Forecast</button>

      <ul>
        {data.map((item, i) => (
          <li key={i}>
            {item.ds} → {item.yhat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;