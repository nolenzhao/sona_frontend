import { StringifyOptions } from 'querystring';
import {useEffect, useState} from 'react';


const url = 'https://api.spotify.com/v1/me';

const Profile = () =>{

    const [accesstoken, setAccesstoken] = useState<String | null>();

    useEffect(() =>{
       let param = new URLSearchParams(window.location.search);
       setAccesstoken(param.get('access_token'))
     
    })

    useEffect(() =>{
        console.log(accesstoken);
       fetch(url,{
           method: 'GET',
           headers: {
            Authorization: 'Bearer ' + accesstoken
           }
       })
       .then(res => res.json())
       .then(data =>{
           console.log(data);
       })
       .catch(err =>{
           console.log(err);
       })
    }, [accesstoken])

    
    return(

        <div>

            this is the profile page
            this is the access token {accesstoken}
        </div>
    )

}

export default Profile