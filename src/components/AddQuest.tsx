import { FC, useState } from "react";
import { User } from "../model/User";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

export type AddQuestProps = {
    user: User;
    reloadUser: () => void;
    }

const AddQuest: FC<AddQuestProps> = ({reloadUser, user}) => {
    const [qTokens, setQTokens] = useState<number>();
    const [qQuest,setQQuest] = useState<string>();
    const [qAnswer,setQAnswer] = useState<string>();

function save(): void {
    axios.post(`http://localhost:8080/quest/${user.id}/quest`,
        { level: qTokens, questDescription: qQuest, answer: qAnswer})
        .then(response => {
            reloadUser();});

}

return  <Box>
            <Typography sx={{margin: 1}}>Add Quest</Typography>
            <TextField sx= {{margin:1}} label="Tokens: 1 to your level" value={qTokens} onChange={(e) => setQTokens(e.target.value as unknown as number)}></TextField>
            <TextField sx= {{margin:1}} label="Quest Description" value={qQuest} onChange={(e) => setQQuest(e.target.value)}></TextField>
            <TextField sx= {{margin:1}} label="Answer" value={qAnswer} onChange={(e) => setQAnswer(e.target.value)}></TextField>
            <Button variant="contained" onClick={() => save()}>Save</Button> 
        </Box>;

}

export default AddQuest;
