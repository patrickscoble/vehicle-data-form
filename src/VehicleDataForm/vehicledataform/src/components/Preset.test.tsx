import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Preset } from "./Preset";

describe("Preset Component", () => {
  it("should render button with label", () => {
    render(
      <Preset
        label="Select Preset"
        presetValues={["Ford", "Ranger", "Raptor"]}
        handlePreset={jest.fn()}
      />,
    );

    // Check if the button renders with the correct label text
    expect(screen.getByText("Select Preset")).toBeInTheDocument();
  });

  it("should call handlePreset with correct arguments on button click", () => {
    const handlePresetMock = jest.fn();

    render(
      <Preset
        label="Select Preset"
        presetValues={["Ford", "Ranger", "Raptor"]}
        handlePreset={handlePresetMock}
      />,
    );

    // Simulate button click
    fireEvent.click(screen.getByText("Select Preset"));

    // Assert that handlePreset was called with the correct values
    expect(handlePresetMock).toHaveBeenCalledWith("Ford", "Ranger", "Raptor");
    expect(handlePresetMock).toHaveBeenCalledTimes(1); // It should be called once on the click
  });
});
