import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import pawsnfindBanner from '../../images/pawsnfind.png';

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
            backgroundImage: "url(" + pawsnfindBanner + ")",
            backgroundSize: "contain",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: "100%",
            height: "30%",
            margin: '0px'
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
            minWidth: '400px',
            height: '65%',
            backgroundColor: '#235775',
            border: '0px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            outline: 'none'
        },
        button: {
            backgroundColor: '#558a9d',
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
                    Animal Rescue organizations have so much to manage, but their biggest concern is making sure pets go to a great home.
                    Pawsnfind allows rescues to manage their operations while making it easier for adopters to find their perfect pet and connect with the rescue.
                </div>

                <div style={styles.promoText}>
                    <div style={styles.contentText}> - React frontend with MaterialUI</div>
                    <div style={styles.contentText}> - Redux </div>
                    <div style={styles.contentText}> - Serparate dashboard for animal rescues and adopters </div>
                    <div style={styles.contentText}> - Express.js backend with a Postgres database</div>
                    <div style={styles.contentText}> - Stripe integration for rescues to receive donations. </div>
                    <div style={styles.contentText}> - Bank accounts can be verified with stripe directly from Pawsnfind's dashboard </div>
                    <div style={styles.contentText}> - Image hosting (Uploading and retrieval of images) using PHP and MySQL </div>
                    <div style={styles.contentText}> - React frontend for image hosting for the creation of new accounts and api keys </div>
                </div>

                <div style={{ width: '100%' }}>

                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Website:</span>  <a href='https://pawsnfind.com' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>www.pawsnfind.com</a>
                    </div>
                    <div style={styles.linkSection}>
                        <span style={styles.linkText}>Github:</span> <a href='https://github.com/Pawsnfind' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>https://github.com/Pawsnfind</a>
                    </div>
                </div>

                <Button style={styles.closeButton} className={classes.button} onClick={closeModal}>Close</Button>

            </div>
            
        </Modal>
    );
}