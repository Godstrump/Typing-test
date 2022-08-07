import Selector from './selector.component'
import FormInput from './form-input.component';
import TextInput from './text-input.component';
import { XButton, Title, Form, InputBox } from '../utils/elements'



const FirstScreen = ({ errors, test, handleSelectChange, startTest, handleInputChange, time, paragraphData, paragraph, handleParagragh, start, timeData }) => (
        <>
            {
                !startTest ? 
                <>
                    <Title>Check your typing skills</Title>
                    <Form>
                        <Form>
                        <Selector testId="time-selector" errors={errors['minutes']} data={timeData} label="Pick Time" name="minutes" value={test.minutes} handleChange={handleSelectChange} />
                        {
                            test.minutes === 77 ? (
                            <InputBox component="div" data-testid="time-input">
                                <FormInput testId="minutes-input" errors={errors['error']} handleOnChange={handleInputChange} inputType="number"inputName="mins" inputValue={time.mins} inputPh="M" />:
                                <FormInput testId="seconds-input" errors={errors['error']} handleOnChange={handleInputChange} inputType="number"inputName="secs" inputValue={time.secs} inputPh="S" />
                            </InputBox>
                            ) : ''
                        }
                        </Form>
                        <Form>
                            <Selector testId="paragraph-selector" errors={errors['paragraph']} data={paragraphData} label="Pick Paragraph" name="paragraph" value={test.paragraph} handleChange={handleSelectChange} />
                            {
                                +test.paragraph === 66 ? (
                                <InputBox component="div" data-testid="paragraph-input">
                                    <TextInput textValue={paragraph} label="Paragraph" handleOnChange={handleParagragh} width='40%' minrows={8} />
                                </InputBox>
                                ) : ''
                            }
                        </Form>
                        <XButton data-testid="start-button" variant="contained" color="success" onClick={start}>Start</XButton>
                    </Form> 
                </>: ''
            }
        </>
)

FirstScreen.defaultProps = {
    errors: {},
    test: {},
    startTest: false,
    time: {},
    paragraphData: [],
    paragraph: '',
    timeData: []
}

export default FirstScreen;