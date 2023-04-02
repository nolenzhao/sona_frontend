import {useEffect, useState} from 'react';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from '../styles/index.module.scss'


const Login = () =>{
    return(
        <Container>
            <Box sx = {{
                display: 'flex',
                justifyContent: 'center',
            }}>
            <Box className = {styles.title}>
            <Typography variant = 'h1' display = "block"  >
            Sona
            </Typography>
                <a className = {styles.loginlink} href = 'http://localhost:8000/login'>
                <Box sx = {{
                display: 'flex',
            }}>
            <Typography>
            Login to Spotify
            </Typography>
            <NavigateNextIcon fontSize = 'medium'/>
    
     </Box>
     </a>
     </Box>
    </Box>
        </Container>
    )

}


export default Login