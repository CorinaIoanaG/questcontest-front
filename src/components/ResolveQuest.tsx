import { FC, useEffect, useState } from "react";
import { User } from "../model/User";
import axios from "axios";
import { Box, TextField, Button, Typography, Card } from "@mui/material";
import { Quest } from "../model/Quest";

export type ResolveQuestProps = {
    user: User;
    reloadUser: () => void;
    }

const ResolveQuest: FC<ResolveQuestProps> = ({reloadUser, user}) => {
    const [selectedQuest, setSelectedQuest] = useState<Quest>()
    const [qAnswer,setQAnswer] = useState<string>();

    const loadQuest = () => {
        axios.get(`http://localhost:8080/quest/${user.id}/quest`).then((response) => setSelectedQuest(response.data));
      }

function save() {
    axios.patch(`http://localhost:8080/quest/${user.id}/resolve?questId=${selectedQuest?.id}&answer=${qAnswer}`)
        .then(response => {
            reloadUser();
        });
}

return  <Box>
            <Button sx={{margin: 1}} onClick={() => loadQuest()}>SOLVE QUEST</Button>
            {(selectedQuest?.questDescription != null) && <Card sx={{margin: 1, cursor: 'pointer', background: 'lightblue'}}>
                <Typography sx={{ fontSize: 16 }}>Quest: {selectedQuest.questDescription}</Typography>
                <TextField label="Answer" value={qAnswer} onChange={(e) => setQAnswer(e.target.value)}></TextField>
                <Button variant="contained" onClick={() => {save(); setSelectedQuest(undefined); setQAnswer('');reloadUser()}}>Save</Button>
                <Typography>Tokens for answer: {selectedQuest.tokens}</Typography> 
            </Card>}
        </Box>;

}

export default ResolveQuest;


