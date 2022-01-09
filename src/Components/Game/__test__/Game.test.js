import {render, screen, fireEvent} from "@testing-library/react";
import Game from "../Game";
import { act } from "react-dom/test-utils";
import {log} from "util";

describe("Square:",()=>{

    it("should render all squares initially without content",()=>{
        render(<Game/>);
        const buttonElements = screen.getAllByRole("button");
        const squares = buttonElements.filter(button => button.classList.contains("square"));
        squares.forEach(square => expect(square.textContent).toBe(""));
    });

    it("should render next players sign after clicking it, when it's clicked for the first time", ()=>{
        render(<Game/>);
        const buttonElements = screen.getAllByRole("button");
        const squares = buttonElements.filter(button => button.classList.contains("square"));
        const divElement = screen.getByText(/next player/i);
        const nextPlayer = divElement.textContent.slice(-1);
        fireEvent.click(squares[0]);
        expect(squares[0].textContent).toBe(nextPlayer);
    })

    it("should not change it's content after clicking it, if square was already clicked", ()=>{
        render(<Game/>);
        const buttonElements = screen.getAllByRole("button");
        const squares = buttonElements.filter(button => {
            return button.classList.contains("square");
        });
        fireEvent.click(squares[0]);
        const squareText = squares[0].textContent;
        fireEvent.click(squares[0]);
        expect(squares[0].textContent).toBe(squareText);
    })
});

describe ("Game info",()=>{
    it(('should render "Go to game start" button when loading'),()=>{
        render(<Game/>);
        const buttonElements = screen.getByText(/go to game start/i);
        expect(buttonElements).toBeInTheDocument();
    });

    it('should rerender the board to the initial state after clicking the "Go to game start"',()=>{
        render(<Game/>);
        const buttonElements = screen.getAllByRole("button");
        const squares = buttonElements.filter(button => button.classList.contains("square"));
        fireEvent.click(squares[0]);
        const goToStartButton = buttonElements.find(button => button.textContent === "Go to game start");
        fireEvent.click(goToStartButton);
        squares.forEach(square => expect(square.textContent).toBe(""));
    });
})
