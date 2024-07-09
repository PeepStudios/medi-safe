import React from 'react';
import { Link, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/logo.png'
const useStyles = makeStyles((theme) => ({
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        marginRight: theme.spacing(1),
    },
    title: {
        fontSize: '1.5rem', // Adjust as needed for larger text
    },
}));
function Logo() {
    const classes = useStyles();

    return (
        <Link href="/" underline="none" className={classes.logoContainer}>
            <Box component="img" src="../assets/logo.png" alt="MediChain Logo" className={classes.logo} />
            <Typography variant="h6" component="div" className={classes.title}>
                MediChain
            </Typography>
        </Link>
    );
}

export default Logo;
