import { useEffect, useState } from "react";
import { acts } from "./data/acts";
import jsPDF from "jspdf";

const STORAGE_KEY = "six-act-builder-data";

type ClearTarget =
  | { type: "all" }
  | { type: "section"; actId: string; actTitle: string };

function App() {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [clearTarget, setClearTarget] = useState<ClearTarget | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const confirmClear = () => {
    if (!clearTarget) return;

    if (clearTarget.type === "all") {
      setFormData({});
    }

    if (clearTarget.type === "section") {
      const act = acts.find((item) => item.id === clearTarget.actId);
      if (!act) return;

      setFormData((prev) => {
        const next = { ...prev };

        act.fields.forEach((field) => {
          delete next[field.id];
        });

        return next;
      });
    }

    setClearTarget(null);
  };

  const renderDescription = (text: string) => {
    const parts = text.split(/(\|.*?\|)/g);

    return parts.map((part, index) => {
      if (part.startsWith("|") && part.endsWith("|")) {
        const clean = part.slice(1, -1);

        return (
          <span
            key={index}
            style={{
              fontStyle: "italic",
              fontWeight: 100,
              color: "#f3f3f3",
            }}
          >
            {clean}
          </span>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    let y = 10;

    acts.forEach((act) => {
      doc.setFontSize(14);
      doc.text(act.title, 10, y);
      y += 8;

      doc.setFontSize(10);

      act.fields.forEach((field) => {
        const value = formData[field.id] || "[...]";
        const text = `${field.label}: ${value}`;
        const splitText = doc.splitTextToSize(text, 180);

        doc.text(splitText, 10, y);
        y += splitText.length * 6 + 2;
      });

      y += 6;

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("six-act-structure.pdf");
  };

  const generatePreviewText = () => {
    return acts
      .map((act) => {
        const fieldsText = act.fields
          .map((field) => `${field.label} ${formData[field.id] || "[...]"}`)
          .join("\n");

        return `${act.title}\n${fieldsText}`;
      })
      .join("\n\n");
  };

  const copyToClipboard = async () => {
    const text = generatePreviewText();

    try {
      await navigator.clipboard.writeText(text);

      setShowCopied(true);
      setCopied(true);

      setTimeout(() => {
        setCopied(false); // triggers fade out
      }, 1500);

      setTimeout(() => {
        setShowCopied(false); // removes from DOM AFTER fade
      }, 1800);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Six Act Structure Builder</h1>
      <h3>
        (A tool for building the 6-act structure from{" "}
        <a href="https://sixactstructure.com/about-six-act-structure/">
          sixactstructure.com
        </a>
        )
      </h3>

      <button
        onClick={() => setClearTarget({ type: "all" })}
        style={{ marginBottom: "2rem" }}
      >
        Clear All
      </button>

      {acts.map((act) => (
        <div key={act.id} style={{ marginBottom: "2rem" }}>
          <h2>{act.title}</h2>

          <p style={{ fontSize: "1rem", opacity: 0.7 }}>
            <strong>Starts:</strong> {act.startTime} | <strong>Length:</strong>{" "}
            {act.runtime}
          </p>

          <p
            style={{
              paddingTop: "1rem",
              fontFamily: "sans-serif",
              textAlign: "left",
            }}
          >
            <strong>Summary</strong>: {renderDescription(act.description)}
          </p>

          <br />

          {act.fields.map((field) => (
            <div key={field.id} style={{ marginBottom: "1rem" }}>
              <label>{field.label}:</label>

              {field.maxLength <= 100 ? (
                <input
                  type="text"
                  maxLength={field.maxLength}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  style={{ width: "100%", height: "40px" }}
                />
              ) : (
                <textarea
                  maxLength={field.maxLength}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  style={{ width: "100%", height: "80px" }}
                />
              )}

              <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                {(formData[field.id] || "").length} / {field.maxLength}
              </div>
            </div>
          ))}

          <button
            onClick={() =>
              setClearTarget({
                type: "section",
                actId: act.id,
                actTitle: act.title,
              })
            }
          >
            Clear Section
          </button>
        </div>
      ))}

      <button onClick={downloadPdf} style={{ marginBottom: "1rem" }}>
        Download PDF
      </button>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Preview</h2>
      <button onClick={copyToClipboard} style={{ marginBottom: "1rem" }}>
        Copy to Clipboard
      </button>

      {showCopied && (
        <p
          style={{
            color: "lightgreen",
            marginBottom: "1rem",
            opacity: copied ? 1 : 0,
            transform: copied ? "translateY(0px)" : "translateY(-5px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          Copied to clipboard!
        </p>
      )}

      <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
        {acts.map((act) => (
          <div key={act.id} style={{ marginBottom: "1.5rem" }}>
            <h3>{act.title}</h3>

            {act.fields.map((field) => (
              <p key={field.id}>
                <strong>{field.label}</strong> {formData[field.id] || "[...]"}
              </p>
            ))}
          </div>
        ))}
      </div>

      {clearTarget && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #555",
              borderRadius: "8px",
              padding: "1.5rem",
              maxWidth: "420px",
              width: "100%",
            }}
          >
            <h2>Confirm Clear</h2>

            <p>
              {clearTarget.type === "all"
                ? "This will clear every field in every act."
                : `This will clear every field in ${clearTarget.actTitle}.`}
            </p>

            <p style={{ opacity: 0.7 }}>This cannot be undone.</p>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button onClick={confirmClear}>Yes, Clear</button>
              <button onClick={() => setClearTarget(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
