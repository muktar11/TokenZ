import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const YouTube = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset the error state

        // Validate the URL before submitting
        const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
        if (!urlPattern.test(url)) {
            setError('Please enter a valid URL');
            toast.error('Please enter a valid URL'); // Show error toast
            return;
        }

        try {
            const response = await fetch('https://token-z.com/api/youtube/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit the URL');
            }

            // Handle success
            toast.success('URL submitted successfully'); // Show success toast
            setUrl(''); // Clear the input field after successful submission

        } catch (err) {
            console.error(err.message);
            toast.error('Failed to submit the URL'); // Show error toast
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Upload Video
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="URL"
                            type="url"
                            fullWidth
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            helperText={error || "Please enter a valid URL"}
                            error={!!error}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                    Submit
                </Button>
            </form>
            <ToastContainer /> {/* Add ToastContainer to your component */}
        </Container>
    );
};

export default YouTube;
