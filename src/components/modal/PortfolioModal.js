import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
            width: '30vw',
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

                <div style={styles.promoText}>
                    <div style={styles.contentText}> Frontend </div>
                    <ul>
                        <li style={styles.contentText}> React </li>
                        <li style={styles.contentText}> Three.js </li>
                        <li style={styles.contentText}> Ammo.js </li>
                        <li style={styles.contentText}> Gamepad Support </li>
                    </ul>
                    <div style={styles.contentText}> Backend</div>
                    <ul>
                        <li style={styles.contentText}> Express </li>
                        <li style={styles.contentText}> Socket.io </li>
                    </ul>
                    <div style={styles.contentText}> Tools Used </div>
                    <ul>
                        <li style={styles.contentText}> Blender </li>
                        <li style={styles.contentText}> Gimp </li>
                        <li style={styles.contentText}> Inkscape </li>
                    </ul>
                </div>

                <div style={{ width: '100%' }}>

                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Github:</span> <a href='https://github.com/criffle629/portfolio' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>https://github.com/criffle629/portfolio</a>
                    </div>
                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Portfolio:</span>  <a href='http://www.chrisriffle.dev' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Portfolio</a>
                    </div>
                </div>

                <Button style={styles.closeButton} className={classes.button} onClick={closeModal}>Close</Button>

            </div>

        </Modal>
    );
}