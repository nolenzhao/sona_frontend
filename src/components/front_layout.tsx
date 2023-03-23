import React from "react";
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container' 
import Box from '@mui/material/Box'
interface Props {
    children: any;
}
const Front_Layout:React.FC<Props> = ({children}) =>{
    return (
        <>
            <Container maxWidth = {false}>
                <Box display = 'flex' justifyContent = 'right' sx = {{
                    color: '#1DB954',
                }}>
                

                <Typography variant = 'h3'>
                Powered by the Spotify API
                </Typography>
                </Box>
         

            <main>
            {children}
            </main>

            </Container>
           
            
            
        </>
     
  
    )
}
export default Front_Layout