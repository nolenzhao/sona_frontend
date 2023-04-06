import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {useState} from 'react';
interface Props{
    quality: string;
    start: number;
    end: number;
    separation: number;
}


const Quality_Slider:React.FC<Props> = ({quality, start, end, separation}:Props) =>{

    const [value, setValue] = useState<number[]>([start, end]);

    const slideHandler = (e:Event, newValue: number | number[], activeThumb:number) =>{
        if(!Array.isArray(newValue)){
            return;
        }
        if(activeThumb === 0)
        {
            setValue([Math.min(newValue[0], value[1] - separation), value[1]]);
        }
        else{
            setValue([value[0], Math.max(newValue[1], value[0] + separation)]);
        }
        console.log(value);

    }

    const [targetValue, setTargetValue] = useState<number>(1);

    const targetbox = (e:any) =>{
        setTargetValue(e.target.value);
        console.log(targetValue)
    }

    return(
       
            <Box  width = {500} marginTop = {10}>
                <Typography fontSize = {30} variant = 'h1' color = 'primary.main'> <em>{quality}</em>  </Typography>
                <Typography variant = 'subtitle1'> hihi</Typography>
                <Box width = {700} display = 'flex' flexDirection = 'row' justifyContent = 'space-between'>
                <Box  width = {400} height ={100} display = 'flex' flexDirection='column' justifyContent='space-between' marginTop = {4}>
                <Typography  fontSize = {25} variant = 'h1' color = 'primary.main'> Range </Typography>
                <Slider  min = {start} max = {end} step = {1} disableSwap onChange={slideHandler} value = {value}
                 valueLabelDisplay="on" defaultValue={1}/>
                </Box>
                
                <Box width = {170} height = {100} marginTop = {4} display = 'flex' flexDirection = 'column' justifyContent='space-between'>  
                <Typography fontSize = {25} variant = 'h1' color = 'primary.main'> Target ({start} - {end}) </Typography>
                <TextField type = 'number' error = {targetValue < start || targetValue > end || targetValue < value[0] || targetValue > value[1]} 
                variant = 'standard' label = 'Target' onChange = {targetbox}/>  
                </Box>
                </Box>

                
            </Box>


    )
}


export default Quality_Slider