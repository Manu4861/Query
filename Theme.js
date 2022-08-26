import { extendTheme } from 'native-base'

export const Theme = extendTheme({
  colors: {
    app: {
      pri: '#B40121',
      sec: '#FF8F8F',
    },
    bg: {
      pri: '#f6f6f6',
      sec: '#E4E4E4',
      high: '#ffffff',
      darkpri: '#191919',
      darksec: '#5C5C5C',
      darkhigh: '#000000',
    },
    text: {
      pri: '#000000',
      sec: '#595959',
      darkpri: '#ffffff',
      darksec: '#9E9E9E',
      link: '#2A62F2',
      failure: '#FF5B5B',
    },
  },
  config: {
    // initialColorMode: 'dark',
  },
  components: {
    VStack: {
      baseStyle: ({ colorMode }) => {
        return {
          bg: colorMode === 'dark' ? 'bg.darkpri' : 'bg.pri',
        }
      },
    },
    Heading: {
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'dark' ? 'text.pri' : 'text.darkpri',
        }
      },
    },
    Text: {
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'dark' ? 'text.darksec' : 'text.sec',
        }
      },
    },
    Input: {
      baseStyle: ({ colorMode }) => {
        return {
          bg: colorMode == 'dark' ? 'bg.darksec' : 'bg.sec',
        }
      },
    },
  },
})
