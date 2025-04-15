import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("Weather App (real API)", () => {
  test("renders search form", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/введите город/i)).toBeInTheDocument();
    expect(screen.getByText(/🔍 Искать/i)).toBeInTheDocument();
  });

  test("renders default weather", () => {
    render(<App />);
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(screen.getByText(/Температура/i)).toBeInTheDocument();
    expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
  });

  test("updates weather on real API request", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/введите город/i);
    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(screen.getByText(/🔍 Искать/i));

    await waitFor(() => {
      expect(screen.getByText(/London/i)).toBeInTheDocument();
    });
  });

  test("renders forecast box", () => {
    render(<App />);
    expect(screen.getByText(/Прогноз на 3 дня/i)).toBeInTheDocument();
  });

  test("renders forecast list items", async () => {
    render(<App />);
      expect(screen.getByText(/Завтра/i)).toBeInTheDocument();
      expect(screen.getByText(/Послезавтра/i)).toBeInTheDocument();
      expect(screen.getByText(/Через 3 дня/i)).toBeInTheDocument();
    });

  test("renders city list", () => {
    render(<App />);
    expect(screen.getByText(/Список городов/i)).toBeInTheDocument();
    expect(screen.getByText(/Moscow/i)).toBeInTheDocument();
    expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();
  });

  test("renders sidebar info", () => {
    render(<App />);
    expect(screen.getByText(/Дополнительная информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Влажность/i)).toBeInTheDocument();
    expect(screen.getByText(/Давление/i)).toBeInTheDocument();
  });

  test("renders weather card elements", () => {
    render(<App />);
    expect(screen.getByText(/Температура/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Ветер/i)).toBeInTheDocument();
  });

  test("renders bottom box", () => {
    render(<App />);
    expect(screen.getByText(/Советы по погоде/i)).toBeInTheDocument();
    expect(screen.getByText(/Одевайтесь по погоде/i)).toBeInTheDocument();
  });
});
