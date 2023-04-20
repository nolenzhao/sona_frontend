
import {RecommendationTrackObject} from 'spotify-api';
import Container from '@mui/material/Container'
interface Props{
    tracks: RecommendationTrackObject[]
}

const Track_Display:React.FC<Props>= ({tracks}:Props) =>{
    return(
        <Container>
            {
                tracks.map(track =>(
                    <div> {track}</div>
                ))
            }
        </Container>
    )
}

export default Track_Display;