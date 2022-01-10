import {render, screen, fireEvent} from "@testing-library/react";
import Game from "../Game";
import { act } from "react-dom/test-utils";
import {log} from "util";

describe("Square:",()=>{

    it("should render all squares initially without content",()=>{
       act(()=>{
            render(<Game/>);
        })
        const buttonElements = screen.getAllByRole("button");
        const squares = buttonElements.filter(button => button.classList.contains("square"));
        squares.forEach(square => expect(square.textContent).toBe(""));
    });

    it("should render next players sign after clicking it, when it's clicked for the first time", ()=>{
        act(()=>{
            render(<Game/>);
        })
        const buttonElements = screen.getAllByRole("button");
        const squares = buttonElements.filter(button => button.classList.contains("square"));
        const divElement = screen.getByText(/next player/i);
        const nextPlayer = divElement.textContent.slice(-1);
        act(()=>{
            fireEvent.click(squares[0]);
        })
        expect(squares[0].textContent).toBe(nextPlayer);
    })

    it("should not change it's content after clicking it, if square was already clicked", ()=>{
        act(()=>{
            render(<Game/>);
        })
        const buttonElements = screen.getAllByRole("button");
        const squares = buttonElements.filter(button => {
            return button.classList.contains("square");
        });
        act(()=>{
            fireEvent.click(squares[0]);
        })
        const squareText = squares[0].textContent;
        act(()=>{
            fireEvent.click(squares[0]);
        })
        expect(squares[0].textContent).toBe(squareText);
    })
});

describe ("Game info",()=>{
    it(('should render "Go to game start" button when loading'),()=>{
        act(()=>{
            render(<Game/>);
        })
        const buttonElements = screen.getByText(/go to game start/i);
        expect(buttonElements).toBeInTheDocument();
    });

    it('should rerender the board to the initial state after clicking the "Go to game start"',()=>{
        act(()=>{
            render(<Game/>);
        })
        const squares = screen.getAllByTestId("square");
        act(()=>{
            fireEvent.click(squares[0]);
        })
        const goToStartButton = screen.getByRole("button", {name:/go to game start/i});
        act(()=>{
            fireEvent.click(goToStartButton);
        })
        squares.forEach(square => expect(square.textContent).toBe(""));
    });
})
