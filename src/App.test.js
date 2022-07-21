import { fireEvent, render, screen } from "@testing-library/react";
import Map from "./components/Map";
import { geoJSONData, geoJSONDataNoTerminals } from "./mocks";

const requestNewAreaMock = () => {};

describe("Map", () => {
  it("should not show an error if the user input is in the right format", () => {
    render(<Map loading={false} requestNewArea={requestNewAreaMock} />);
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Go!");

    fireEvent.change(input, {
      target: { value: "13.436046,52.347897,13.550201,52.389717" },
    });
    fireEvent.click(button);

    expect(
      screen.queryByText("Coordinate format invalid.")
    ).not.toBeInTheDocument();
  });

  it("should show an error if the user input is in the wrong format", () => {
    render(<Map loading={false} requestNewArea={requestNewAreaMock} />);
    const input = screen.getByRole("textbox");
    const button = screen.getByText("Go!");

    fireEvent.change(input, { target: { value: "33,45" } });
    fireEvent.click(button);

    expect(screen.getByText("Coordinate format invalid.")).toBeInTheDocument();
  });

  it("should not show an error if there at least one terminal in the area selected", () => {
    render(
      <Map
        geoJSONData={geoJSONData}
        loading={false}
        requestNewArea={requestNewAreaMock}
      />
    );

    expect(
      screen.queryByText("No terminals found in this area.")
    ).not.toBeInTheDocument();
  });

  it("should show an error if there is no terminals in the area selected", () => {
    render(
      <Map
        geoJSONData={geoJSONDataNoTerminals}
        loading={false}
        requestNewArea={requestNewAreaMock}
      />
    );

    expect(
      screen.getByText("No terminals found in this area.")
    ).toBeInTheDocument();
  });

  it("should show a loading text when loading = true", () => {
    render(<Map loading={true} requestNewArea={requestNewAreaMock} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
