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
    custom: {
        palette: {
            primary: {
                main: '#b300ff'
            }
        }
    }
})