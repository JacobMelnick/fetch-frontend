import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LocationSearch from "./LocationSearch";
import { DogService } from "@/api/services/DogService";
import { Provider } from "jotai";

jest.mock("@/api/services/DogService");

jest.mock("jotai", () => ({
  ...jest.requireActual("jotai"),
  useAtom: jest.fn().mockReturnValue([[], jest.fn()]),
}));

describe("LocationSearch Component", () => {
  let mockFetchDogsByLocation: jest.Mock;

  beforeEach(() => {
    mockFetchDogsByLocation = DogService.fetchDogsByLocation as jest.Mock;
  });

  const renderComponent = () => {
    render(
      <Provider>
        <LocationSearch />
      </Provider>
    );
  };

  it("renders input fields and buttons correctly", () => {
    renderComponent();

    expect(screen.getByLabelText(/City/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select States/)).toBeInTheDocument();
    expect(screen.getByText(/Search Your Area/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/ })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /RestartAltIcon/ })
    ).toBeInTheDocument();
  });

  it("handles city input change", () => {
    renderComponent();

    const cityInput = screen.getByLabelText(/City/);
    fireEvent.change(cityInput, { target: { value: "New York" } });

    expect(cityInput).toHaveValue("New York");
  });

  it("calls fetchDogsByLocation when search button is clicked", async () => {
    renderComponent();

    const cityInput = screen.getByLabelText(/City/);
    const searchButton = screen.getByRole("button", { name: /Search/ });

    fireEvent.change(cityInput, { target: { value: "New York" } });

    mockFetchDogsByLocation.mockResolvedValueOnce({
      results: [{ zip_code: "10001" }],
    });

    fireEvent.click(searchButton);

    await waitFor(() =>
      expect(mockFetchDogsByLocation).toHaveBeenCalledTimes(1)
    );
    expect(mockFetchDogsByLocation).toHaveBeenCalledWith("New York", []);
  });
});
