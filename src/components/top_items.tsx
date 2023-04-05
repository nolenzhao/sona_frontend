
import Container from '@mui/material/Container'
import {useEffect, useState} from 'react'
import {useRef} from 'react'
import {UsersTopTracksResponse} from 'spotify-api'
import Grid from '@mui/material/Unstable_Grid2'
interface Props{
    accesstoken: string | null;
}

const Top_Items:React.FC<Props> = ({accesstoken}:Props) => {


    const [top_tracks, set_top_tracks] = useState<UsersTopTracksResponse>()

    useEffect(() =>{
       
            fetch('https://api.spotify.com/v1/me/top/tracks',{
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${accesstoken}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(raw => raw.json())
            .then(data => {
                set_top_tracks(data)
                console.log(data);
            })
    }, [accesstoken])

    return(

        <Container>
             
            <Grid>
                

            </Grid>
            
        </Container>


    )
}


export default Top_Items