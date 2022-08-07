import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';


const MultilineField = styled(TextField)(({ fieldwidth }) => ({
    width: fieldwidth,
}))

const TextInput = ({ textValue, startTest, textType, paragraphData, handleOnChange, minrows, isMultiLine, isDisabled, label, width, errors, testId }) =>  (
    <FormControl error={errors ? true : false} sx={{ width: width }}>
        <MultilineField 
            fullWidth
            value={textValue}
            onChange={(e) => handleOnChange(e)}
            size="small"
            id="outlined-basic"
            label={label}
            variant="outlined"
            type={textType}
            multiline={isMultiLine}
            minRows={minrows}
            maxRows={minrows}
            disabled={isDisabled}
            helperText={errors}
            data-testid={testId}
            error={errors || textValue.length > 1603  ? true : false}
        />
        <FormHelperText>{startTest ? textValue.length + '/' + paragraphData.length : textValue.length + '/1603'}</FormHelperText>
    </FormControl>
)

TextInput.defaultProps = {
    textType: 'text',
    label: '',
    textValue: '',
    isMultiLine: true,
    isDisabled: false,
    minrows: 11,
    width: 100,
    errors: null,
    paragraphData: [],
    testId: '',
}

export default TextInput