import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {useEffect, useState} from 'react';

interface Props{
    quality: string;
    start: number;
    end: number;
    separation: number;
    description : string;
    rangeCallback: (data:any) => void;
    targetCallback: (data:any) => void;
}


const Quality_Slider:React.FC<Props> = ({quality, start, end, separation, description, rangeCallback, targetCallback}:Props) =>{


    

    const [value, setValue] = useState<number[]>([start, end]);

    const slideHandler = (e:Event, newValue: number | number[], activeThumb:number) =>{
        if(!Array.isArray(newValue)){
            return;
        }
        if(activeThumb === 0)
        {
     
            let temp_val = [Math.min(newValue[0], value[1] - separation)/100, value[1]/100]
            rangeCallback(temp_val);
            setValue([Math.min(newValue[0], value[1] - separation), value[1]]);
        }
        else{
            let temp_val = [value[0]/100, Math.max(newValue[1], value[0] + separation)/100]
            rangeCallback(temp_val);
            setValue([value[0], Math.max(newValue[1], value[0] + separation)]);
        }
        console.log(value);

    }

    const [targetValue, setTargetValue] = useState<number>(1);

    const targetbox = (e:any) =>{
        setTargetValue(e.target.value);
        console.log(targetValue)
    }


    const fireBoth = (e:any) =>{
        let temp_target = parseInt(e.target.value)/100;
        targetCallback(temp_target);
        setTargetValue(temp_target);
    }

    return(
       
            <Box  width = {500} marginTop = {10}>
                <Typography fontSize = {30} variant = 'h1' color = 'primary.main'> <em>{quality}</em>  </Typography>
                <Typography sx = {{width: 900}} variant = 'subtitle1' fontSize = {17}> {description} </Typography>
                <Box width = {700} display = 'flex' flexDirection = 'row' justifyContent = 'space-between'>
                <Box  width = {400} height ={100} display = 'flex' flexDirection='column' justifyContent='space-between' marginTop = {4}>
                <Typography  fontSize = {25} variant = 'h1' color = 'primary.main'> Range </Typography>
                <Slider  min = {start} max = {end} step = {1} disableSwap onChange={slideHandler} value = {value}
                 valueLabelDisplay="on" defaultValue={1}/>
                </Box>
                
                <Box width = {170} height = {100} marginTop = {4} display = 'flex' flexDirection = 'column' justifyContent='space-between'>  
                <Typography fontSize = {25} variant = 'h1' color = 'primary.main'> Target ({start} - {end}) </Typography>
                <TextField type = 'number' error = {targetValue < start/100 || targetValue > end/100 || targetValue < value[0]/100 || targetValue > value[1]/100} 
                variant = 'standard' label = 'Target' onChange = {(e) => fireBoth(e)} />  
                </Box>
                </Box>

                
            </Box>


    )
}


export default Quality_Slider