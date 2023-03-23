import {useEffect, useState} from 'react';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';


interface Props{
   accesstoken: string | null;
}

declare global{
    interface Window {
        onSpotifyWebPlaybackSDKReady: any;
        Spotify: any;
    }
}

interface Track{
    name: string;
    album: {
        images: [
            {
                url: string
            }
        ]
    }
    artists: [
        {
            name: string;
        }
    ]

}
interface WebPlaybackState{
    context: {
        uri: string,
        metadata: object
    },
    disallows: {
        pausing: boolean,
        peeking_next: boolean,
        peeking_prev: boolean,      
        resuming: boolean,
        seeking: boolean,           
        skipping_next: boolean,     
        skipping_prev: boolean, 
    },
    paused: boolean,
    position: number,
    repeat_mode: number,
    shuffle: boolean,
    track_window: {
        current_track: any,
        previous_tracks: any[]
        next_tracks: any[]
    }
}

interface Player{ 

    nextTrack: () => Promise<void> | Promise<null>,
    addListener: () => boolean,
    previousTrack: () => Promise<void> | Promise<null>,
    togglePlay: () => Promise<void> | Promise<null>,
    getCurrentState: () => Promise<void> | Promise<WebPlaybackState> | Promise<null>,
}


const Playback:React.FC<Props> = ({accesstoken}:Props) =>{
   
    const track: Track = {
        name: "",
        album: {
            images:[
                {
                    url: ""
                }
            ]
        },
        artists: [
            {
                name: ""
            }
        ]
    }
  
    const [player, setPlayer] = useState<Player>({
        nextTrack: function() {return Promise.resolve()},
        addListener: function() { return true},
        previousTrack: function() {return Promise.resolve()},
        togglePlay: function() {return Promise.resolve()},
        getCurrentState: function() {return Promise.resolve()}
    });

    const [is_paused, setPaused] = useState<Boolean>(false);
    const [is_active, setActive] = useState<Boolean>(false);
    const [current_track, setTrack] = useState<Track>(track);
    // useEffect(() =>{
    //     let param = new URLSearchParams(window.location.search);
    //     set_access_token(param.get('access_token'))
    // },[])

    useEffect(() => {
    const script = document.createElement("script");
    const token = accesstoken;
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player= new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: (cb:any) => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({device_id}:any) => {
                console.log('Ready with Device ID', device_id);
            });
    
            player.addListener('not_ready', ({ device_id }:any) => {
                console.log('Device ID has gone offline', device_id);
            });
         
            player.addListener('player_state_changed', ((state:any) =>{
                if(!state){
                    return;
                }
                setTrack(state.track_window.current_track);
                setPaused(state.paused);
                
                console.log(state.track_window.current_track);
                player.getCurrentState().then( (state:any) => { 
                    (!state)? setActive(false) : setActive(true) 
                });
            })
            )
            player.connect();
            
        };
    }, [accesstoken]);

   
    
    return(
        <Container>
            playback 
            <Box>
                <Box>
                    <img src = {current_track.album.images[0].url}/>
                </Box>
                <ButtonGroup>
                   
                <Button onClick={() => {player.previousTrack()}}><SkipPreviousIcon/> </Button>
                <Button onClick = {() => {player.togglePlay()}}> { is_paused ? <PlayArrowIcon/> : <PauseIcon/>}
                </Button>
                <Button onClick = {() => {player.nextTrack()}}> {player ? 'player exists' : 'doesnt exist'} <SkipNextIcon/></Button>
                    
                   
                </ButtonGroup>

                <h2> now playing {current_track.name} </h2>
                

        
            </Box>
        </Container>

    )
}

export default Playback