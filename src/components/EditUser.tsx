import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import {Box} from "@mui/system"
import axios from "axios";
import {FC, useState} from "react"
import { User } from "../model/User";

export type EditUserProps = {
    user: User;
    reloadUser: () => void;
}

const EditUser: FC<EditUserProps> = ({user, reloadUser}) => {
    const [uName, setUName]=useState<string>(user.name);
    const [uPass, setUPass]=useState<string>(user.pass);
    const [uFullName, setUFullName]=useState<string>(user.fullName);
    const [uEmail, setUEmail]=useState<string>(user.email);

const save = () => {
    axios.patch("http://localhost:8080/quest/"+ user.id, { name: uName, pass: uPass, 
    fullName: uFullName, email: uEmail})
    .then(response => reloadUser());
}

    return <Box>
                <Typography sx={{margin: 1}}>Modify User</Typography>
                <TextField sx={{margin: 1}} label = "Name" value={uName} onChange={(e)=>setUName(e.target.value)}></TextField>
                <TextField sx={{margin: 1}} label = "Password" value={uPass} onChange={(e)=>setUPass(e.target.value)}></TextField>
                <TextField sx={{margin: 1}} label = "Full Name" value={uFullName} onChange={(e)=>setUFullName(e.target.value)}></TextField>
                <TextField sx={{margin: 1}} label = "Email" value={uEmail} onChange={(e)=>setUEmail(e.target.value)}></TextField>
                <Button variant="contained" onClick={()=>save()}>Save</Button>  
            </Box>
}

export default EditUser;
