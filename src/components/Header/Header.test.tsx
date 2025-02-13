import { render, screen } from "@testing-library/react";
import Header from "./Header";

jest.mock("@/api/services/AuthService", () => ({
  AuthService: {
    logout: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Header Component", () => {
  it("renders the header with the logo, title, and buttons", () => {
    render(<Header />);

    const logoImage = screen.getByAltText("Logo");
    expect(logoImage).toBeInTheDocument();

    const headerTitle = screen.getByText("White Oak Adoption Center");
    expect(headerTitle).toBeInTheDocument();

    const homeButton = screen.getByText("Home");
    const favoritesButton = screen.getByText("Favorites");
    expect(homeButton).toBeInTheDocument();
    expect(favoritesButton).toBeInTheDocument();
  });
});
