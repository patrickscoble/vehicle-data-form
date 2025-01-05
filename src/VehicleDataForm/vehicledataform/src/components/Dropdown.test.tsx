import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

describe("Dropdown Component", () => {
  test("renders correctly", () => {
    render(
      <Dropdown
        label="Make"
        options={["Ford", "Tesla", "BMW"]}
        value="Ford"
        onChange={() => {}}
      />,
    );

    // Check if dropdown options are visible
    expect(screen.getByText("Ford")).toBeInTheDocument();
    expect(screen.getByText("Tesla")).toBeInTheDocument();
    expect(screen.getByText("BMW")).toBeInTheDocument();
  });

  test("calls onChange when an option is selected", () => {
    const mockOnChange = jest.fn();

    render(
      <Dropdown
        label="Make"
        options={["Ford", "Tesla", "BMW"]}
        value="Ford"
        onChange={mockOnChange}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Tesla" } }); // Simulate selecting an option

    // Assert that onChange has been called with 'Tesla'
    expect(mockOnChange).toHaveBeenCalledWith("Tesla");
  });
});
