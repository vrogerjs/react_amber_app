import { useEffect, useState, createRef } from 'react';
import { Box, Container, Button, Grid, CardActionArea, CardActions, CardContent, TablePagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useResize, http } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { FileCopy } from '@mui/icons-material';

function UbicadoDisabledExample() {

    const formRef: any = createRef();

    const viewRef: any = createRef();

    const [state, setState] = useState({ page: 0, rowsPerPage: 15, totalElements: 0 });

    const [result, setResult] = useState({ size: 0, data: [] });

    useResize(({ width, height }: any) => {
        if (formRef.current) {
            const [body, toolBar]: any = formRef.current.children;
            toolBar.style.width = width + 'px';
            body.style.height = (height - toolBar.offsetHeight) + 'px';
            body.style.width = width + 'px';
        }
    }, viewRef);

    const emptyRows = result.data && result.data.length;

    const onPageChange = (
        page: any
    ) => {
        setState({ ...state, page: page });
    };

    const onRowsPerPageChange = (
        event: any
    ) => {
        setState({ ...state, rowsPerPage: event.target.value });
    };

    useEffect(() => {
        fetchData(state.page)
    }, [state.page, state.rowsPerPage]);

    const fetchData = async (page: any) => {
        const data = { data: [], size: 0 };
        const result = await (http.get(import.meta.env.VITE_APP_PATH + '/desaparecido/' + page + '/' + state.rowsPerPage + '?estado=1'));
        if (result !== '') {
            data.size = result.size;
            state.totalElements = result.totalElements;
            data.data = data.data.concat(result.content);
        }
        setResult(data);
    };

    function fechaHora(timestamp: any) {
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
        <Container maxWidth="lg">
            <Card>
                <Typography gutterBottom component="div" fontSize={'20px'} className='text-center fw-bold pt-2' sx={{ textTransform: 'uppercase' }}>
                    Personas Ubicadas menores a 17 años
                </Typography>
                <Grid container>
                    {(result && result.data && result.data.length ? result.data : [])
                        .map((row: any) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} className='p-3' key={row.id}>
                                    <Card sx={{ backgroundColor: '#E0E0E0' }}>
                                        <CardActionArea className='mt-4'>
                                            <img
                                                alt="Foto"
                                                height={'200px'}
                                                width={'150px'}
                                                src={row.persona.foto ? 'data:image/png;base64, ' + row.persona.foto : (import.meta.env.VITE_PUBLIC_URL + "/male-female.jpg")}
                                                style={{ display: 'block', margin: '0 auto' }}
                                            />
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
                                            <Box sx={{ width: '100%' }}>
                                                <Button fullWidth className='hover-white mb-1' variant="contained" color="error" href={import.meta.env.VITE_PUBLIC_URL + `/alerta/${row.id}`} startIcon={<FileCopy />}>
                                                    Nota de Alerta
                                                </Button>
                                            </Box>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                </Grid>
                {(!emptyRows) && (
                    <Typography gutterBottom component="div" fontSize={'20px'} className='text-center fw-bold pt-2' sx={{ textTransform: 'uppercase' }}>
                        No existen datos.
                    </Typography>
                )}
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
    );
}

export default UbicadoDisabledExample;