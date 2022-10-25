import {createTheme} from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            palette: {
                primary: {
                    main: string
                }
            }
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        custom?: {
            palette?: {
                primary?: {
                    main?: string
                }
            }
        };
    }
}

export const customTheme = createTheme({
    palette: {
        action: {
            disabledBackground: '#e6b9fe',
            disabled: '#777777'
        },
        background: {
            default: '#211825'
        },
        primary: {
            main: '#B300FF'
        },
        secondary: {
            main: '#3350ff'
        },
        text: {
            primary: '#e0e0e0'
        }
    },
    custom: {
        palette: {
            primary: {
                main: '#b300ff'
            }
        }
    }
})