import React from "react";
import { render, screen, fireEvent } from "../test-utils";
import Timer from '../../components/timer.component'
import FirstScreen from "../../components/first-screen.component";
import TestScreen from '../../components/test-screen.component'
import {renderHook} from '@testing-library/react'


describe("Timer", () => {
  it("should render timer", () => {
    const textToFind = '0:00'

    render(<Timer/>);
    
    expect(screen.getByTestId("timer")).toBeInTheDocument();
    expect(screen.getByTestId('time')).toHaveTextContent(textToFind);
  });
});

describe("Test timer", () => {
    it("should render the inputed time", async () => {
        test = {
            paragraph: `He heard the song`,
            minutes: 2
        }

        const timeUp = jest.fn()
        const ref = {
            current: {
              selectTimer: jest.fn()
            }
        }

        render(<FirstScreen test={test} />);
        render(<TestScreen testData={test.paragraph} startTest={true} />)
        render(<Timer ref={ref} timeup={timeUp} />)
        renderHook(() => ref.current.selectTimer(2)) 
        
        const startBtn = screen.getByTestId("start-button")
        
        startBtn.click();
      
        expect(screen.getByTestId('time')).toHaveTextContent('02:00');
    });
  });

  describe("Test timer", () => {
    it("should start the timer", async () => {
        test = {
            paragraph: `He heard the song`,
            minutes: 2
        }

        const timeUp = jest.fn()
        const ref = {
            current: {
              selectTimer: jest.fn(),
              start: jest.fn()
            }
        }

        render(<FirstScreen test={test} />);
        render(<TestScreen testData={test.paragraph} startTest={true} />)
        render(<Timer ref={ref} timeup={timeUp} />)
        renderHook(() => ref.current.selectTimer(2)) 
        
        const startBtn = screen.getByTestId("start-button")
        
        startBtn.click();
        renderHook(() => ref.current.start()) 
      
        expect(screen.getByTestId('time')).toHaveTextContent('02:00');
    });
  });