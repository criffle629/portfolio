import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import auctionBentoBanner from '../../images/auctionbentologo.png';

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
            backgroundImage: "url(" + auctionBentoBanner + ")",
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
            backgroundColor: '#247d79',
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
                    <p>Auction Bento - eBay Sellers Fee calculator for iPhone and iPad.</p>
                    <div>eBay Sellers Fee calculator was an iOS app that allowed users to quickly </div>
                    <div> calculate profitablity by calculating eBay and paypal fees.</div>
                </div>

                <div style={styles.promoText}>
                    <div>Mobile App</div>
                    <ul>
                        <li style={styles.contentText}> - Objective C</li>
                        <li style={styles.contentText}> - UIKit </li>
                    </ul>
                    <div>Backend</div>
                    <ul>
                        <li style={styles.contentText}> PHP backend with MySQL </li>
                        <li style={styles.contentText}> Serve in-house ads and affiliate ads </li>
                        <li style={styles.contentText}> Dashboard to manage ads made with HTML, Javascript and CSS</li>
                    </ul>
                </div>

                <Button style={styles.closeButton} className={classes.button} onClick={closeModal}>Close</Button>

            </div>

        </Modal>
    );
}