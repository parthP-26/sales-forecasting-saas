import React, { useState } from "react";
import axios from "axios";

const API = "https://sales-forecasting-saas.onrender.com"; 

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post(`${API}/upload`, formData);
      alert("Uploaded ✅");
    } catch (err) {
      console.log(err); // ✅ fixed
      alert("Upload failed ❌");
    }
  };

  const getForecast = async () => {
    try {
      const res = await axios.get(`${API}/forecast`);
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Forecast failed ❌");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sales Forecast</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={uploadFile}>Upload</button>
      <button onClick={getForecast} style={{ marginLeft: 10 }}>
        Forecast
      </button>

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