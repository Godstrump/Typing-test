import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';


const Selector = ({ data, handleChange, value, label, name, errors, testId, icon }) => {
    return (
        <FormControl error={errors ? true : false} sx={{ m: 1, width: '40%' }} data-testid={testId}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name={name} 
            value={value ?? ''}
            label={label}
            error={errors  ? true : false}
            startAdornment={<InputAdornment position="start">{icon}</InputAdornment>}
            onChange={handleChange}
            >
                {data && data.map((select, i) => (
                    <MenuItem key={select.id} value={select.value}>{select.title}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{errors}</FormHelperText>
      </FormControl>
    )
}

Selector.defaultProps = {
    data: [],
    value: '',
    label: '',
    name: '',
    errors: null,
    testId: '',
}

export default Selector