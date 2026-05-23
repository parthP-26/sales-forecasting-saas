# 📊 Sales Forecasting SaaS

A modern AI-inspired Sales Forecasting Dashboard built using:

* ⚛ React.js
* 🎨 Tailwind CSS
* 📈 Chart.js
* 🚀 Express.js
* 📂 CSV Upload
* 🌙 Dark Mode
* ✨ Framer Motion Animations

This project allows users to upload sales datasets and generate multi-product forecasts with beautiful analytics visualization.

---

# 🚀 Features

✅ Upload CSV files
✅ Multi-product forecasting
✅ Interactive charts
✅ Dark/Light mode 🌙
✅ Animated premium dashboard UI
✅ Responsive layout
✅ Trend-based forecasting
✅ Forecast analytics cards
✅ Modern SaaS design

---

# 🛠 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Framer Motion
* Chart.js
* Axios

## Backend

* Node.js
* Express.js
* Multer
* CSV Parser

---

# 📂 Project Structure

```bash id="readme001"
sales-forecasting-saas/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── server/
│   ├── server.js
│   ├── package.json
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash id="readme002"
git clone https://github.com/parthP-26/sales-forecasting-saas.git
```

---

# 📦 Backend Setup

## 2️⃣ Navigate to Server

```bash id="readme003"
cd server
```

## 3️⃣ Install Dependencies

```bash id="readme004"
npm install
```

## 4️⃣ Start Backend

```bash id="readme005"
node server.js
```

Backend runs on:

```bash id="readme006"
http://localhost:4000
```

---

# 💻 Frontend Setup

## 5️⃣ Navigate to Client

```bash id="readme007"
cd client
```

## 6️⃣ Install Dependencies

```bash id="readme008"
npm install
```

## 7️⃣ Start Frontend

```bash id="readme009"
npm start
```

Frontend runs on:

```bash id="readme010"
http://localhost:3000
```

---

# 📄 CSV Format

Upload CSV files in this format:

```csv id="readme011"
date,product,sales
2024-01-01,Product A,120
2024-01-02,Product A,135
2024-01-03,Product A,150
```

---

# 📈 Forecast Logic

The backend:

* reads uploaded CSV
* groups data by product
* calculates sales trend
* generates future predictions
* adds slight natural variation

This creates realistic forecasting graphs.

---

# 🌙 Dark Mode

The dashboard includes:

* smooth dark/light mode switching
* gradient backgrounds
* glassmorphism UI
* responsive cards

---

# 🚀 Deployment

## Frontend (Vercel)

Deploy `client` folder on Vercel.

Build settings:

```bash id="readme012"
Build Command: npm run build
Output Directory: build
```

---

## Backend (Render)

Deploy `server` folder on Render.

Start command:

```bash id="readme013"
node server.js
```

---

# 📦 Required Packages

## Frontend

```bash id="readme014"
npm install axios framer-motion chart.js react-chartjs-2
```

```bash id="readme015"
npm install -D tailwindcss postcss autoprefixer
```

---

## Backend

```bash id="readme016"
npm install express multer cors csv-parser
```

---

# ✨ Future Improvements

* 🔮 Real ML forecasting
* 📊 Advanced analytics
* 📅 Date filtering
* 📥 CSV export
* 🔐 Authentication
* ☁ Cloud storage
* 📉 Revenue predictions

---

# 👨‍💻 Author

Developed by Parth Polgawande 🚀
