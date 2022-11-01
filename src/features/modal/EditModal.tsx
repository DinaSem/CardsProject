
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import {updatePackTC} from "../packs/packs-reducer";
import {useAppDispatch} from "../../components/hooks";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type PropsType = {
    id: string
}

export function EditModal(props: PropsType) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch()

    const editPackOnClickHandler = () => {
        dispatch(updatePackTC({
                _id:props.id,
                name: "new name for Dinas pack",
            }
        ))
        setOpen(false)
    }

    return (
        <>
            <BorderColorOutlinedIcon onClick={handleOpen}></BorderColorOutlinedIcon>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <button onClick={editPackOnClickHandler}>Изменить имя колоды</button>
                </Box>
            </Modal>
        </>
    );
}
