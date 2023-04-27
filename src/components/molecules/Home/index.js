import { Box, Button, Card, Container, Grid, InputAdornment, Menu, MenuItem, Modal, OutlinedInput, Slider, Typography, } from '@mui/material'
import React, { useEffect, useState, useRef, } from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import Draggable from 'react-draggable';
import domtoimage from 'dom-to-image';
import Fade from 'react-reveal/Fade';
import DownloadIcon from '@mui/icons-material/Download';
import chooseColor from './color';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Home = () => {

    const maxPrice = 72;
    const startPoint = 26;

    const initialState = {
        text: "MetaPals Awesome",
    };
    const [value, setValue] = useState(startPoint);
    const [color, setColor] = useState(chooseColor[0].color);
    const [activeIndex, setActiveIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [form, setForm] = useState(initialState);
    const { text } = form;

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const paragraph = document.getElementById('p');
        paragraph.style.fontSize = `${value}px`;
        paragraph.style.color = `${color}`;
    }, [value, color]);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const colorChange = (e) => {
        setColor(e.target.value)
        const index = parseInt(e.target.dataset.index);
        setActiveIndex(index);
    };

    const handleSaveImage = () => {
        const paragraph = document.getElementById('p');
        domtoimage.toPng(paragraph).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'download.png';
            link.href = dataUrl;
            link.click();
            setOpenModal(false);
        });
    };


    return (
        <Container maxWidth="md" sx={{ mt: 2 }} >
            <Card sx={{ p: 2, justifyContent: "center", alignitems: "center", textAlign: "center", }}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="primary" >*The letters are draggable</Typography>
                        <Draggable>
                            <p id="p"
                                style={{
                                    fontFamily: 'monospace',
                                    fontWeight: 'bold'
                                }}
                            >{text}</p>
                        </Draggable>
                    </Grid>
                    <Grid item xs={12}>
                        <OutlinedInput
                            onChange={onChange}
                            value={text}
                            name="text"
                            placeholder='Type your text logo here'
                            endAdornment={<InputAdornment position="end"><CircleIcon color="primary" /></InputAdornment>}
                        />
                    </Grid>
                    <Grid item xs={11}>
                        <Slider
                            value={value}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            min={8}
                            max={maxPrice}
                        />
                    </Grid>
                    <Grid item xs={1} >
                        <Typography variant="body1">{value}px</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {chooseColor.map((choose, index) => (
                            <Button key={index}
                                onClick={colorChange}
                                value={choose.color}
                                data-index={index}
                                style={{
                                    backgroundColor: choose.color, marginRight: 5, minHeight: 50,
                                    border: index === activeIndex ? '3px solid black' : 'none'
                                }} />
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={() => setOpenModal(true)}>
                            <DownloadIcon /> Save
                        </Button>
                    </Grid>

                </Grid>
            </Card>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}>
                <Box sx={style}>
                    <Button variant="contained" onClick={handleSaveImage}>
                        Download Image
                    </Button>

                </Box>
            </Modal>
        </Container >
    )
}

export default Home