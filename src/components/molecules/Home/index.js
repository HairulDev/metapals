import { Button, Card, Container, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Slider, Typography, } from '@mui/material'
import React, { useEffect, useState, useRef, } from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import Draggable from 'react-draggable';

const chooseColor = [{
    color: "rgb(254, 74,73)",
},
{
    color: "rgb(42, 183,202)",
},
{
    color: "rgb(254, 215, 102)",
},
{
    color: "rgb(230, 230, 234)",
},
{
    color: "rgb(244, 244, 248)",
},
]
const Home = () => {

    const maxPrice = 72;
    const startPoint = 26;

    const initialState = {
        text: "MetaPals Awesome",
    };
    const [value, setValue] = useState(startPoint);
    const [color, setColor] = useState(chooseColor[0].color);
    const [activeIndex, setActiveIndex] = useState(0);
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

    console.log("color====>>", color);

    return (
        <Container>
            <Card sx={{ p: 2, justifyContent: "center", alignitems: "center", textAlign: "center" }}>
                <Grid container >
                    <Grid item xs={12}>
                        <Typography variant="body1" color="primary" >*The letters are draggable</Typography>
                        <Draggable>
                            <p id="p">{text}</p>
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
                                    border: index === activeIndex ? '3px solid black' : 'none' // tambahkan border jika button aktif
                                }} />
                        ))}
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}

export default Home