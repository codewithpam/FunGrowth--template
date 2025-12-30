import OpenAI from "openai";

export async function generateWorksheet({ topic, age, questions ,language }) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
const languageMap = {
    en: "English",
    ta: "Tamil",
    hi: "Hindi",
    es: "Spanish",
    no: "Norwegian (Bokmål)",
  };
  language = languageMap[language] || "English";

  const prompt = `
Create a kids activity worksheet.

Age: ${age}
Topic: ${topic}
Number of questions: ${questions}
Language: ${language}

General Rules:
- Use very simple words
- Kid-friendly tone and keep the kids age in mind
- Activities like circle, match, fill blanks use only text
- avoid images and illustrations
- Add fun facts or tips at the end
- Do NOT include answers
- Output as numbered list
- Create the language-specific content
- DO NOT use emojis or special symbols
- Use plain ASCII text only

CRITICAL RULES:
- Write the ENTIRE worksheet ONLY in ${language} including the header and ${topic}
- Do NOT use English words if the language is not English
- Do NOT mix languages
- Question labels and instructions must follow the language rules
- If the language is Tamil, use Tamil letters(அ, ஆ, இ, ஈ) or numbers (not A, B, C)
- If the language is Hindi, use Devanagari letters (क, ख, ग) or numbers
- If the language is Norwegian, write in simple Bokmål
- Question labels, instructions, fun facts — everything must be in ${language}
- If you cannot write in ${language}, DO NOT fallback to English


Generate the worksheet as per the above rules.`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
