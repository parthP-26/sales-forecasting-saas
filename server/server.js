const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const upload = multer({ dest: "uploads/" });

/*
========================================
UPLOAD + FORECAST ROUTE
========================================
*/

app.post("/upload", upload.single("file"), async (req, res) => {
  try {

    // Check file
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    let groupedData = {};

    // Read CSV
    await new Promise((resolve, reject) => {

      fs.createReadStream(req.file.path)
        .pipe(csv())

        .on("data", (row) => {

          // Skip bad rows
          if (!row.date || !row.sales) return;

          // Product name
          const product = row.product || "Default";

          // Create array if missing
          if (!groupedData[product]) {
            groupedData[product] = [];
          }

          // Push sales data
          groupedData[product].push({
            date: row.date,
            sales: parseFloat(row.sales),
          });

        })

        .on("end", resolve)
        .on("error", reject);

    });

    console.log("Parsed Data:", groupedData);

    /*
    ========================================
    GENERATE SIMPLE FORECAST
    ========================================
    */

    let results = {};

    for (let product in groupedData) {

      const productData = groupedData[product];

      // Last sales value
      const lastSale =
        productData[productData.length - 1].sales;

      let forecast = [];

      // Generate next 7 days prediction
      for (let i = 1; i <= 7; i++) {

        forecast.push({
          ds: `2024-02-${10 + i}`,
          yhat: lastSale + i * 10,
        });

      }

      results[product] = forecast;
    }

    // Send response
    res.json(results);

  } catch (err) {

    console.error("UPLOAD ERROR:", err.message);

    res.status(500).send("Server Error");
  }
});

/*
========================================
START SERVER
========================================
*/

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});