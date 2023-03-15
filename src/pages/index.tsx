import type { ReactElement } from 'react'
import Front_Layout from '../components/front_layout'
import type { NextPageWithLayout } from './_app'
import Container from '@mui/material/Container'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box'
import styles from '../styles/index.module.scss'
import Typography from '@mui/material/Typography'
const Page: NextPageWithLayout = () => {
  return (

    <Container>
      <Box sx = {{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Box className = {styles.title}>
        <Typography variant = 'h1' display = "block" >
           Sona
       </Typography>
       <a className = {styles.loginlink} href = 'http://localhost:8000/login'>
       <Box sx = {{
         display: 'flex',
       }}>

       <Typography sx = {{
         marginLeft: 3,
       }}>
        Login
        </Typography>
         <NavigateNextIcon fontSize = 'medium'/>
      
       </Box>
       </a>
       </Box>
      </Box>
      
     
    </Container>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Front_Layout>
      {page}
    </Front_Layout>
  )
}

export default Page