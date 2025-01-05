import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Form } from "./Form";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Form Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Make dropdown and submit button", () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>,
    );

    expect(screen.getByText("Select Make")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("selecting Make updates the state and renders the Model dropdown", () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("combobox", { name: "Make" }), {
      target: { value: "Ford" },
    });

    expect(screen.getByText("Select Model")).toBeInTheDocument();
  });

  test("clicking a Preset button sets form values", () => {
    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText("Ford Ranger Raptor"));

    expect(screen.getByRole("combobox", { name: "Make" })).toHaveValue("Ford");
    expect(screen.getByRole("combobox", { name: "Model" })).toHaveValue(
      "Ranger",
    );
    expect(screen.getByRole("combobox", { name: "Badge" })).toHaveValue(
      "Raptor",
    );
  });

  test("form submission calls fetch with form data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            message: "Success",
          }),
      }),
    ) as jest.Mock;

    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>,
    );

    // Set form fields
    fireEvent.change(screen.getByRole("combobox", { name: "Make" }), {
      target: { value: "Ford" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "Model" }), {
      target: { value: "Ranger" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "Badge" }), {
      target: { value: "Raptor" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Assert fetch is called correctly
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/submit",
        expect.any(Object),
      ),
    );
  });

  test("shows alert when required fields are missing", () => {
    global.alert = jest.fn();

    render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>,
    );

    // Submit without filling required fields
    fireEvent.click(screen.getByText("Submit"));

    expect(global.alert).toHaveBeenCalledWith("Please complete the form.");
  });
});
