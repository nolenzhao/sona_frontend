import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import styles from '../styles/layout.module.scss'
import Menu from '@mui/icons-material/Menu'
import Person from '@mui/icons-material/Person'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import { PropsOf } from '@emotion/react'

interface Props{
    children: React.ReactNode;
}

const Main_Layout:React.FC<Props> = ({children}: Props) =>{
    return(
        <>
        <Container> 
            
            <AppBar position='fixed' className = {styles.appbar} sx = {{
                color: 'primary.main',
                bgcolor: 'white',
                
            }}>
            <Toolbar className = {styles.menu} sx = {{
                fontSize: 50
            }}>
            <SearchIcon sx = {{
                fontSize: 'inherit'
            }}/>
            <Typography variant = 'h1'> 
                Sona 
            </Typography>
            <Person sx = {{
                fontSize: 'inherit'
            }}/>
            </Toolbar>
            </AppBar>
            <main>
            {children}
            </main>
        </Container>
        </>
        
    );
}

export default Main_Layout