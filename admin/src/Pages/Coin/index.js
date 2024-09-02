import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import dayjs from 'dayjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Coin() {
    const [code, setCode] = useState('');
    const [value, setValue] = useState('');
    const [expiryDate, setExpiryDate] = useState(dayjs().format('YYYY-MM-DD')); // Use YYYY-MM-DD format

    const handleSubmit = async (e) => {
        e.preventDefault();
        const coinData = {
            code,
            value,
            expiry_date: dayjs(expiryDate).format('YYYY-MM-DD'), // Ensure expiry_date is in YYYY-MM-DD format
        };
        console.log('Submitting coin data:', coinData);


        try {
            const response = await fetch('https://token-z.com/api/coin/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coinData),
            });

            if (!response.ok) {
                throw new Error('Failed to create coin');
            }

            toast.success('Coin created successfully!');
            setCode('');
            setValue('');
            setExpiryDate(dayjs().format('YYYY-MM-DD')); // Reset to current date in the correct format

        } catch (err) {
            console.error(err.message);
            toast.error('Failed to create coin');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Create Coin
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Code"
                            type="text"
                            fullWidth
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Value"
                            type="number"
                            fullWidth
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Expiry Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                    Submit
                </Button>
            </form>
            <ToastContainer />
        </Container>
    );
}

export default Coin;



