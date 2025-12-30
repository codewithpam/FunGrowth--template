import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function createPDF(topic, content, language = "en") {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    // 🔤 Choose font based on language
    let fontPath = path.join("fonts", "NotoSans-Regular.ttf");

    if (language === "ta") {
      fontPath = path.join("fonts", "NotoSansTamil-Regular.ttf");
    } else if (language === "hi") {
      fontPath = path.join("fonts", "NotoSansDevanagari-Regular.ttf");
    }

    // 🔑 THIS IS THE KEY LINE
    doc.registerFont("custom", fontPath);
    doc.font("custom");

    // Title
    doc
      .fontSize(18)
      .text(`FunGrowth Activity Sheet`, { align: "center" })
      .moveDown();

    doc
      .fontSize(14)
      .text(`Topic: ${topic}`)
      .moveDown();

    // Content
    doc.fontSize(12).text(content, {
      align: "left",
      lineGap: 6,
    });

    doc.end();
  });
}

// import { PDFDocument, StandardFonts } from "pdf-lib";

// export async function createPDF(title, content) {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage();
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

//   let y = 750;

//   page.drawText(title, {
//     x: 50,
//     y,
//     size: 20,
//     font,
//   });

//   y -= 40;

//   content.split("\n").forEach((line) => {
//     page.drawText(line, {
//       x: 50,
//       y,
//       size: 12,
//       font,
//     });
//     y -= 18;
//   });

//   return await pdfDoc.save();
// }
