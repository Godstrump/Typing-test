import React from "react";
import { render, screen, fireEvent } from "../test-utils";
import FirstScreen from "../../components/first-screen.component";
import TestScreen from '../../components/test-screen.component'
import Timer from '../../components/timer.component'
import SuccessModal from '../../components/success-modal.component'
import Scores from '../../components/scores.component'
import {renderHook} from '@testing-library/react'

  describe("Modal component", () => {
    it("should render the following elements in test screen and modal component", async () => {
      test = {
        paragraph: `He heard the song`,
        minutes: 2
      }
  
      const change = jest.fn()
      const changeTest = jest.fn()
      const timeUp = jest.fn()
      const restart = jest.fn()
      const ref = {
        current: {
            selectTimer: jest.fn()
        }
    }

    const modalRef = {
        current: {
            openModal: jest.fn(),
            setModalText: jest.fn()
        }
    }

    const charts = {
        speed: '8 WPM',
        accuracy: '100%',
        points: 4,
        words: test.paragraph.split(' ').length,
        mins: 0,
        secs: '00',
        timeTaken: ''
    }
      
      render(<FirstScreen handleParagragh={change} test={test} />);
      const startBtn = screen.getByTestId("start-button")
      render(<TestScreen textValue={test.paragraph} handleOnChange={changeTest} testData={test.paragraph} startTest={true} />)
      render(<Timer ref={ref} timeup={timeUp} />)
      renderHook(() => ref.current.selectTimer(test.minutes))
      render(<Scores startTest={true} points={4} test={test} paragraph={test.paragraph}/>)
      render(<SuccessModal reStart={restart} ref={modalRef}/>)
      
      startBtn.click();
      
      const typedText = screen.getByTestId('typing')
      const field  = typedText.querySelector('textarea')
      const scores = screen.getByTestId('score-points')
  
      fireEvent.change(field, { target: { value: 'He heard the song' } });
      expect(screen.getByTestId("paragraphs")).toHaveTextContent(test.paragraph.replace(/ /g,''));
      expect(field.value).toBe('He heard the song');
      expect(scores).toBeInTheDocument()
      expect(scores).toHaveTextContent('4/4');

      const fieldValue = field.value.split(' ')
      const par = test.paragraph.split(' ')
      expect(fieldValue[0]).toEqual(par[0])
      expect(fieldValue.length).toEqual(par.length)
      renderHook(() => modalRef.current.openModal())
      renderHook(() => modalRef.current.setModalText({ ...charts }))

      expect(screen.getByTestId('speed')).toBeInTheDocument()
      expect(screen.getByTestId('speed')).toHaveTextContent('8 WPM')
      expect(screen.getByTestId('accuracy')).toBeInTheDocument()
      expect(screen.getByTestId('accuracy')).toHaveTextContent('100%')

      const modalBtn = screen.getByTestId('modal-button')
      expect(modalBtn).toBeInTheDocument();
      modalBtn.click()
    });
  });
