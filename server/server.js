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

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    let groupedData = {};

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        const product = row.product || "Default";

        if (!groupedData[product]) {
          groupedData[product] = [];
        }

        groupedData[product].push({
          date: row.date,
          sales: parseFloat(row.sales),
        });
      })
      .on("end", async () => {
        try {
          let results = {};

          for (let product in groupedData) {
            const response = await axios.post(
              `${process.env.ML_API_URL}/forecast`,
              { data: groupedData[product] }
            );

            results[product] = response.data;
          }

          res.json(results); // ✅ ONLY RESPONSE
        } catch (err) {
          console.error("Forecast error:", err.message);
          res.status(500).send("Error forecasting");
        }
      });

  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);