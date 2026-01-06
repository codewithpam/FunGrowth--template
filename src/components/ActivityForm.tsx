import { useState } from "react";
import "./ActivityForm.css";

const ActivityForm = () => {
  const [topic, setTopic] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [questions, setQuestions] = useState<number | "">("");
//  const [file, setFile] = useState<File | null>(null);
    const [language, setLanguage] = useState("en");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!topic || !age || !questions) {
    alert("Please fill all mandatory fields 🌟");
    return;
  }

  try {
    setLoading(true);
    //use HTTPS API endpoint for PDF generation
    const API_URL = import.meta.env.VITE_API_URL;

    const response = await fetch(`${API_URL}/generate-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        age,
        questions,
        language,
      }),
    });

    if (!response.ok) {
      throw new Error("Backend error");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "FunGrowth-Activity-Sheet.pdf";
    a.click();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Something went wrong while generating the activity sheet 😢");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="activity-container">
      <h1 className="title">🎨 FunGrowth Activity Generator</h1>
      <p className="subtitle">
        Create fun, printable learning worksheets for kids 📘✨
      </p>

      <form className="activity-form" onSubmit={handleSubmit}>
        <label>
          📚 Subject / Topic *
          <input
            type="text"
            placeholder="e.g. Shapes, Vowels, Living Things"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>

        <label>
          🎂 Age of the Kid *
          <input
            type="number"
            min={3}
            max={12}
            placeholder="e.g. 6"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>

        <label>
          ❓ Number of Questions *
          <input
            type="number"
            min={1}
            max={20}
            placeholder="e.g. 5"
            value={questions}
            onChange={(e) => setQuestions(Number(e.target.value))}
          />
        </label>
        <label>
          🌐 Language *
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="no">Norwegian</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
          <option value="es">Spanish</option>
        </select>
      </label>

        {/* <label>
          📎 Reference Document (Optional)
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
           // onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label> */}

        <button
          type="submit"
          className="generate-btn"
          disabled={loading}
        >
          {loading ? "⏳ Generating..." : "🚀 Generate Activity Sheet"}
        </button>
      </form>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3208/3208723.png"
        alt="Kids Learning"
        className="kids-image"
      />
    </div>
  );
};

export default ActivityForm;
