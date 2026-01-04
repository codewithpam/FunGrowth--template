import express from "express";
import cors from "cors";
import { generateWorksheet } from "./ai.js";
import { createPDF } from "./pdf.js";

// 1. Only load dotenv locally. Azure provides variables via "App Settings"
if (process.env.NODE_ENV !== 'production') {
  try {
    const { default: dotenv } = await import("dotenv");
    dotenv.config();
    console.log("Local development: .env loaded");
  } catch (e) {
    console.log("Not using dotenv library");
  }
}

const app = express();

// 2. Update CORS to allow your frontend URL later
app.use(cors()); 
app.use(express.json());

/* ✅ Health check route */
app.get("/", (req, res) => {
  res.send("FunGrowth API is running 🚀");
});

app.post("/generate-pdf", async (req, res) => {
  const { topic, age, questions, language } = req.body;

  if (!topic || !age) {
    return res.status(400).send("Topic and Age are required");
  }

  try {
    const aiContent = await generateWorksheet({
      topic,
      age,
      questions,
      language
    });

    const pdfBytes = await createPDF(topic, aiContent, language);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=activity-sheet.pdf",
      "Content-Length": pdfBytes.length
    });

    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).send("Error generating PDF");
  }
});

/* 🔥 IMPORTANT FOR CLOUD DEPLOYMENT */
const PORT = process.env.PORT || 5000;
// Listen on 0.0.0.0 to ensure Azure can map the port correctly
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});