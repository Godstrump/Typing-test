import { forwardRef, useImperativeHandle, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { XButton, Header, ScoreBoard, Scores } from '../utils/elements'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    minWidth: '35vw',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
    minHeight: '30vh'
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
                    <Scores component="span">Speed: {+chart?.speed < 0 ? 1 : chart?.speed} WPM</Scores>
                    <Scores component="span">Accuracy: {((+chart?.points / +chart?.words).toPrecision(2) * 100)}%</Scores>
                    <Scores component="span">Time taken: {+chart?.timeTaken > 1 ? chart?.timeTaken + ' mins' : chart?.timeTaken + ' min'}</Scores>
                    <XButton sx={{ mt: 3 }} onClick={reStart} bgcolor="green">Restart</XButton>
                </ScoreBoard>
            </Box>
        </Modal>
    )
}

export default forwardRef(SuccessModal)