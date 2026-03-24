const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

let salesData = [];

// Upload CSV
app.post("/upload", upload.single("file"), (req, res) => {
  salesData = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      salesData.push({
        date: row.date,
        sales: parseFloat(row.sales),
      });
    })
    .on("end", () => {
      res.json({ message: "Uploaded successfully" });
    });
});

// Forecast
app.get("/forecast", async (req, res) => {
  try {
    const response = await axios.post(`${process.env.ML_API_URL}/forecast`, {
      data: salesData,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).send("Error forecasting");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server running on port", PORT));