export const Preset: React.FC<{
  label: string; // Button text
  presetValues: [string, string, string]; // [make, model, badge]
  handlePreset: (make: string, model: string, badge: string) => void;
}> = ({ handlePreset, label, presetValues }) => {
  return (
    <button type="button" onClick={() => handlePreset(...presetValues)}>
      {label}
    </button>
  );
};
