import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerResponse, vehicleData } from "../types/types";
import { Dropdown } from "./Dropdown";
import "./Form.css";
import { Preset } from "./Preset";

export const Form: React.FC = () => {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedBadge, setSelectedBadge] = useState<string>("");
  const [logbookFile, setLogbookFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleLogbookUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setLogbookFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedMake || !selectedModel || !selectedBadge) {
      alert("Please complete the form.");
      return;
    }

    const formData = new FormData();
    formData.append("make", selectedMake);
    formData.append("model", selectedModel);
    formData.append("badge", selectedBadge);

    if (logbookFile) {
      formData.append("logbook", logbookFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data: ServerResponse = await res.json();
        navigate("/upload", { state: { data } });
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  const handlePreset = (
    presetMake: string,
    presetModel: string,
    presetBadge: string,
  ) => {
    setSelectedMake(presetMake);
    setSelectedModel(presetModel);
    setSelectedBadge(presetBadge);
  };

  return (
    <div>
      <h1>Drill Down Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Make Selection */}
        <Dropdown
          label="Make"
          options={Object.keys(vehicleData)}
          value={selectedMake}
          onChange={(value) => {
            setSelectedMake(value);
            setSelectedModel(""); // Reset Model and Badge when Make changes
            setSelectedBadge("");
          }}
        />

        {/* Model Selection */}
        {selectedMake && (
          <Dropdown
            label="Model"
            options={Object.keys(vehicleData[selectedMake].models)}
            value={selectedModel}
            onChange={(value) => {
              setSelectedModel(value);
              setSelectedBadge("");
            }}
          />
        )}

        {/* Badge Selection */}
        {selectedModel && (
          <Dropdown
            label="Badge"
            options={vehicleData[selectedMake]?.models[selectedModel]}
            value={selectedBadge}
            onChange={setSelectedBadge}
          />
        )}

        {/* File Upload */}
        {selectedBadge && (
          <div>
            <h3>Upload Logbook:</h3>

            <input type="file" accept=".txt" onChange={handleLogbookUpload} />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>

      <h2>Select a Vehicle</h2>

      <div className="preset-buttons">
        <Preset
          label="Ford Ranger Raptor"
          presetValues={["Ford", "Ranger", "Raptor"]}
          handlePreset={handlePreset}
        />

        <Preset
          label="Tesla Model 3 Performance"
          presetValues={["Tesla", "Model 3", "Performance"]}
          handlePreset={handlePreset}
        />
      </div>
    </div>
  );
};
