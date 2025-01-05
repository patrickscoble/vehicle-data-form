import { useLocation } from "react-router-dom";
import { ServerResponse } from "../types/types";

export const Results: React.FC = () => {
  const location = useLocation();
  const response = location.state?.data as ServerResponse;

  return (
    <div>
      {response ? (
        <div>
          <div>
            Make: {response.make}
          </div>
          <div>
            Model: {response.model}
          </div>
          <div>
            Badge: {response.badge}
          </div>
          <p>Logbook:</p>
          <pre>{response.logbook}</pre>
        </div>
      ) : (
        <p>
          No response found. Please return to the form and submit your data.
        </p>
      )}
    </div>
  );
};
