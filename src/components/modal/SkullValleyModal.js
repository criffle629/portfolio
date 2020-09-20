import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import skullvalleybanner from '../../images/skullvalleylogo.png';

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
            width: 'auto',
        },
        image: {
            backgroundImage: "url(" + skullvalleybanner + ")",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
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
        linkSection: {
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
            width: '600px',
            height: '65%',
            backgroundColor: '#247d79',
            border: '0px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: 'none',
            minWidth: '400px'
        },
        button: {
            backgroundColor: '#134c49',
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
            aria-describedby="simple-modal-description">

            <div style={styles.modal} className={classes.main}>

                <div style={styles.image}></div>

                <div style={styles.promoText}>
                    Skull Valley is an iOS and Android game currently in development.  Dodge obstacles and traps to escape a clumbsy death.
                </div>

                <div style={styles.promoText}>
                    <ul>
                        <li style={styles.contentText}> Unity 3D on Android and iOS </li>
                        <li style={styles.contentText}> Firebase integration </li>
                        <li style={styles.contentText}> Admob and Unity Ads for interstitial ads and reward ads </li>
                        <li style={styles.contentText}> Game Center integration on iOS and Google Play Services integration on Android </li>
                        <li style={styles.contentText}> Push notification </li>
                        <li style={styles.contentText}> In App Purchases </li>
                        <li style={styles.contentText}> Procedurally generated levels </li>
                        <li style={styles.contentText}> Native plugins coded in C++ and Objective C </li>
                        <li style={styles.contentText}> Timed reward events </li>
                    </ul>
                </div>

                <div style={{ width: '100%' }}>
                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Website:</span>  <a href='http://www.skullvalleygame.com' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Skull Valley</a>
                    </div>
                </div>

                <Button style={styles.closeButton} className={classes.button} onClick={closeModal}>Close</Button>

            </div>

        </Modal>
    );
}