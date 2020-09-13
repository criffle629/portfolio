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
            width: 'auto',
            transform: `translate(-${top}%, -${left}%)`,
        },
        title: {
            width: '100%',
            margin: '10px',
            color: 'white',
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

                <div style={styles.title}>
                        Road Racer League
                </div>

                <Button style={styles.buttons} className={classes.button} onClick={closeModal}>Close</Button>
                
            </div>
        </Modal>
    );
}