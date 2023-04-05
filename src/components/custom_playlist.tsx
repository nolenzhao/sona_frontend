
import Container from '@mui/material/Container'
import {useState, useEffect} from 'react'
import Grid2 from '@mui/material/Unstable_Grid2'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { border, MUIStyledCommonProps } from '@mui/system'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box'
import styles from '../styles/custom_playlist.module.scss'

interface Props{
    accesstoken: string | null;
}

const Custom_Playlist:React.FC<Props> = ({accesstoken}:Props) =>{


    
    const [seed_genres, set_seed_genres] = useState<string[]>([])
    const [flag, set_flag] = useState<boolean>(false);
    const [user_seeds, set_user_seeds] = useState<string[]>([])
    const [checked_boxes, set_checked_boxes] = useState<boolean[]>([]);
    useEffect(() =>{
        fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds',{
            method: 'GET',
            mode: 'cors',
            headers:{
                'Authorization': `Bearer ${accesstoken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(raw => raw.json())
        .then(data =>{
            console.log()
            set_seed_genres(data.genres)
            console.log(data.genres);
            setTimeout(() =>{
                set_flag(true);
            },500)
           
        })

        

    },[accesstoken])

    function capitalizeFirstLetter(string:string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    
    return(
        <Container>

            <Box>
                <Typography variant = 'h1' color = 'primary.main' fontSize = {30}>
                    Pick up to five values which will influence your playlist. These can be a mix of genres, artists, or tracks.
                </Typography>
                <Box marginTop = {5}>
                <Accordion disableGutters = {true} sx = {{border: 3, borderColor: '#737373', }}>
                    <AccordionSummary expandIcon = {<ExpandMoreIcon/>}>
                        <Typography variant = 'h1' fontSize = {30} color = 'primary.main'>
                            Genres
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant = 'subtitle1' fontSize = {15}>

                                <Box>
                                {
                                    seed_genres ? 
                                    seed_genres.map((genre) => (
                                            <span className = {styles.genre_seeds}> {capitalizeFirstLetter(genre)} </span>     
                                    ))
                                    : 
                                    <div> loading</div>
                                }
                                </Box>
                               
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                </Box>
              
           

            </Box>

         
           




        </Container>
    )
}


export default Custom_Playlist

/*


*/