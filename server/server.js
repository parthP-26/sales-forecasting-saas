const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// 🚀 Upload + Forecast together
app.post("/upload", upload.single("file"), (req, res) => {
  let salesData = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      salesData.push({
        date: row.date,
        sales: parseFloat(row.sales),
      });
    })
    .on("end", async () => {
      try {
        console.log("Data sent to ML:", salesData);

        const response = await axios.post(
          `${process.env.ML_API_URL}/forecast`,
          { data: salesData },
          { timeout: 10000 }
        );

        res.json(response.data);
      } catch (err) {
        console.error("ML error:", err.message);
        res.status(500).send("Error forecasting");
      }
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server running on port", PORT));