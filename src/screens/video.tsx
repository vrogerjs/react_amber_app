import { createRef } from 'react';
import { Box, Paper, Button, Grid, CardActions, CardContent, Container, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useResize } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { ReplyAll } from '@mui/icons-material';

function MainDisabledExample() {

    const formRef: any = createRef();

    const viewRef: any = createRef();

    useResize(({ width, height }: any) => {
        if (formRef.current) {
            const [body, toolBar]: any = formRef.current.children;
            toolBar.style.width = width + 'px';
            body.style.height = (height - toolBar.offsetHeight) + 'px';
            body.style.width = width + 'px';
        }
    }, viewRef);

    return (
        <Paper className="page color-plomo" style={{ overflow: 'auto' }}>
            <Container maxWidth="lg" >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Card className='mt-2 bg-gore'>
                        <CardContent className='pb-0'>
                            <Typography gutterBottom component="div" fontSize={'30px'} className='text-center fw-bold' color={'white'}>
                                VIDEO TUTORIAL DE ATENCIÓN AL CIUDADANO
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Box sx={{ maxWidth: '100%', textAlign: 'center' }}>
                                        <video style={{ maxWidth: '90%', border: '5px solid #fff' }} controls src="https://web.regionancash.gob.pe/fs/upload/tutorial_atencion_ciudadano.mp4" />
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Button
                                        sx={{ fontWeight: 'bold' }}
                                        className='bg-teal hover-white'
                                        fullWidth
                                        href={import.meta.env.VITE_PUBLIC_URL}
                                        variant="contained" color="primary"
                                        endIcon={<ReplyAll />}>
                                        Atras
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </LocalizationProvider>
            </Container>
        </Paper>
    );
}

export default MainDisabledExample;