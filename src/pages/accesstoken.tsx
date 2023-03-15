import {useEffect, useState} from 'react';
const querystring = require('querystring');
const CLIENT_ID = '824c398ffc104fa8b40247035c703e94';
const CLIENT_SECRET = '1c5686bd457b44469d2ecf2b74e7b74b';
const REDIRECT_URI = 'http://localhost:3000/accesstoken'
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const AUTH_TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`, 'utf-8').toString('base64');
const Accesstoken = () =>{


    return(
        <div>
            this is where you login example token
            <a href = "http://localhost:8000/login">click here for acctoken </a> 
         
            
          
        </div>
    )
}


export default Accesstoken;