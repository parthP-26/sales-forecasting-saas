const express = require("express");

const multer = require("multer");

const cors = require("cors");

const fs = require("fs");

const csv = require("csv-parser");

const app = express();

/*
========================================
MIDDLEWARE
========================================
*/

app.use(cors({ origin: "*" }));

app.use(express.json());

/*
========================================
FILE UPLOAD
========================================
*/

const upload = multer({
  dest: "uploads/",
});

/*
========================================
UPLOAD + FORECAST ROUTE
========================================
*/

app.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {

    try {

      /*
      ========================================
      CHECK FILE
      ========================================
      */

      if (!req.file) {

        return res
          .status(400)
          .send("No file uploaded");

      }

      /*
      ========================================
      STORE PRODUCT DATA
      ========================================
      */

      let groupedData = {};

      /*
      ========================================
      READ CSV
      ========================================
      */

      await new Promise(
        (resolve, reject) => {

          fs.createReadStream(req.file.path)

            .pipe(csv())

            .on("data", (row) => {

              /*
              ========================================
              SKIP INVALID ROWS
              ========================================
              */

              if (
                !row.date ||
                !row.sales
              ) {
                return;
              }

              /*
              ========================================
              PRODUCT NAME
              ========================================
              */

              const product =
                row.product ||
                "Default";

              /*
              ========================================
              CREATE PRODUCT ARRAY
              ========================================
              */

              if (
                !groupedData[product]
              ) {

                groupedData[product] =
                  [];

              }

              /*
              ========================================
              PUSH SALES DATA
              ========================================
              */

              groupedData[product].push({

                date: row.date,

                sales: parseFloat(
                  row.sales
                ),

              });

            })

            .on("end", resolve)

            .on("error", reject);

        }
      );

      console.log(
        "Parsed Data:",
        groupedData
      );

      /*
      ========================================
      GENERATE FORECAST
      ========================================
      */

      let results = {};

      /*
      ========================================
      LOOP PRODUCTS
      ========================================
      */

      for (let product in groupedData) {

        const productData =
          groupedData[product];

        /*
        ========================================
        LAST SALES VALUE
        ========================================
        */

        let current =
          productData[
            productData.length - 1
          ].sales;

        let forecast = [];

        /*
        ========================================
        GENERATE 14 DAYS
        ========================================
        */

        for (
          let i = 1;
          i <= 14;
          i++
        ) {

          /*
          ========================================
          RANDOM FLUCTUATION
          ========================================
          */

          const fluctuation =

            Math.floor(
              Math.random() * 60
            ) - 30;

          /*
          ========================================
          ADD SMALL TREND
          ========================================
          */

          current =
            current +
            fluctuation +
            5;

          /*
          ========================================
          PREVENT NEGATIVE
          ========================================
          */

          if (current < 0) {

            current = 0;

          }

          /*
          ========================================
          CREATE NEXT DATE
          ========================================
          */

          const futureDate =
            new Date();

          futureDate.setDate(
            futureDate.getDate() + i
          );

          /*
          ========================================
          PUSH FORECAST
          ========================================
          */

          forecast.push({

            ds:
              futureDate
                .toISOString()
                .split("T")[0],

            yhat: Math.round(
              current
            ),

          });

        }

        /*
        ========================================
        SAVE PRODUCT FORECAST
        ========================================
        */

        results[product] =
          forecast;

      }

      /*
      ========================================
      SEND RESULTS
      ========================================
      */

      res.json(results);

    } catch (err) {

      console.error(
        "UPLOAD ERROR:",
        err.message
      );

      res
        .status(500)
        .send("Server Error");

    }
  }
);

/*
========================================
HOME ROUTE
========================================
*/

app.get("/", (req, res) => {

  res.send(
    "Sales Forecast Backend Running 🚀"
  );

});

/*
========================================
START SERVER
========================================
*/

const PORT =
  process.env.PORT || 4000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});