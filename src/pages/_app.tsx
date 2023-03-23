import '@/styles/globals.css'
import type { ReactElement, ReactNode } from 'react';
import { MyAppProps } from '../types/types';
import { Layouts } from '../components/layouts';
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { createTheme, colors, ThemeProvider } from '@mui/material'
import { blue } from '@mui/material/colors'
import { BloodtypeTwoTone } from '@mui/icons-material'

const theme = createTheme({

  palette: {
    primary: {
      main: '#1fa8d1'
    },
    secondary: {
      main: '#ffffff'
    },
    
  },
  typography: {
    h1: {
      fontSize: 50,
      fontFamily: [
        'Candara', 
        'Calibri', 
        'Segoe', 
        'Segoe UI',
        'Optima', 
        'Arial', 
        'sans-serif'
      ].join(','),
      fontWeight: 400
    },
    h3: {
      fontSize: 20,
      fontFamily: [
        'Futura',
        'Trebushet MS',
        'Arial',
        'sans-serif',
      ].join(',')
    },
    subtitle1: {
      fontSize: 20,
      fontWeight: 100,
      fontFamily: [
        'Futura',
        'Trebushet MS',
        'Arial',
        'sans-serif',
      ].join(',')
    }
    /*
    fontFamily: [
      'Helvetica Neue',
      'Helvetica',
      'Arial', 
      'sans-serif'
    ].join(','),
    fontSize: 35,
    */
  },
  
})
/*
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
*/

export default function MyApp({ Component, pageProps }: MyAppProps) {
  // Use the layout defined at the page level, if available
  const Layout = Layouts[Component.Layout] ?? ((page:any) => page);

  return (
    <ThemeProvider theme = {theme}>
<Layout>  
<Component {...pageProps}/>
</Layout>
    </ThemeProvider>
    
  )
}
