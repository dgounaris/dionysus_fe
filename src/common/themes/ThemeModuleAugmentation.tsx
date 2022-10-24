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
        background: {
            default: '#211825'
        },
        primary: {
            main: '#b300ff'
        },
        secondary: {
            main: '#ff5678'
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