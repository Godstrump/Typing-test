import TextInput from './text-input.component';
import { TestContainer, ParagraphContainer, TestParagraph } from '../utils/elements'


const correct = {
    color: 'green',
    fontWeight: 500
}

const pending = {
    color: 'black'
}

const inCorrect = {
    color: 'red',
    fontWeight: 400
}

const TestScreen = ({ testData, startTest, enteredText, textValue, handleOnChange, isDisabled, label, errors, }) =>  {

    const isMatch = (word, i) => {
        if (!enteredText[i]) return pending
        if (enteredText[i] === word) return correct
        else return inCorrect
    }

    return (
        <>
            {
                !!startTest ? 
                <TestContainer>
                    <ParagraphContainer data-testid="paragraphs">
                        {
                            testData.split(' ').map((word, i) => 
                                <TestParagraph style={isMatch(word, i)} key={i}>{word.trim()}</TestParagraph>
                            )
                        }
                    </ParagraphContainer>
                    <TextInput 
                        fullWidth
                        textValue={textValue}
                        handleOnChange={(e) => handleOnChange(e)}
                        size="small"
                        id="outlined-basic"
                        label={label}
                        variant="outlined"
                        isDisabled={isDisabled}
                        error={errors}
                        width="66vw"
                        paragraphData={testData}
                        startTest={startTest}
                        testId="typing"
                    />
                </TestContainer>  
                : ''
            }
        </>
    )
}

TestScreen.defaultProps = {
    label: '',
    textValue: '',
    isDisabled: false,
    testData: [],
    startTest: false,
    enteredText: [],
    errors: {}
}

export default TestScreen