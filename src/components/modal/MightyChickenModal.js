import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import mightychickenbanner from '../../images/mightychickenlogo.png';

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
            backgroundImage: "url(" + mightychickenbanner + ")",
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
            height: '65%',
            backgroundColor: 'rgb(100%, 54.9%, 0%)',
            border: '0px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: 'none'
        },
        button: {
            backgroundColor: 'rgb(78.8%, 43.4%, 0.2%)',
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
                    Dodge the mutant robo fish, killer bomb, spinning blades and poisonous arrow! Avoid getting sliced in half in the spear cave.
                </div>

                <div style={styles.promoText}>
                    <div style={styles.contentText}> - Unity 3D on Android and iOS </div>
                    <div style={styles.contentText}> - Firebase integration </div>
                    <div style={styles.contentText}> - Admob and Unity Ads for interstitial ads and reward ads </div>
                    <div style={styles.contentText}> - Game Center integration on iOS and Google Play Services integration on Android </div>
                    <div style={styles.contentText}> - Push notification </div>
                    <div style={styles.contentText}> - In App Purchases </div>
                </div>
                
                <div style={{ width: '100%' }}>
                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Apple App Store:</span> <a href='https://itunes.apple.com/us/app/mighty-chicken-and-friends/id1422459374?ls=1' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Mighty Chicken iOS</a>
                    </div>
                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Google Play Store:</span>  <a href='https://play.google.com/store/apps/details?id=com.intoxic8studio.mightychicken' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Mighty Chicken Android</a>
                    </div>
                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Website:</span>  <a href='http://www.themightychicken.com/' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Mighty Chicken</a>
                    </div>
                </div>
                <Button style={styles.closeButton} className={classes.button} onClick={closeModal}>Close</Button>
            </div>
        </Modal>
    );
}