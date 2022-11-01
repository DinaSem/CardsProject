// import React from 'react';
// import {BasicModal} from "./BasicModal";
// import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
//
// export const DeleteModal = () => {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     return (
//         <div>
//             <BasicModal title={'Delete'} children2={
//                     <DeleteForeverOutlinedIcon onClick={handleOpen}>Delete</DeleteForeverOutlinedIcon>
//             }>
//                 <h1> Add modal</h1>
//                 <button>delete</button>
//             </BasicModal>
//         </div>
//     );
// };
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {deletePackTC} from "../packs/packs-reducer";
import {useAppDispatch} from "../../components/hooks";

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

export function DeleteModal(props: PropsType) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch()

    const deletePackOnClickHandler = () => {
        dispatch(deletePackTC(props.id))
    }

    return (
        <>
            <DeleteForeverOutlinedIcon onClick={handleOpen}></DeleteForeverOutlinedIcon>
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
                    <button onClick={deletePackOnClickHandler}>Удалть колоду</button>
                </Box>
            </Modal>
        </>
    );
}
