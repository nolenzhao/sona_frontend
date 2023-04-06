import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import {useState} from 'react';
interface Props{
    quality: string;
}


const Quality_Slider:React.FC<Props> = ({quality}:Props) =>{

    const [value, setValue] = useState<number[]>([40,60]);

    const slideHandler = (e:Event, newValue: number | number[], activeThumb:number) =>{
        if(!Array.isArray(newValue)){
            return;
        }
        if(activeThumb === 0)
        {
            setValue([Math.min(newValue[0], value[1] - 10), value[1]]);
        }
        else{
            setValue([value[0], Math.max(newValue[1], value[0] + 10)]);
        }
        console.log(value);

    }

    return(
       
            <Box  width = {500} marginTop = {10}>
                <Typography fontSize = {40} variant = 'h1' color = 'primary.main'> {quality} </Typography>
                <Box  width ={700} display = 'flex' justifyContent='space-between' marginTop = {4}>
                <Typography  fontSize = {25} variant = 'h1' color = 'primary.main'> Range </Typography>
                <Typography fontSize = {25} variant = 'h1' color = 'primary.main'> Target  </Typography>
                </Box>
                
                <Box marginTop = {5}>
                <Slider disableSwap onChange={slideHandler} value = {value} valueLabelDisplay="on" defaultValue={50}/>
                </Box>
                <Box marginTop = {5}>
              
                </Box>
                
                
                
              

                
            </Box>


    )
}


export default Quality_Slider