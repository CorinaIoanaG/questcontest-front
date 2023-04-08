import { FC, useState } from "react";
import { User } from "../model/User";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

export type AddQuestProps = {
    user: User;
    reloadUser: () => void;
    }

const AddQuest: FC<AddQuestProps> = ({reloadUser, user}) => {
    const [qBadge, setQBadge] = useState<number>();
    const [qQuest,setQQuest] = useState<string>();
    const [qAnswer,setQAnswer] = useState<string>();

function addQuest() {
    axios.post("http://localhost:8080/quest/" + user.id + "/quest",
        { badge: qBadge, quest: qQuest, answer: qAnswer})
        .then(response => {
            reloadUser();});

}

return  <Box>
            <Typography sx={{margin: 1}}>Add Quest</Typography>
            <TextField sx= {{margin:1}} label="Badge" value={qBadge} onChange={(e) => setQBadge(e.target.value as unknown as number)}></TextField>
            <TextField sx= {{margin:1}} label="Quest" value={qQuest} onChange={(e) => setQQuest(e.target.value)}></TextField>
            <TextField sx= {{margin:1}} label="Answer" value={qAnswer} onChange={(e) => setQAnswer(e.target.value)}></TextField>
            <Button onClick={() => addQuest()}>Add Quest</Button> 
        </Box>;

}

export default AddQuest;


