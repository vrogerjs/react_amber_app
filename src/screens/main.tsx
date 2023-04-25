import React, { useEffect } from 'react';
import { Paper, Button, Grid, CardMedia } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useResize } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { Send as SendIcon } from '@mui/icons-material';

function MainDisabledExample() {

    const { width, height } = useResize(React);

    useEffect(() => {
        const header: HTMLElement | null = document.querySelector('.MuiToolbar-root');
        const paper: HTMLElement | null = document.querySelector('.page');
        if (header && paper) {
            paper.style.height = (height - header.offsetHeight) + 'px';
        }
    }, [width, height]);

    return (
        <Paper className="page color-plomo" style={{ overflow: 'auto' }}>
            <Container maxWidth="lg">
                <Card className='mt-4' sx={{ backgroundColor: '#FFCDD2' }}>
                    <Grid container>
                        <Grid item xs={12} sm={3} md={3}>
                            <CardMedia
                                component="img"
                                sx={{ width: 200, height: 200, margin: 'auto' }}
                                image={import.meta.env.VITE_PUBLIC_URL + "/little-boy.png"}
                                alt="Silueta de niña"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className='text-center mt-4'>
                            <Typography component="div" variant="h4" sx={{ fontWeight: 'bold' }}>
                                PERSONAS DESAPARECIDAS
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontWeight: 'bold' }} className='mt-1'>
                                CONOCE LA LISTA DE PERSONAS DESAPARECIDAS DE 0 A 17 AÑOS
                            </Typography>
                            <Button className='hover-white bg-teal mt-1' variant="contained" color="success" href={import.meta.env.VITE_PUBLIC_URL + "/desaparecido"} startIcon={<SendIcon />}>
                                CLICK AQUÍ
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            <CardMedia
                                component="img"
                                sx={{ width: 200, height: 200, margin: 'auto' }}
                                image={import.meta.env.VITE_PUBLIC_URL + "/little-girl.png"}
                                alt="Silueta de niña"
                            />
                        </Grid>
                    </Grid>
                </Card>

                <Card className='mt-4' sx={{ backgroundColor: '#C8E6C9' }}>
                    <Grid container>
                        <Grid item xs={12} sm={3} md={3}>
                            <CardMedia
                                component="img"
                                sx={{ width: 200, height: 200, margin: 'auto' }}
                                image={import.meta.env.VITE_PUBLIC_URL + "/little-boy.png"}
                                alt="Silueta de niña"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className='text-center mt-4'>
                            <Typography component="div" variant="h4" sx={{ fontWeight: 'bold' }}>
                                PERSONAS UBICADAS
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontWeight: 'bold' }} className='mt-1'>
                                CONOCE LA LISTA DE PERSONAS UBICADAS DE 0 A 17 AÑOS
                            </Typography>
                            <Button className='hover-white bg-teal mt-1' variant="contained" color="success" href={import.meta.env.VITE_PUBLIC_URL + "/encontrado"} startIcon={<SendIcon />}>
                                CLICK AQUÍ
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            <CardMedia
                                component="img"
                                sx={{ width: 200, height: 200, margin: 'auto' }}
                                image={import.meta.env.VITE_PUBLIC_URL + "/little-girl.png"}
                                alt="Silueta de niña"
                            />
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </Paper>
    );
}

export default MainDisabledExample;