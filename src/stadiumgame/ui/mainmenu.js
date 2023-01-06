import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

export default props => {
    const { isOpen, closeModal } = props;

    let styles = {
        modal: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
        },
        title: {
            width: '100%',
            margin: '10px',
            color: 'white',
            fontSize: '60px',
            textAlign: 'center',
            position: 'absolute'
        },
        buttonGroup: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '10px',
            color: 'white',
            justifyContent: 'center'
        },
        buttons: {
            marginTop: '10px',
            color: 'white',
        }
    }

    const useStyles = makeStyles((theme) => ({
        main: {
            position: 'absolute',
            width: 600,
            height: '75%',
            backgroundColor: 'rgb(100%, 100%, 100%, 0%)',
            border: '0px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: 'none'
        },
        button: {
            backgroundColor: 'rgb(29.9%, 28.2%, 37.8%)',
            border: '0px solid #000',
            boxShadow: theme.shadows[5],
            width: '25%',
            padding: theme.spacing(2, 4, 3),
            outline: 'none'
        },
    }));

    const classes = useStyles();

    function practiceClicked() {
        closeModal();
    }

    function multiplayerClicked() { }
    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div>
                <div style={styles.title}>
                    Road Racer League
                </div>
                <div style={styles.modal} className={classes.main}>
                    <div style={styles.buttonGroup}>
                        <Button style={styles.buttons} className={classes.button} onClick={practiceClicked}>Practice</Button>
                        <Button style={styles.buttons} className={classes.button} onClick={multiplayerClicked}>Multiplayer</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}