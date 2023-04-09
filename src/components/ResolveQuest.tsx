import { FC, useEffect, useState } from "react";
import { User } from "../model/User";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Quest } from "../model/Quest";

export type ResolveQuestProps = {
    user: User;
    reloadUser: () => void;
    }

const ResolveQuest: FC<ResolveQuestProps> = ({reloadUser, user}) => {
    const [selectedQuest, setSelectedQuest] = useState<Quest>()
    const [qAnswer,setQAnswer] = useState<string>();

    const loadQuest = () => {
        axios.get('http://localhost:8080/quest/' + user.id + '/random-quest').then((response) => setSelectedQuest(response.data));
      }

function save() {
    axios.post('http://localhost:8080/quest/' + user.id + '/answer?questId' + selectedQuest?.id + 'answer' + qAnswer)
        .then(response => {
            setSelectedQuest(response.data)
            reloadUser();});
}

return  <Box>
            <Button sx={{margin: 1}} onClick={() => loadQuest()}>Solve Quest</Button>
            <Typography sx= {{margin:1}}>Quest: {selectedQuest?.quest}</Typography>
            <TextField sx= {{margin:1}} label="Answer" value={qAnswer} onChange={(e) => setQAnswer(e.target.value)}></TextField>
            <Button variant="contained" onClick={() => save()}>Save</Button> 
        </Box>;

}

export default ResolveQuest;


