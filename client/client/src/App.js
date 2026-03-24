import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:4000/upload", formData);
    alert("Uploaded");
  };

  const getForecast = async () => {
    const res = await axios.get("http://localhost:4000/forecast");
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