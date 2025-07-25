import { createTheme } from '@mui/material/styles'
import {
  blue,
  deepOrange,
  orange,
  red,
  green,
  teal,
  grey,
  yellow
} from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
    },
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    },
    button: {
      textTransform: 'none', // Avoid all uppercase for buttons
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[700],
          lighter: blue[50]
        },
        secondary: deepOrange,
        success: {
          main: green[600],
          lighter: green[50]
        },
        warning: {
          main: yellow[800],
          lighter: yellow[50]
        },
        info: {
          main: teal[500],
          lighter: teal[50]
        },
        error: {
          main: red[600],
          lighter: red[50]
        },
        background: {
          default: '#f8f9fa',
          paper: '#ffffff'
        },
        text: {
          primary: grey[900],
          secondary: grey[600]
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: blue[400],
          lighter: blue[900]
        },
        secondary: orange,
        background: {
          default: '#121212',
          paper: '#1e1e1e'
        }
      }
    }
  },
  cssVariables: {
    colorSchemeSelector: 'class'
  }
})

export default theme
