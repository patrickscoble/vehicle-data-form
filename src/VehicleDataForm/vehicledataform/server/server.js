import cors from "cors";
import express from "express";
import fs from "fs/promises";
import multer from "multer";
import path from "path";

const __filename = path.resolve();
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

const upload = multer({ dest: "uploads/" });

// Serve static files from React app
app.use(express.static(path.join(__dirname, "../build")));

// API endpoint example
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Node.js server!" });
});

// Handle form submission
app.post("/api/submit", upload.single("logbook"), async (req, res) => {
  const { make, model, badge } = req.body;
  const logbookFile = req.file;

  if (!make || !model || !badge) {
    return res.status(400).json({ error: "Incomplete form submission" });
  }

  if (logbookFile) {
    try {
      const logbookContents = await fs.readFile(logbookFile.path, "utf-8");
      await fs.unlink(logbookFile.path);

      res.json({
        make,
        model,
        badge,
        logbook: logbookContents,
      });
    } catch (err) {
      console.error("Error reading logbook file:", err);
      res.status(500).json({ error: "Failed to process logbook file" });
    }
  } else {
    res.json({
      make,
      model,
      badge,
      logbook: "No logbook uploaded.",
    });
  }
});

// Catch-all for React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
