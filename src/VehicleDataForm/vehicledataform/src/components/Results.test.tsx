import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ServerResponse } from "../types/types";
import { Results } from "./Results";

const mockLocation = (responseData: ServerResponse) => ({
  state: {
    data: responseData,
  },
});

describe("Results component", () => {
  it("renders correctly with valid data", () => {
    const response: ServerResponse = {
      make: "Ford",
      model: "Ranger",
      badge: "Raptor",
      logbook: "Logbook content goes here...",
    };

    render(
      <MemoryRouter initialEntries={[{ state: { data: response } }]}>
        <Results />
      </MemoryRouter>,
    );

    expect(screen.getByText("Make: Ford")).toBeInTheDocument();
    expect(screen.getByText("Model: Ranger")).toBeInTheDocument();
    expect(screen.getByText("Badge: Raptor")).toBeInTheDocument();
    expect(screen.getByText(/Logbook:/)).toBeInTheDocument();
    expect(
      screen.getByText("Logbook content goes here..."),
    ).toBeInTheDocument();
  });

  it("renders message when no response data is passed", () => {
    const emptyResponse: ServerResponse = {
      make: "",
      model: "",
      badge: "",
      logbook: "",
    };

    render(
      <MemoryRouter>
        <Results />
      </MemoryRouter>,
    );

    // Push state with empty data into history to simulate no response data
    window.history.pushState(mockLocation(emptyResponse), "");

    expect(
      screen.getByText(
        "No response found. Please return to the form and submit your data.",
      ),
    ).toBeInTheDocument();
  });
});
