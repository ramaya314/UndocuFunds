import {
  cyan700, cyan500,
  grey600, grey300,
  pinkA100, pinkA200, pinkA400,
  fullWhite, white,
  darkBlack, fullBlack
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  font: '17px/1 "Oxygen", sans-serif',
  fontFamily: '"Oxygen", sans-serif',
  palette: {
    primary1Color: '#cca744',
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: pinkA200,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: "#7c7c7c",
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    textColor: fullWhite,
  },
  listItem: {
    secondaryTextColor: fade(fullWhite, 0.7),
  },
  div:{
    font: '17px/1 "Oxygen", sans-serif',
    fontFamily: '"Oxygen", sans-serif',
  },
};
