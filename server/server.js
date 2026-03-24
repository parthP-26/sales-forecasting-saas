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

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    let salesData = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (row) => {
          if (row.date && row.sales) {
            salesData.push({
              date: row.date,
              sales: parseFloat(row.sales),
            });
          }
        })
        .on("end", resolve)
        .on("error", reject);
    });

    console.log("Parsed Data:", salesData);

    if (salesData.length === 0) {
      return res.status(400).send("CSV parsing failed or empty data");
    }

    const response = await axios.post(
      `${process.env.ML_API_URL}/forecast`,
      { data: salesData },
      { timeout: 20000 }
    );

    res.json(response.data);

  } catch (err) {
    console.error("UPLOAD ERROR:", err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server running on port", PORT));