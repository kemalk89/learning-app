import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./../page";

describe("Math Page ", () => {
  const getInputField = () => screen.getByRole("spinbutton");

  it("should move to next task", () => {
    render(<Page />);

    expect(getInputField()).not.toHaveClass("input-invalid");

    const num1 = parseInt(screen.getByTestId("num1").innerHTML);
    const num2 = parseInt(screen.getByTestId("num2").innerHTML);
    const answer = num1 + num2;

    fireEvent.change(getInputField(), {
      target: { value: answer.toString() },
    });

    const nextBtn = screen.getByRole("button", { name: "Weiter" });
    fireEvent.click(nextBtn);

    expect(getInputField()).toHaveClass("input-invalid");
  });

  it("should NOT move to next task if incorrect answer given", () => {
    render(<Page />);

    expect(getInputField()).not.toHaveClass("input-invalid");

    const num1 = parseInt(screen.getByTestId("num1").innerHTML);
    const num2 = parseInt(screen.getByTestId("num2").innerHTML);
    const incorrectAnswer = num1 + num2 - 1;

    fireEvent.change(getInputField(), {
      target: { value: incorrectAnswer.toString() },
    });

    const nextBtn = screen.getByRole("button", { name: "Weiter" });
    fireEvent.click(nextBtn);

    expect(getInputField()).toHaveClass("input-invalid");
  });
});
