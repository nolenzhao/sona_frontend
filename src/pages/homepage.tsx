import type { ReactElement } from 'react'
import Layout from '../components/main_layout'
import { MyPage } from '../types/types.d'
import {useEffect, useState} from 'react';
const querystring = require('querystring');
const CLIENT_ID = '824c398ffc104fa8b40247035c703e94';
const CLIENT_SECRET = '1c5686bd457b44469d2ecf2b74e7b74b';
const REDIRECT_URI = 'http://localhost:3000/accesstoken'
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const AUTH_TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`, 'utf-8').toString('base64');
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Playback from '../components/playback'
import Grid from '@mui/material/Unstable_Grid2'
import {Album} from '../types/top_items.d'
import { DataArray } from '@mui/icons-material';
import Top_Items from '../components/top_items'
import Custom_Playlist from '../components/custom_playlist';
/*
const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Page
*/

interface Device{
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}


const Homepage:MyPage = () =>{

  const [accesstoken, setAccesstoken] = useState<string | null>('empty');
  const [device_id, set_device_id] = useState<string | null>('');
  const [device_data, set_device_data] = useState<Device[]>([]);
  const [top_items, set_top_items] = useState ([])
  useEffect(() =>{

     let param = new URLSearchParams(window.location.search);
     setAccesstoken(param.get('access_token'))
  },[])
/*
  useEffect(() =>{


      fetch('https://api.spotify.com/v1/me/player/devices', {
        method: 'GET',
        mode: 'cors',
        headers: {
         "Authorization": 'Bearer ' + accesstoken,
         "Content-Type": 'application/json'
        }
      })
      .then(raw => raw.json())
      .then(data => {
        set_device_data(data.devices);
      })

  
  }, [accesstoken])

*/

  useEffect(() =>{ 
    if(device_data !== undefined)
    {
      for(let i = 0; i < device_data.length; i++){
        if(device_data[i].type === "Computer"){
          set_device_id(device_data[i].id) 
        }
      }
    }
  },[device_data])


  return(
    <Container>
        <Box marginTop = '125px'>

        <Custom_Playlist accesstoken = {accesstoken}/>
 
  
  
         </Box>

  



    
    
    </Container>
  )

}

export default Homepage

Homepage.Layout = "Main"