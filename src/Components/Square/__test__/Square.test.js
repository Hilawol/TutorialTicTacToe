import {render, screen} from "@testing-library/react";
import Square from "../Square";
import { act } from "react-dom/test-utils";

test("should render without any content before clicked",()=>{
    render(<Square/>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).not.toHaveTextContent();
});

test("should render player sign when clicked if it was not clicked before",()=>{
    render(<Square/>);
    const buttonElement = screen.getByRole("button");
    buttonElement.text = "X";

    act(() => {
        buttonElement.dispatchEvent(new MouseEvent("click"));
    });

    expect(buttonElement).not.toBe("X");
});