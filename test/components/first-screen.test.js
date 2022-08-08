import React from "react";
import { render, screen, fireEvent } from "../test-utils";
import FirstScreen from "../../components/first-screen.component";
import { TextField } from '@mui/material';
import Home from '../../pages/index'
import TextInput from '../../components/text-input.component';


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

describe("Test paragraph TextField", () => {
  it("should render the following elements in first screen component", async () => {
    test = {
      paragraph: `66`,
      minutes: 2
    }

    const change = jest.fn()
    
    render(<Home />)
    render(<TextInput handleOnChange={change} />)
    const container = render(<FirstScreen paragraph={'He heard the song'} handleParagragh={change} test={test} />);
    
    const textarea = container.getByLabelText('Paragraph');

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
