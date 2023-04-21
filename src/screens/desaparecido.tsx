import React, { useEffect, createRef, useState } from 'react';
import { Box, Paper, Button, Grid, CardActionArea, CardActions, CardMedia, CardContent, TablePagination } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useResize, http } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { FileCopy, NotificationsActive, Send as SendIcon } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import Alert from '@mui/material/Alert';
import MapWrapper from './MapWrapper'

function DesaparecidoDisabledExample() {

    const formRef: any = createRef();

    const { width, height } = useResize(React);

    const [desaparecidos, setDesaparecidos] = useState([] as any);

    const [state, setState] = useState({ page: 0, rowsPerPage: 15, totalElements: 0 });

    const [result, setResult] = useState({ size: 0, data: [] });

    const dispatch = useDispatch();

    useEffect(() => {

        let header: HTMLElement | null = document.querySelector('.MuiToolbar-root');
        let paper: HTMLElement | null = document.querySelector('.page');
        if (header && paper) {
            paper.style.height = (height - header.offsetHeight) + 'px';
        }

    }, [width, height]);

    const emptyRows = result.data && result.data.length;

    const onPageChange = (
        event, page
    ) => {
        console.log(page);
        setState({ ...state, page: page });
    };

    const onRowsPerPageChange = (
        event
    ) => {
        setState({ ...state, rowsPerPage: event.target.value });
    };

    useEffect(() => {
        fetchData(state.page)
    }, [state.page, state.rowsPerPage]);

    const fetchData = async (page) => {
        var data = { data: [], size: 0 };
        const result = await (http.get(import.meta.env.VITE_APP_PATH + '/desaparecido/' + page + '/' + state.rowsPerPage + '?estado=0'));
        if (result !== '') {
            data.size = result.size;
            state.totalElements = result.totalElements;
            data.data = data.data.concat(result.content);
        }
        setResult(data);
        console.log(data);
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
                        {/* <Grid item xs={12} sm={12} md={10} className='p-3'>
                            <TextField id="outlined-basic" label="Apellidos y Nombres" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={12} md={2} className='p-3'>
                            <Button fullWidth className='hover-white bg-teal' variant="contained" color="success" href='http://sisgedo.regionancash.gob.pe/sisgedonew/app/main.php' target={'_blank'} startIcon={<SendIcon />}>
                                Buscar
                            </Button>
                        </Grid> */}
                        {(result && result.data && result.data.length ? result.data : [])
                            .map((row: any, index) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} className='p-3'>
                                        <Card sx={{ backgroundColor: '#E0E0E0' }}>
                                            <CardActionArea className='mt-4'>
                                                <img
                                                    alt="Foto"
                                                    height={'200px'}
                                                    width={'150px'}
                                                    src={row.persona.foto ? 'data:image/png;base64, ' + row.persona.foto : (import.meta.env.VITE_PUBLIC_URL + "/male-female.jpg")}
                                                    style={{ display: 'block', margin: '0 auto' }}
                                                />
                                                {/* <img alt="Foto" height={'200px'} width={'150px'} src={row.persona.foto ? 'data:image/png;base64, ' + row.persona.foto : (import.meta.env.VITE_PUBLIC_URL + "/male-female.jpg")} /> */}
                                                <CardContent>
                                                    <Typography gutterBottom component="div" textAlign={'center'} fontSize={'20px'} fontWeight={'bold'}>
                                                        {row.persona.apePaterno} {row.persona.apeMaterno} {row.persona.nombres}
                                                    </Typography>
                                                    <Typography variant="body1" color="text.secondary" textAlign={'center'}>
                                                        Hecho ocurrido el:
                                                        <br></br>
                                                        {fechaHora(row.fechaHoraHecho)}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions className='pl-6'>
                                                <Grid item xs={12} md={12}>
                                                    <MapWrapper
                                                        location={[row.longitud ? row.longitud : -77.52888423325149, row.latitud ? row.latitud : -9.529897122270743]}
                                                        features={[]} onChange={(e:any) => {console.log(e)}} />
                                                </Grid>

                                                <Box sx={{ width: '100%' }}>
                                                    <Button fullWidth className='hover-white mb-1' variant="contained" color="error" href={import.meta.env.VITE_PUBLIC_URL + `/alerta/${row.id}`} startIcon={<FileCopy />}>
                                                        Nota de Alerta
                                                    </Button>
                                                    <Button fullWidth className='hover-white bg-teal mt-1' variant="contained" color="success" href={import.meta.env.VITE_PUBLIC_URL + `/informacion/${row.id}`} startIcon={<NotificationsActive />}>
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
                                                            image={import.meta.env.VITE_PUBLIC_URL + "/whatsap.png"}
                                                            alt="Busqueda SISGEDO."
                                                        />
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <CardMedia
                                                            component="img"
                                                            sx={{ height: '70', width: '70', margin: 'auto', borderRadius: '5px', border: '1px solid #009688', marginLeft: '5px' }}
                                                            image={import.meta.env.VITE_PUBLIC_URL + "/phone.jpg"}
                                                            alt="Busqueda SISGEDO."
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                );
                            })}
                    </Grid>

                    {/* <Card
                        sx={{
                            backgroundColor: '#4CAF50',
                            borderRadius: '8px',
                            color: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '5px', // Para evitar que el contenedor se colapse cuando no hay suficientes elementos
                        }}
                    >
                        <CardActions>
                            <TablePagination
                                rowsPerPageOptions={[15, 30, 60]}
                                component="div"
                                count={state.totalElements}
                                rowsPerPage={state.rowsPerPage}
                                page={state.page}
                                onPageChange={onPageChange}
                                onRowsPerPageChange={onRowsPerPageChange}
                            />
                        </CardActions>
                    </Card> */}


                    <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TablePagination
                            rowsPerPageOptions={[15, 30, 60]}
                            component="div"
                            count={state.totalElements}
                            rowsPerPage={state.rowsPerPage}
                            page={state.page}
                            onPageChange={onPageChange}
                            onRowsPerPageChange={onRowsPerPageChange}
                        />
                    </CardActions>
                </Card>
            </Container>
            {/* <Alert icon={false} severity="success" sx={{ textAlign: 'center' }}>

            </Alert> */}
            {(!emptyRows) && (
                <Typography gutterBottom component="div" fontSize={'20px'} className='text-center fw-bold pt-2' sx={{ textTransform: 'uppercase' }}>
                    No data
                </Typography>
            )}
        </Paper>
    );
}

export default DesaparecidoDisabledExample;