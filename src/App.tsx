import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { User } from './model/User';
import AddQuest from './components/AddQuest';
import EditUser from './components/EditUser';



function App() {
  const [users, setUsers] = useState<User[]>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [uName, setUName] = useState<string>();
  const [uPass,setUPass] = useState<string>();
  const [uFullName,setUFullName] = useState<string>();
  const [uEmail,setUEmail] = useState<string>();
  const [lName, setLName] = useState<string>();
  const [lPass,setLPass] = useState<string>();

  useEffect(() => {
    axios.get('http://localhost:8080/quest').then((response) => setSelectedUser(response.data));
  }, [lName,lPass]);
 
  const addNewUser = () => {
    axios.post('http://localhost:8080/quest', 
    {id: 0, name: uName, pass: uPass, fullName: uFullName, email: uEmail})
    .then((response) => setSelectedUser(response.data));
  }

  const logInUser = () => {
    axios.get('http://localhost:8080/quest/log?name='+lName+'&pass='+lPass)
    .then((response) => setSelectedUser(response.data));
  }

  const reloadUser = (id: number) => {
    axios.get('http://localhost:8080/quest/' + id).then((response) => setSelectedUser(response.data));
  }

  const reloadedSelectedUser = () =>{
    selectedUser && reloadUser(selectedUser.id);
  }

  const deleteUser = (id: number) => {
    axios.delete('http://localhost:8080/quest/' + id).then((response) => {
      setSelectedUser(undefined); 
      window.location.reload();}
    );
  }

  const clearSelectedUser = () => {
    setSelectedUser(undefined);
    window.location.reload();
  }
  
  return (
    <Box className='App'>
      <Typography sx={{ display : 'auto', height: 50, fontSize: 30}}> WELCOME TO QUEST CONTEST </Typography>
      {selectedUser?.name == null && <Box sx={{ display: 'flex', justifyContent: 'center', 
        alignItems: 'center', flexDirection: 'column'}}>
        <Card sx={{margin: 3, width: '600', background: 'lightblue'}}>
          <CardContent>
            <Typography sx={{margin: 1}}>SIGN IN</Typography>
            <TextField label="User Name" value={lName} onChange={(e) => setLName(e.target.value as string)}></TextField>
            <TextField label="User Password" value={lPass} onChange={(e) => setLPass(e.target.value as string)}></TextField>
            <Button onClick={()=>logInUser()}>OK</Button>
          </CardContent>
        </Card>
        <Card sx={{margin: 3, width: 1000, background: 'lightblue' }}>
          <CardContent>
            <Typography sx={{margin: 1}}>ADD NEW USER</Typography>
            <TextField label="User Name" value={uName} onChange={(e) => setUName(e.target.value)}></TextField>
            <TextField label="User Password" value={uPass} onChange={(e) => setUPass(e.target.value)}></TextField>
            <TextField label="Full Name" value={uFullName} onChange={(e) => setUFullName(e.target.value)}></TextField>
            <TextField label="Email" value={uEmail} onChange={(e) => setUEmail(e.target.value)}></TextField>
            <Button onClick={()=>addNewUser()}>SAVE</Button>
          </CardContent>
        </Card>
      </Box>}
      {selectedUser?.name != null && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Card sx={{ margin: 1, overflow: 'auto', background: 'lightblue', width: 900}}>
            <Typography sx={{ fontSize: 18 }}>Full Name: {selectedUser.fullName} </Typography>
            <Typography sx={{ fontSize: 14 }}>BADGE: {selectedUser.badge} </Typography>
            <Typography sx={{ fontSize: 14 }}>TOKENS: {selectedUser.tokens} </Typography>
            <Button>RANKINGS LIST</Button>
            <Button>RESOLVE QUEST</Button>
            {/* <Button onClick={() =><AddQuest user={selectedUser}></AddQuest>}>ADD QUEST</Button> */}
            {/* <Button>MODIFY USER</Button> */}
            <Button onClick={() => clearSelectedUser()}>LOG OUT</Button>
            <Button sx={{ color: "red" }} onClick={() => deleteUser(selectedUser.id)}>DELETE USER</Button>
          </Card>
          <Card sx={{ margin: 1, overflow: 'auto', background: 'lightblue', width: 1000}}>
            <AddQuest  user={selectedUser} reloadUser={reloadedSelectedUser}></AddQuest>
          </Card>
          <Card sx={{ margin: 1, overflow: 'auto', background: 'lightblue', width: 1000}}>
            <EditUser user={selectedUser} reloadUser={reloadedSelectedUser}></EditUser>
          </Card>
      </Box>}
    </Box>
  );
}

export default App;
