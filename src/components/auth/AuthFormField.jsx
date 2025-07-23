import PropTypes from 'prop-types'
import { TextField, InputAdornment } from '@mui/material'
import { Controller } from 'react-hook-form'

const AuthFormField = ({
  name,
  label,
  control,
  rules,
  type,
  autoComplete,
  autoFocus,
  icon
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          margin='dense'
          fullWidth
          label={label}
          type={type || 'text'}
          error={!!error}
          helperText={error ? error.message : ' '}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position='start'>{icon}</InputAdornment>
            ) : null
          }}
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: 1.5
            }
          }}
        />
      )}
    />
  )
}

AuthFormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  icon: PropTypes.node
}

AuthFormField.defaultProps = {
  type: 'text',
  rules: {},
  autoFocus: false,
  icon: null
}

export default AuthFormField
