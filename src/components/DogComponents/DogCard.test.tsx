import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DogCard from "./DogCard";
import { Provider } from "jotai";
import "@testing-library/jest-dom";

const mockDog = {
  breed: "Golden Retriever",
  imageUrl: "https://example.com/dog.jpg",
  name: "Buddy",
  age: 3,
  id: "1",
  location: {
    city: "New York",
    state: "NY",
    zip_code: "",
    latitude: 0,
    longitude: 0,
    county: "",
  },
};

describe("DogCard Component", () => {
  test("renders the DogCard with correct text and image", () => {
    render(
      <Provider>
        <DogCard {...mockDog} />
      </Provider>
    );
    expect(screen.getByText("Golden Retriever")).toBeInTheDocument();
    expect(screen.getByText("Name: Buddy")).toBeInTheDocument();
  });

  test("toggles favorite state on button click", () => {
    render(
      <Provider>
        <DogCard {...mockDog} />
      </Provider>
    );

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);
    expect(screen.getByTestId("FavoriteIcon")).toBeInTheDocument();
  });
});
