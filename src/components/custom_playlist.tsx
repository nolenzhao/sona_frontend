
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
import { RecommendationsSeedObject, RecommendationsObject, RecommendationTrackObject} from 'spotify-api'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import styles from '../styles/custom_playlist.module.scss'
import Quality_Slider from './quality_slider'
import { ElectricScooterSharp } from '@mui/icons-material'

interface Props{
    accesstoken: string | null;
}

const Custom_Playlist:React.FC<Props> = ({accesstoken}:Props) =>{

    
    const [user_seed_type, set_user_seed_type] = useState<string[]>(['', '', '', '', '']);
    const [user_seed, set_user_seed] = useState<string[]>(['', '', '', '', ''])
    const [mode, setMode] = useState<string>('');
    const [secondDuration, setSecondDuration] = useState<number[]>([0,0,0])
    const [minuteDuration, setMinuteDuration] = useState<number[]>([-1,-1,-1]);
    const [key, setKey] = useState<number[]>([-1,-1,-1]);
    const [recObject, setRecObject] = useState<RecommendationsObject>()
    const [recSeeds, setRecSeeds] = useState<RecommendationsSeedObject>()
    const [recTracks, setRecTracks] = useState<RecommendationTrackObject>()
    const [acousticness, setAcousticness] = useState<number[]>();
    const [danceability, setDanceability] = useState<number[]>();
    const [energy, setEnergy] = useState<number[]>();
    const [instrumentalness, setInstrumentalness] = useState<number[]>();
    const [loudness, setLoudness] = useState<number[]>();
    const [liveness, setLiveness] = useState<number[]>();
    const [popularity, setPopularity] =  useState<number[]>();
    const [speechiness, setSpeechiness] = useState<number[]>();
    const [tempo, setTempo] = useState<number[]>();
    const [timeSignature, setTimeSignature] = useState<number[]>();
    const [valence, setValence] = useState<number[]>();


    
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

    const changeMode = (e:any) =>{
        if(e.target.checked)
        {
            setMode(e.target.value)
        }
        else{
            setMode('');
        }
    }

    const toMilliseconds = (value:number, time:string) =>{
        if(time === 'seconds'){
            return value * 1000
        }
        else{
            return value * 60 * 1000
        }
        
    }
    const rangeDuration = (e:any) =>{
        let {name} = e.target;
        if(name === 'minimumminutes'){
            let min = toMilliseconds(e.target.value, 'minutes')
            let temp_arr = minuteDuration;
            temp_arr[0] = min;
            console.log(`this is the first temp_arr ${temp_arr}`)
            setMinuteDuration(temp_arr);

        }
        else if(name === 'minimumseconds'){
            let min = toMilliseconds(e.target.value, 'seconds');
            let temp_arr = secondDuration;
            temp_arr[0] = min;
            setSecondDuration(temp_arr);
        }
        else if(name === 'maximumminutes')
        {
            let max = toMilliseconds(e.target.value, 'minutes')
            let temp_arr = minuteDuration;
            temp_arr[1]  = max;
            console.log(`this is the seond temp_arr ${temp_arr}`)
            setMinuteDuration(temp_arr);
        }
        else if(name === 'maximumseconds'){
            let max = toMilliseconds(e.target.value, 'seconds')
            let temp_arr = secondDuration;
            temp_arr[1] = max;
            setSecondDuration(temp_arr);

        }
        else if(name === 'targetminutes'){
            let target = toMilliseconds(e.target.value, 'minutes');
            let temp_arr = minuteDuration;
            temp_arr[2] = target;
            setMinuteDuration(temp_arr);
        }
        else{
            let target = toMilliseconds(e.target.value, 'seconds')
            let temp_arr = secondDuration;
            temp_arr[2] = target;
            setSecondDuration(temp_arr);
        }
       
    }

   const keyChange = (e: any) =>{
       let {name} = e.target;
       console.log(`this is the name ${name}`);
       let temp_arr = [...key];
       console.log(`this is the arr before ${temp_arr}`)
        if(name === 'minimum')
        { 
            temp_arr[0] = e.target.value;
        }
        else if(name === 'maximum')
        {
            temp_arr[1] = e.target.value;
            console.log('max changed')
        }
        else{
            temp_arr[2] = e.target.value;
        }
        setKey(temp_arr);
        console.log(`this is the arr after ${temp_arr}`)
        console.log(`this is the key ${key}`)
   }

   

   
   const getTracks = () =>{

       fetch('https://api.spotify.com/v1/recommendations' , {
           method: 'GET',
           mode: 'cors',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${accesstoken}`
           }

       })
       .then(raw => raw.json())
       .then(data => {
            setRecObject(data);
            setRecSeeds(data.seeds)
            setRecTracks(data.tracks);
       })
   }

   const isKeyFaulty = (min:number, max:number, target:number) =>{
        if(min < max){
            if(target > max || target < min)
            {
                return true;
            }
            else{
                return false;
            }
        }
        else if(min > max){
            if(target < min && target > max)
            {
                return true;
            }
            else{
                return false;
            }
        }
        else{
            if(target !== min || target !== max)
            {
                return true;
            }
            else{
                return false;
            }
        }
       
   }

   const slider_callback = (childData) =>{

   }
   


    return(
        <Container>

            <Box>
                <Typography variant = 'h1' color = 'primary.main' fontSize = {30}>
                    Pick up to five seeds which will influence your playlist. These can be a mix of genres, artists, or tracks.
                </Typography>
                <Box marginTop = {5}>
                <Accordion disableGutters = {true} sx = {{border: 3, borderColor: '#939393', }}>
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

                <Quality_Slider quality = 'Acousticness' start = {0} end = {100}  separation = {10}
                description = 'The acoustic nature of the track. Zero is mostly electronic and synthesized,
                 one hundred is mostly acoustic components.'
                /> 
                <Quality_Slider quality = 'Danceabilitiy' start = {0} end = {100}  separation = {10}
                description = 'How suitable a track is for dancing, calculated using tempo, rhythm stability, beath strength, 
                and overall regularity. Zero is not suitable, one hundred is suitable.'
                />
                <Quality_Slider quality = 'Energy' start = {0} end = {100}  separation = {10}
                description = 'The intensity and activity level of the track, calculated using loudness, dynamic range, 
                and tempo. Zero is quiet and calm, one hundred is loud and energetic.'
                />
                <Quality_Slider quality = 'Instrumentalness' start = {0} end = {100}  separation = {10}
                description = 'The degree to which vocals or singing is present, calculated using presence or absence of vocals, 
                melodic content, and lyrics. Zero is full of singing, one hundred is mostly instruments.'
                />
                <Quality_Slider quality = 'Liveness' start = {0} end = {100} separation = {10}
                description = 'The presence of a live audience in a recording, calculated using crowd noise, applauce, 
                and other indicators. Zero is a studio, one hundred is live.'
                />
                <Quality_Slider quality = "Loudness (dB)" start = {-60} end = {0}  separation = {5}
                description = 'Uses decibels to measure the loudness of a track. Negative sixty is silent, 
                zero is deafening.'
                />
                <Quality_Slider quality = 'Popularity' start = {0} end = {100} separation = {10}
                description = 'How popular a track is, calculated based on total number of plays and how recent those plays are. 
                Takes into account user behavior and demographics. Zero is never played, one hundred is very popular.'
                />
                <Quality_Slider quality = 'Speechiness' start = {0} end = {100}  separation = {10}
                description = 'The presence of spoken words, calculated by analyzing the high-frequency content and spectral
                values of the track. Zero is mostly music, one hundred is mostly speaking.'
                />
                <Quality_Slider quality = 'Tempo (BPM)' start = {0} end = {250} separation = {10}
                description = 'How many beats per minute (BPM) the track has. A higher tempo is faster, a lower tempo is 
                slower, calculated using the time between beats. Zero is a snails pace, one hundred is racing.'
                />
                <Quality_Slider quality = 'Time Signature' start = {0} end = {11} separation = {1}
                description = 'The number of beats per bar of a track, as well as the types (ie. eighth, quarter, whole). One is 
                one beat per bar, eleven will have eleven beats per bar.'
                />
                <Quality_Slider quality = 'Valence' start = {0} end = {100} separation = {10}
                description = 'How positive a track is, calculated by harmoniousness, tonality, and brightness. A value of zero 
                is sad and angry, a value of one hundred is euphoric and cheerful.'
                /> 
                 <Box  width = {500} marginTop = {10}>
                <Typography fontSize = {30} variant = 'h1' color = 'primary.main'> <em> Mode </em>  </Typography>
                <Typography sx = {{width: 900}} variant = 'subtitle1' fontSize = {17}> Whether the song is in major
                or minor key. Options to choose either one, or both. </Typography>
                <Box width = {700} display = 'flex' flexDirection = 'row' justifyContent = 'space-between'>
                <Box  width = {400} height ={100} display = 'flex' flexDirection='column' justifyContent='space-between' marginTop = {4}>
                <FormGroup>
                    <FormControlLabel control = {<Checkbox value = 'Both' onChange = {changeMode} disabled = {mode === 'Major' || mode === 'Minor' }/>} label = 'Both'/>
                    <FormControlLabel control = {<Checkbox value = 'Major' onChange = {changeMode} disabled = {mode === 'Both' || mode === 'Minor'}/>} label = 'Major'/>
                    <FormControlLabel control = {<Checkbox value = 'Minor'  onChange = {changeMode} disabled = {mode === 'Both' || mode === 'Major'}/>} label = 'Minor'/>
                </FormGroup>        
                </Box>
                
                </Box>

                
                </Box>
                <Box  width = {900} marginTop = {10}>
                <Typography fontSize = {30} variant = 'h1' color = 'primary.main'> <em> Duration</em>  </Typography>
                <Typography sx = {{width: 900}} variant = 'subtitle1' fontSize = {17}> How long a track is. </Typography>
                <Box width = {1100} display = 'flex' flexDirection = 'row' justifyContent = 'space-between' marginTop = {3}>
                <Box display= 'flex' flexDirection = 'column'>
                <Typography  fontSize = {25} variant = 'h1' color = 'primary.main'> Minimum  </Typography>
                <Box  width = {300}display = 'flex' flexDirection = 'row'>
                <TextField onChange = {rangeDuration} name = 'minimumminutes'  label = 'Minutes' variant = 'standard' type = 'number'/>
                <TextField  onChange = {rangeDuration} name = 'minimumseconds' sx = {{ marginLeft: 5}} label = 'Seconds' variant = 'standard' type = 'number'/>     
                </Box>
                </Box>
                <Box display= 'flex' flexDirection = 'column'>
                <Typography  fontSize = {25} variant = 'h1' color = 'primary.main'> Maximum  </Typography>
                <Box  width = {300}display = 'flex' flexDirection = 'row'>
                <TextField  label = 'Minutes' onChange = {rangeDuration} name = 'maximumminutes' variant = 'standard' type = 'number'/>
                <TextField sx = {{ marginLeft: 5}} onChange = {rangeDuration} name = 'maximumseconds' label = 'Seconds' variant = 'standard' type = 'number'/>     
                </Box>
                </Box>
                <Box display= 'flex' flexDirection = 'column'>
                <Typography  fontSize = {25} variant = 'h1' color = 'primary.main'> Target  </Typography>  
                <Box  width = {300}display = 'flex' flexDirection = 'row'>
                <TextField onChange = {rangeDuration} name = 'targetminutes' label = 'Minutes' variant = 'standard' type = 'number'/>
                <TextField onChange = {rangeDuration} name = 'taretseconds' sx = {{ marginLeft: 5}} label = 'Seconds' variant = 'standard' type = 'number'/>     
                </Box> 
                </Box>
                </Box>
                </Box>


                <Box  width = {1000} marginTop = {10}>
                <Typography fontSize = {30} variant = 'h1' color = 'primary.main'> <em> Key</em>  </Typography>
                <Typography sx = {{width: 900}} variant = 'subtitle1' fontSize = {17}> The key of the track. 
                Chords or notes detected in the song, instert a single key for each box. Value range from C, C#, D... to B. </Typography>
                <Box width = {900} display = 'flex' flexDirection = 'row' justifyContent = 'space-between' marginTop = {3}>
                <Box display= 'flex' flexDirection = 'column'>
                <Typography width = {80} fontSize = {25} variant = 'h1' color = 'primary.main'> Minimum  </Typography>
        
                <Box  marginTop = {2}>
                <FormControl fullWidth>
                <InputLabel> Key </InputLabel>
                    <Select onChange = {keyChange} value = {key[0] === -1 ? '' : key[0]} name = 'minimum' label = 'Key'>
                        <MenuItem value = {0}> C</MenuItem>
                        <MenuItem value = {1}> C#</MenuItem>
                        <MenuItem value = {2}> D</MenuItem>
                        <MenuItem value = {3}> D#</MenuItem>
                        <MenuItem value = {4}> E</MenuItem>
                        <MenuItem value = {5}> F</MenuItem>
                        <MenuItem value = {6}> F#</MenuItem>
                        <MenuItem value = {7}> G</MenuItem>
                        <MenuItem value = {8}> G#</MenuItem>
                        <MenuItem value = {9}> A</MenuItem>
                        <MenuItem value = {10}> A#</MenuItem>
                        <MenuItem value = {11}> B</MenuItem>

                    </Select>
                </FormControl>
                </Box>
                
               
                </Box>
                <Box display= 'flex' flexDirection = 'column'>
                <Typography  width = {80} fontSize = {25} variant = 'h1' color = 'primary.main'> Maximum  </Typography>
                <Box marginTop = {2} >
                <FormControl fullWidth>
                <InputLabel> Key </InputLabel>
                    <Select onChange = {keyChange} value = {key[1] === -1 ? '': key[1]} name = 'maximum' label = 'Key'>
                        
                        <MenuItem value = {0}> C</MenuItem>
                        <MenuItem value = {1}> C#</MenuItem>
                        <MenuItem value = {2}> D</MenuItem>
                        <MenuItem value = {3}> D#</MenuItem>
                        <MenuItem value = {4}> E</MenuItem>
                        <MenuItem value = {5}> F</MenuItem>
                        <MenuItem value = {6}> F#</MenuItem>
                        <MenuItem value = {7}> G</MenuItem>
                        <MenuItem value = {8}> G#</MenuItem>
                        <MenuItem value = {9}> A</MenuItem>
                        <MenuItem value = {10}> A#</MenuItem>
                        <MenuItem value = {11}> B</MenuItem>

                    </Select>
                </FormControl>
                </Box>
               
                </Box>
                <Box display= 'flex' flexDirection = 'column'>
                <Typography  width = {80} fontSize = {25} variant = 'h1' color = 'primary.main'> Target  </Typography>  
                <Box  marginTop = {2}>
                <FormControl fullWidth>
                <InputLabel> Key </InputLabel>
                    <Select error = {isKeyFaulty(key[0], key[1], key[2])} onChange = {(e) => keyChange(e)} value = {key[2] === -1 ? '' : key[2]} name = 'target' label = 'Key'>
                       
                        <MenuItem value = {0}> C</MenuItem>
                        <MenuItem value = {1}> C#</MenuItem>
                        <MenuItem value = {2}> D</MenuItem>
                        <MenuItem value = {3}> D#</MenuItem>
                        <MenuItem value = {4}> E</MenuItem>
                        <MenuItem value = {5}> F</MenuItem>
                        <MenuItem value = {6}> F#</MenuItem>
                        <MenuItem value = {7}> G</MenuItem>
                        <MenuItem value = {8}> G#</MenuItem>
                        <MenuItem value = {9}> A</MenuItem>
                        <MenuItem value = {10}> A#</MenuItem>
                        <MenuItem value = {11}> B</MenuItem>
                    </Select>
                </FormControl>
                </Box>
              
                </Box>
                </Box>
                </Box>



                <Box>
                
                    <Button onClick = {getTracks}> Generate your Tracks </Button>
                </Box>
          

            </Box>



        </Container>
    )
}


export default Custom_Playlist

/*


*/