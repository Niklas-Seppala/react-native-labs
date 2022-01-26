import colors from './colors';

const themes = {
  light: {
    Text: {
      style: {
        fontSize: 18,
        color: colors.dark
      },
    },
    Button: {
      raised: true,
      buttonStyle: {
        paddingHorizontal: 30,
        backgroundColor: colors.accent
      },
      titleStyle: {
        fontSize: 18,
        color: colors.light
      }
    },
    Avatar: {
      rounded: true,
    }
  }
};

export default themes;
