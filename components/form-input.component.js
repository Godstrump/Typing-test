import { styled } from '@mui/system'

const Input = styled('input')(({ errors }) => ({
    width: 60,
    height: 60,
    outline: 'none',
    fontSize: 27,
    textAlign: 'center',
    border: `1.9px solid ${errors ? 'red' : 'black'}`
}))

const FormInput = ({ handleOnChange, inputType, inputName, inputValue, inputPh, errors, testId }) => {
    return (
        <Input data-testid={testId} errors={errors} type={inputType} placeholder={inputPh} value={inputValue ?? ''} name={inputName} onChange={handleOnChange} />
    )
}

FormInput.defaultProps = {
    inputType: 'text',
    inputName: '',
    inputValue: '',
    inputPh: '',
    errors: null,
    testId: '',
}

export default FormInput;