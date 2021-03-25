import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import useAuth from '../../context/Auth';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function Setup() {
    const classes = useStyles();
    const { createSuperAdmin } = useAuth();

    useEffect(() => {
        createSuperAdmin();
    }, []);

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <SettingsIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    There is always a first time. <br /> This won't be long.
                </Typography>
            </div>
        </Container>
    );
}