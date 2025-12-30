import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { generateWorksheet } from "./ai.js";
import { createPDF } from "./pdf.js";


const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-pdf", async (req, res) => {
  const { topic, age, questions, language } = req.body;

  try {
    const aiContent = await generateWorksheet({ topic, age, questions ,language });
    const pdfBytes = await createPDF(topic, aiContent, language);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=activity-sheet.pdf",
    });

    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating PDF");
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
