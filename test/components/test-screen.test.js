import React from "react";
import { render, screen, fireEvent } from "../test-utils";
import FirstScreen from "../../components/first-screen.component";
import TestScreen from '../../components/test-screen.component'
import Timer from '../../components/timer.component'
import {renderHook} from '@testing-library/react'


describe("Paragraph Texts", () => {
  it("should render the following elements", () => {
    
    test = {
      paragraph: 'He heard the song coming from a distance, lightly floating over the air to his ears. Although it was soft and calming, he was wary. It seemed a little too soft and a little too calming for everything that was going on. He wanted it to be nothing more than beautiful music coming from the innocent and pure joy of singing, but in the back of his mind, he knew it was likely some type of trap.',
      minutes: 2
    }

    render(<FirstScreen test={test} />);
    render(<TestScreen testData={test.paragraph} startTest={true} />)
    
    const startBtn = screen.getByTestId("start-button")
    
    startBtn.click();
  
    expect(screen.getByTestId("paragraphs")).toHaveTextContent(test.paragraph.replace(/ /g,''));
  });
});

describe("Textarea Exist", () => {
  it("should render the following elements", () => {
    test = {
      paragraph: 'He heard the song coming from a distance, lightly floating over the air to his ears. Although it was soft and calming, he was wary. It seemed a little too soft and a little too calming for everything that was going on. He wanted it to be nothing more than beautiful music coming from the innocent and pure joy of singing, but in the back of his mind, he knew it was likely some type of trap.',
      minutes: 2
    }
    
    render(<FirstScreen test={test} />);
    render(<TestScreen testData={test.paragraph} startTest={true} />)
    
    const startBtn = screen.getByTestId("start-button")
    startBtn.click();
    const typedText = screen.getByTestId('typing')
    
    const field  = typedText.querySelector('textarea')
    expect(field).toBeInTheDocument()
  });
});


describe("Test timer", () => {
    it("should render the timer and the paragraphs", async () => {
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
        
        
        expect(screen.getByTestId('time')).toHaveTextContent('02:00');
        expect(screen.getByTestId("paragraphs")).toHaveTextContent(test.paragraph.replace(/ /g,''));
    });
  });

  describe("Test paragraph TextField in the Test component", () => {
    it("should render the following elements in test screen component", async () => {
      test = {
        paragraph: `He heard the song`,
        minutes: 2
      }
  
      const change = jest.fn()
      const changeTest = jest.fn()
      
      render(<FirstScreen handleParagragh={change} test={test} />);
      const startBtn = screen.getByTestId("start-button")
      render(<TestScreen textValue={test.paragraph} handleOnChange={changeTest} testData={test.paragraph} startTest={true} />)
      
      startBtn.click();
      
      const textarea = screen.getByTestId('typing');
  
      fireEvent.change(textarea, { target: { value: 'He heard the song' } });
      expect(screen.getByTestId("paragraphs")).toHaveTextContent(test.paragraph.replace(/ /g,''));
      expect(textarea.value).toBe('He heard the song');
    });
  });
