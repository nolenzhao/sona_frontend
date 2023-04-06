
import Container from '@mui/material/Container'
import {useState, useEffect} from 'react'
import Grid2 from '@mui/material/Unstable_Grid2'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Slider from '@mui/material/Slider';
import { border, MUIStyledCommonProps } from '@mui/system'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box'
import styles from '../styles/custom_playlist.module.scss'
import Quality_Slider from './quality_slider'

interface Props{
    accesstoken: string | null;
}

const Custom_Playlist:React.FC<Props> = ({accesstoken}:Props) =>{

    
    const [user_seed_type, set_user_seed_type] = useState<string[]>(['', '', '', '', '']);
    const [user_seed, set_user_seed] = useState<string[]>(['', '', '', '', ''])

    const change_seed_type = (e:any, index:number) =>{
        let temp_arr = [...user_seed_type] 
        temp_arr.splice(index, 1, e.target.value)
        set_user_seed_type(temp_arr);
        console.log(user_seed_type);
    }
    const change_seed = (e:any, index:number) =>{
        let temp_arr = [...user_seed];
        temp_arr.splice(index, 1, e.target.value)
        set_user_seed(temp_arr);
        console.log(user_seed);
    }
    let seed_inputs = [];
    let picked = 2;
    for(let i = 0; i < 5; i++)
    {
        let temp_label = `Seed ${i + 1}`
        seed_inputs.push(
           <div className = {styles.seed_pick}>
           
            <FormControl sx = {{width: 150}}>
            <InputLabel id="Genre_seeds">Seed Type</InputLabel>
            <Select
                disabled = {user_seed_type[i-1] === ''}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value = {user_seed_type[i]}
                label="Seed Type"
                onChange = {(e) => change_seed_type(e, i)}
            >
                <MenuItem value = ''> None </MenuItem>
                <MenuItem value='Track'>Track</MenuItem>
                <MenuItem value='Artist'>Artist</MenuItem>
                <MenuItem value='Genre'>Genre</MenuItem>
            </Select>
            </FormControl>
            <TextField value = {user_seed[i]} onChange = {(e) => change_seed(e, i)} required = {user_seed_type[i] !== ''}
             error = {user_seed_type[i] !== '' && user_seed[i] === ''} defaultValue = '' disabled = {user_seed_type[i] === ''} label = {temp_label} variant='outlined'
              sx = {{width: 400, display: 'inline-block', marginLeft: 15}}/>
            </div>
           

        )
    }
    const [seed_genres, set_seed_genres] = useState<string[]>([])
   

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
            set_seed_genres(data.genres)
            console.log(data.genres);
        })
    },[accesstoken])

    function capitalizeFirstLetter(string:string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
/*
    const seed_type_choice = (e:any) => {
        let temp_arr = user_seed_type;
        console.log(e.target.id)
        temp_arr.splice(parseInt(e.target.id), 1, e.target.value)
        console.log(temp_arr);
        set_user_seed_type(temp_arr);
        console.log(`this is the state ${user_seed_type}`);
    }
    */
    return(
        <Container>

            <Box>
                <Typography variant = 'h1' color = 'primary.main' fontSize = {30}>
                    Pick up to five seeds which will influence your playlist. These can be a mix of genres, artists, or tracks.
                </Typography>
                <Box marginTop = {5}>
                <Accordion disableGutters = {true} sx = {{border: 3, borderColor: '#737373', }}>
                    <AccordionSummary expandIcon = {<ExpandMoreIcon/>}>
                        <Typography variant = 'h1' fontSize = {30} color = 'primary.main'>
                            Available Genres
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
                <Typography variant ='h1' color = 'primary.main' fontSize = {25} sx = {{marginTop: 5}}> Choose the Seed type, then enter the value.</Typography>
                </Box>

                <Box display = 'block'>
                    
                  {seed_inputs}
                
                </Box>

                <Quality_Slider quality = 'Acousticness'/> 
                
              
           

            </Box>

         
           




        </Container>
    )
}


export default Custom_Playlist

/*


*/