import PropTypes from 'prop-types'
import { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Controller } from 'react-hook-form'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

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
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordField = type === 'password'

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

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
          type={isPasswordField && showPassword ? 'text' : type || 'text'}
          error={!!error}
          helperText={error ? error.message : ' '}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position='start'>{icon}</InputAdornment>
            ) : null,
            endAdornment: isPasswordField ? (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleTogglePasswordVisibility}
                  edge='end'
                  size='small'
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
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
