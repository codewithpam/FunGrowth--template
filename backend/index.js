import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { generateWorksheet } from "./ai.js";
import { createPDF } from "./pdf.js";

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Health check (Azure) */
app.get("/", (req, res) => {
  res.send("FunGrowth API is running 🚀");
});

/* Main API */
app.post("/generate-pdf", async (req, res) => {
  const { topic, age, questions, language } = req.body;

  try {
    const aiContent = await generateWorksheet({
      topic,
      age,
      questions,
      language,
    });

    const pdfBytes = await createPDF(topic, aiContent, language);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=activity-sheet.pdf",
    });

    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).send("Error generating PDF");
  }
});

/* IMPORTANT: Azure port binding */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
