import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import roadracerbanner from '../../images/roadracerlogo.png';

export default props => {
    const { isOpen, closeModal } = props;

    const top = 50;
    const left = 50;

    let styles = {
        modal: {
            display: 'flex',
            flexDirection: 'column',
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        },
        image: {
            backgroundImage: "url(" + roadracerbanner + ")",
            backgorundSize: "cover",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: "100%",
            height: "30%",
            margin: '10px'
        },
        promoText: {
            width: '100%',
            margin: '10px',
            color: 'white',
        },
        contentText: {
            width: '100%',
            margin: '10px',
            color: 'white',
        },
        linkSection:{
            display: 'flex',
            flexDirection: 'row',
        },
        linkText: {
            

            width: '150px',
            color: 'white',
        },
        closeButton: {
            marginTop: '10px',
            color: 'white',
        }
    }

    const useStyles = makeStyles((theme) => ({
        main: {
            position: 'absolute',
            width: 600,
            height: '75%',
            backgroundColor: 'rgb(40.9%, 38.5%, 52.3%)',
            border: '0px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: 'none'
        },
        button: {
            backgroundColor: 'rgb(29.9%, 28.2%, 37.8%)',
            border: '0px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: 'none'
        },
    }));

    const classes = useStyles();

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >

            <div style={styles.modal} className={classes.main}>
                <div style={styles.image}></div>
                <div style={styles.promoText}>
                    Tilt to steer, swipe to jump over obstacles, buy cars to unlock Powerups and collect coins to upgrade them, collect gears for rewinds and see how far you can race!
                </div>

                <div style={styles.promoText}>
                    <div style={styles.contentText}> - Custom C++ engine on iOS </div>
                    <div style={styles.contentText}> - Unity 3D on Android and Windows Phone </div>
                    <div style={styles.contentText}> - PHP and MYSQL backend to facilitate in game events and app usage insight </div>
                    <div style={styles.contentText}> - Firebase integration </div>
                    <div style={styles.contentText}> - Admob for interstitial ads and reward ads </div>
                    <div style={styles.contentText}> - Game Center integration on iOS and Google Play Services integration on Android </div>
                    <div style={styles.contentText}> - Push notification </div>
                    <div style={styles.contentText}> - In App Purchases (consumable and non-consumable) </div>
                    <div style={styles.contentText}> - Procedurally generated levels </div>
                </div>
                <div style={{ width: '100%' }}>
                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Apple App Store:</span> <a href='https://itunes.apple.com/us/app/road-racer/id575817068?mt=8' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Road Racer</a>
                    </div>
                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Google Play Store:</span>  <a href='https://play.google.com/store/apps/details?id=com.intoxic8studio.roadracer' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Road Racer 168</a>
                    </div>
                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Website:</span>  <a href='http://intoxic8studio.com/' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Intoxic8 Studio LLC</a>
                    </div>
                </div>
                <Button style={styles.closeButton} className={classes.button} onClick={closeModal}>Close</Button>
            </div>
        </Modal>
    );
}