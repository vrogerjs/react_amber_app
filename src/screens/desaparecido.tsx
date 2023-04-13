import React, { useEffect, createRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Paper, Button, Grid, CardActionArea, CardActions, CardMedia, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useResize, http } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { FileCopy, NotificationsActive, Send as SendIcon } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

function DesaparecidoDisabledExample() {

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
        const result = await (http.get(process.env.REACT_APP_PATH + '/desaparecido'));
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
                <Card>
                    <Typography gutterBottom component="div" fontSize={'20px'} className='text-center fw-bold pt-2' sx={{ textTransform: 'uppercase' }}>
                        Personas Desaparecidas menores a 17 años
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={10} className='p-3'>
                            <TextField id="outlined-basic" label="Apellidos y Nombres" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} className='p-3'>
                            <Button fullWidth className='hover-white bg-teal' variant="contained" color="success" href='http://sisgedo.regionancash.gob.pe/sisgedonew/app/main.php' target={'_blank'} startIcon={<SendIcon />}>
                                Buscar
                            </Button>
                        </Grid>
                        {desaparecidos.map(desaparecido => (
                            <Grid item xs={12} sm={6} md={4} className='p-3' key={desaparecido.id}>
                                <Card sx={{ backgroundColor: '#E0E0E0' }}>
                                    <CardActionArea className='mt-4'>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 200, height: 200, margin: 'auto' }}
                                            image={process.env.PUBLIC_URL + "/little-boy.png"}
                                            alt="Busqueda SISGEDO."
                                        />
                                        <CardContent>
                                            <Typography gutterBottom component="div" textAlign={'center'} fontSize={'20px'} fontWeight={'bold'}>
                                                {desaparecido.persona.apePaterno} {desaparecido.persona.apeMaterno} {desaparecido.persona.nombres}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary" textAlign={'center'}>
                                                Hecho ocurrido el:
                                                <br></br>
                                                {fechaHora(desaparecido.fechaHoraHecho)}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className='pl-6'>
                                        <Box sx={{ width: '100%' }}>
                                            <Button fullWidth className='hover-white mb-1' variant="contained" color="error" href={process.env.PUBLIC_URL + `/alerta/${desaparecido.id}`} startIcon={<FileCopy />}>
                                                Nota de Alerta
                                            </Button>
                                            <Button fullWidth className='hover-white bg-teal mt-1' variant="contained" color="success" href={process.env.PUBLIC_URL + `/informacion/${desaparecido.id}`} startIcon={<NotificationsActive />}>
                                                Brindar Información
                                            </Button>
                                        </Box>

                                    </CardActions>
                                    <CardActions className='text-center'>
                                        <Grid container>
                                            <Grid item xs={5}>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ height: '70', width: '70', margin: 'auto', borderRadius: '5px' }}
                                                    image={process.env.PUBLIC_URL + "/whatsap.png"}
                                                    alt="Busqueda SISGEDO."
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ height: '70', width: '70', margin: 'auto', borderRadius: '5px', border: '1px solid #009688', marginLeft: '5px' }}
                                                    image={process.env.PUBLIC_URL + "/phone.jpg"}
                                                    alt="Busqueda SISGEDO."
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Container>
        </Paper>
    );
}

export default DesaparecidoDisabledExample;