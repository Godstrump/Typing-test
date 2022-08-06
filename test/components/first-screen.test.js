import React from "react";
import { render, screen } from "../test-utils";
import FirstScreen from "../../components/first-screen.component";
import Timer from '../../components/timer.component'
import TestScreen from '../../components/test-screen.component'
import userEvent from '@testing-library/user-event';

const timeData = [
  { id: 1, title: '1 minute', value: 1},
  { id: 2, title: '2 minutes', value: 2},
  { id: 3, title: '3 minutes', value: 3},
  { id: 4, title: '4 minutes', value: 4},
  { id: 5, title: '5 minutes', value: 5},
  { id: 6, title: '10 minutes', value: 10},
  { id: 7, title: 'Add Custom time', value: 77},
]

describe("Heading", () => {
  it("should render the heading", () => {
    const textToFind = "Check your typing skills"

    render(<FirstScreen />);
    const heading = screen.getByText(textToFind);

    expect(heading).toBeInTheDocument();
  });
});

describe("Selectors and Button", () => {
  it("should render the following elements", () => {

    render(<FirstScreen />);
    
    expect(screen.getByTestId("time-selector")).toBeInTheDocument();
    expect(screen.getByTestId("paragraph-selector")).toBeInTheDocument();
    expect(screen.getByTestId("start-button")).toBeInTheDocument();
  });
});

describe("Selectors and Inputs", () => {
  it("should render the following elements", () => {

    test = {
      paragraph: `66`,
      minutes: 77
    }

    render(<FirstScreen test={test}/>);
    
    expect(screen.getByTestId("time-selector")).toBeInTheDocument();
    expect(screen.getByTestId("time-input")).toBeInTheDocument();
    expect(screen.getByTestId("paragraph-selector")).toBeInTheDocument();
    expect(screen.getByTestId("paragraph-input")).toBeInTheDocument();
    expect(screen.getByTestId("start-button")).toBeInTheDocument();
  });
});

describe("Timer", () => {
  it("should render timer", () => {
    const textToFind = '0:00'

    render(<Timer/>);
    
    expect(screen.getByTestId("timer")).toBeInTheDocument();
    expect(screen.getByTestId('time')).toHaveTextContent(textToFind);
  });
});

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

describe("Entered Text", () => {
  it("should render the following elements", () => {
    test = {
      paragraph: 'He heard the song coming from a distance, lightly floating over the air to his ears. Although it was soft and calming, he was wary. It seemed a little too soft and a little too calming for everything that was going on. He wanted it to be nothing more than beautiful music coming from the innocent and pure joy of singing, but in the back of his mind, he knew it was likely some type of trap.',
      minutes: 2
    }
    
    render(<FirstScreen test={test} />);
    render(<TestScreen testData={test.paragraph} startTest={true} />)
    
    const startBtn = screen.getByTestId("start-button")
    const typedText = screen.getByTestId('typing')
    
    startBtn.click();
    userEvent.type(typedText, 'He heard the song');
  
    expect(typedText).toHaveValue("He heard the song");
  });
});

describe("Typing test", () => {
  it("should render the following elements", () => {
    
    test = {
      paragraph: 'He heard the song coming from a distance, lightly floating over the air to his ears. Although it was soft and calming, he was wary. It seemed a little too soft and a little too calming for everything that was going on. He wanted it to be nothing more than beautiful music coming from the innocent and pure joy of singing, but in the back of his mind, he knew it was likely some type of trap.',
      minutes: 2
    }

    render(<FirstScreen test={test} />);
    render(<TestScreen testData={test.paragraph} startTest={true} />)
    
    const startBtn = screen.getByTestId("start-button")
    const typedText = screen.getByTestId('typing')
    const pars = test.paragraph.split(' ')
    
    startBtn.click();
    fireEvent.change(typedText, { target: { value: 'He heard the song' } });
    entere
  
    expect(screen.getByTestId("paragraphs")).toHaveTextContent(test.paragraph.replace(/ /g,''));
  });
});
