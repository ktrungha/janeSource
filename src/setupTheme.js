import { createMuiTheme } from '@material-ui/core/styles';
import { GREY, BLACK_TEXT, PRIMARY } from './colors';

export const MUItheme = createMuiTheme({
  palette: {
    background: { default: 'white', paper: 'white' },
    primary: { main: PRIMARY, contrastText: 'white' },
    text: { primary: BLACK_TEXT, secondary: GREY }
  },
  typography: {
    fontFamily: 'Lato',
    subtitle2: { fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px' },
    subtitle1: { fontSize: '20px', fontWeight: 700, letterSpacing: '0.5px' },
    body1: { fontSize: '16px', fontWeight: 400, letterSpacing: '0.5px' },
    body2: { fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' },
    h4: { fontSize: '32px', lineHeight: '48px', fontWeight: 700, letterSpacing: '0.5px' },
    button: { textTransform: 'none' }
  }
});