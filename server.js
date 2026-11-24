import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "https://my-trading-data.vercel.app",
  "https://my-trading-data.vercel.app/",
  process.env.ALLOWED_ORIGIN
].filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error("Not allowed by CORS"));
    }
  })
);

async function fetchLatestXauLiquidation() {
  // Replace with your live data source / worker cache / API call
  return {
    refPrice: 3627,
    updatedAt: new Date().toISOString(),
    above: [
      { price: 3804, sizeM: 1.4, pct: 4.89 },
      { price: 3777, sizeM: 1.7, pct: 4.12 },
      { price: 3732, sizeM: 2.9, pct: 2.89 },
      { price: 3712, sizeM: 4.7, pct: 2.35 },
      { price: 3704, sizeM: 3.5, pct: 2.12 },
      { price: 3696, sizeM: 5.8, pct: 1.88 },
      { price: 3679, sizeM: 3.3, pct: 1.42 },
      { price: 3668, sizeM: 3.3, pct: 1.12 }
    ],
    below: [
      { price: 3623, sizeM: 3.1, pct: -0.12 },
      { price: 3606, sizeM: 5.0, pct: -0.58 },
      { price: 3595, sizeM: 6.9, pct: -0.89 },
      { price: 3587, sizeM: 6.2, pct: -1.12 },
      { price: 3570, sizeM: 2.5, pct: -1.58 },
      { price: 3559, sizeM: 3.5, pct: -1.89 },
      { price: 3545, sizeM: 1.7, pct: -2.27 },
      { price: 3486, sizeM: 1.7, pct: -3.89 }
    ]
  };
}



app.get("/api/xau-liquidation", async (req, res) => {
  try {
    const data = await fetchLatestXauLiquidation();
    res.set("Cache-Control", "no-store");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch XAU liquidation levels" });
  }
});

app.listen(PORT, () => {
  console.log(`Liquidation relay running on port ${PORT}`);
});