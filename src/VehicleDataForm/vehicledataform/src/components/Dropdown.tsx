import "./Dropdown.css";

export const Dropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}> = ({ label, options, value, onChange }) => (
  <div>
    <select
      className="dropdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
