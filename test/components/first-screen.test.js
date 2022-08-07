import React from "react";
import { render, screen, fireEvent } from "../test-utils";
import FirstScreen from "../../components/first-screen.component";
import Timer from '../../components/timer.component'
import TestScreen from '../../components/test-screen.component'
import userEvent from '@testing-library/user-event';
import { TextField } from '@mui/material';
import Home from '../../pages/index'
import TextInput from '../../components/text-input.component';

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

const inputMock = jest.fn();

const Test = () => (
  <TextField
    data-testid={name}
    variant="outlined"
    error={false}
    required
    onChange={inputMock}
    name={name}
    label={'label'}
    defaultValue={'4711'}
    placeholder={'Enter Number'}
    fullWidth
    multiline={true}
  />
);

describe("Test TextField", () => {
  it('Input', () => {
    const container = render(<Test />);

    const input = container.getByDisplayValue('4711');

    fireEvent.change(input, { target: { value: 'He heard the song' } });
    expect(input.value).toBe('He heard the song');
    // expect(inputMock.mock.calls).toHaveLength(1);
  })
});

describe("Test paragraph TextField", () => {
  it("should render the following elements in first screen component", async () => {
    test = {
      paragraph: `66`,
      minutes: 2
    }

    const change = jest.fn()
    
    render(<Home />)
    render(<TextInput handleOnChange={change} />)
    const container = render(<FirstScreen handleParagragh={change} test={test} />);
    
    const textarea = container.getByDisplayValue('5770');

    fireEvent.change(textarea, { target: { value: 'He heard the song' } });
    expect(textarea.value).toBe('He heard the song');
  });
});


// describe("Typing test", () => {
//   it("should render the following elements", () => {
    
//     test = {
//       paragraph: 'He heard the song',
//       minutes: 2
//     }

//     render(<FirstScreen test={test} />);
//     render(<TestScreen testData={test.paragraph} startTest={true} />)
    
//     const startBtn = screen.getByTestId("start-button")
//     startBtn.click();
    
//     const typedText = screen.getByTestId('typing')
//     const pars = test.paragraph.split(' ')
    
//     fireEvent.change(typedText, { target: { value: 'He heard the song' } });
//     const enteredText = typedText.value
  
//     expect(screen.getByTestId("paragraphs")).toHaveTextContent(test.paragraph.replace(/ /g,''));
//   });
// });
