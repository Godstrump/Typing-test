import React from "react";
import { render, screen, fireEvent } from "../test-utils";
import FirstScreen from "../../components/first-screen.component";
import TestScreen from '../../components/test-screen.component'
import Timer from '../../components/timer.component'
import SuccessModal from '../../components/success-modal.component'
import Scores from '../../components/scores.component'
import {renderHook} from '@testing-library/react'

  describe("Test paragraph TextField in the Test component", () => {
    it("should render the following elements in test screen component", async () => {
      test = {
        paragraph: `He heard the song`,
        minutes: 2
      }
  
      const change = jest.fn()
      const changeTest = jest.fn()
      const timeUp = jest.fn()
        const ref = {
            current: {
              selectTimer: jest.fn()
            }
        }
      
      render(<FirstScreen handleParagragh={change} test={test} />);
      const startBtn = screen.getByTestId("start-button")
      render(<TestScreen textValue={test.paragraph} handleOnChange={changeTest} testData={test.paragraph} startTest={true} />)
      render(<Timer ref={ref} timeup={timeUp} />)
      renderHook(() => ref.current.selectTimer(test.minutes))
      render(<Scores startTest={true} points={0} test={test} paragraph={test.paragraph}/>)
      
      startBtn.click();
      
      const typedText = screen.getByTestId('typing')
      const field  = typedText.querySelector('textarea')
  
      fireEvent.change(field, { target: { value: 'He heard the song' } });
      expect(screen.getByTestId("paragraphs")).toHaveTextContent(test.paragraph.replace(/ /g,''));
      expect(field.value).toBe('He heard the song');

      const fieldValue = field.value.split(' ')
      const par = test.paragraph.split(' ')
      expect(fieldValue[0]).toEqual(par[0])
      
    
      render(<SuccessModal />)
      const modalBtn = screen.getByTestId('modal-button')
      expect(modalBtn).toBeInTheDocument();
    });
  });
