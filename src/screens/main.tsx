import React, { useEffect, createRef, useState } from 'react';
import { Paper, Button, Grid, CardActionArea, CardActions, CardMedia, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useResize, http } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { Send as SendIcon } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

function MainDisabledExample() {

    const formRef: any = createRef();

    const { width, height } = useResize(React);

    const [desaparecidos, setDesaparecidos] = useState([] as any);

    useEffect(() => {

        let header: HTMLElement | null = document.querySelector('.MuiToolbar-root');
        let paper: HTMLElement | null = document.querySelector('.page');
        if (header && paper) {
            paper.style.height = (height - header.offsetHeight) + 'px';
        }

    }, [width, height]);

    const onSubmit = data => console.log(data);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const result = await (http.get(  import.meta.env.VITE_APP_PATH + '/desaparecido'));
        if (result !== '') {
            setDesaparecidos(result);
        }
    };

    function fechaHora(timestamp) {
        const fecha = new Date(timestamp);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        let hora = fecha.getHours();
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        const segundos = fecha.getSeconds().toString().padStart(2, '0');
        const amPm = hora >= 12 ? 'PM' : 'AM';
        hora = hora % 12;
        hora = hora ? hora : 12;
        return `${dia}/${mes}/${anio}  ${hora}:${minutos}:${segundos} ${amPm}`;
    }

    return (
        <Paper className="page color-plomo" style={{ overflow: 'auto' }}>
            <Container maxWidth="lg">
                <Card className='mt-4' sx={{backgroundColor:'#FFCDD2'}}>
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

                <Card className='mt-4' sx={{backgroundColor:'#C8E6C9'}}>
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