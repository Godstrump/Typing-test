import TextInput from './text-input.component';
import { TestContainer, ParagraphContainer, TestParagraph } from '../utils/elements'


const TestScreen = ({ testData, startTest, enteredText, textValue, handleOnChange, isDisabled, label, errors }) =>  (
    <>
        {
            !!startTest ? 
            <TestContainer>
                <ParagraphContainer data-testid="paragraphs">
                    {
                        testData.split(' ').map((word, i) => 
                            <TestParagraph texts={enteredText[1]} words={word} key={i}>{word}</TestParagraph>
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
                    width="65%"
                    paragraphData={testData}
                    startTest={startTest}
                    testId="typing"
                />
            </TestContainer>  
            : ''
        }
    </>
)

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