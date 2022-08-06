import { forwardRef, useImperativeHandle, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { XButton, Header, ScoreBoard, Scores } from '../utils/elements'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
    height: '50%'
};


const SuccessModal = ({ reStart }, ref) => {
    const [open, setOpen] = useState(false)
    const [chart, setChart] = useState({})

    const handleClose = (event, reason) => {
        if (reason && reason == "backdropClick" && "escapeKeyDown") 
            return;
        setOpen(false);
    }    

    useImperativeHandle(ref, () => ({
        openModal: () => {
            setOpen(true)
        },
        closeModal: () => {
            setOpen(false)
        },
        setModalText: (texts) => {
            setChart({...texts})
        }
    }))

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Header variant="h6" component="h2">
                    Results
                </Header>
                <ScoreBoard id="modal-modal-description" component="div">
                    <Scores component="span">Score: {chart?.points}</Scores>
                    <Scores component="span">Total words: {chart?.words}</Scores>
                    <Scores component="span">Time taken: {chart?.mins}:{chart?.secs}</Scores>
                    <XButton onClick={reStart} bgcolor="green">Restart</XButton>
                </ScoreBoard>
            </Box>
        </Modal>
    )
}

export default forwardRef(SuccessModal)