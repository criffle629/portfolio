import React, { useState } from 'react';
import mightychickenbanner from '../../images/mightychickenlogo.png';

const MightyChickenModal = (props) => {
    const { isOpen, closeModal } = props;
    const [showGame, setShowGame] = useState(false);

    let styles = {
        background: {
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0, 0.8)',
            justifyContent: 'center',
            alignContent: 'center',
            zIndex: 20,
        },
        modal: {
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 20,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '15px'
        },
        main: {
            backgroundColor: '#ffc60b',
            borderRadius: '15px'
        },
        image: {
            display: 'flex',
            flexDirection: 'row-reverse',
            backgroundImage: 'url(' + mightychickenbanner + ')',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '15%',
            backgroundColor: '#ff3703',
            minHeight: '130px',
            margin: '0px',
            padding: 0,
            alignItems: 'center',
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px'
        },
        body: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '10px'
        },
        bodyInfo: {
            width: '450px',
            height: '600px'
        },
        bodyGame: {
            width: '450px',
            height: '600px',
            border: 0,
            borderRadius: '25px'
        },
        promoText: {
            width: '100%',
            margin: '0px',
            color: 'black',
            paddingLeft: '8px',
            paddingTop: '5px',
            fontSize: '1.25em',
        },
        contentText: {
            width: '100%',
            margin: '0px',
            color: 'black',
            fontSize: '1.25em',
        },
        footer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        linkSection: {
            display: 'flex',
            flexDirection: 'row',
            margin: '10px',
            width: '100%',
            paddingLeft: '15px'
        },
        linkText: {
            width: '50%',
            color: 'black',
            fontSize: '1.25em',
            textDecoration: 'none',
        },
        links: {
            textDecoration: 'none',
            fontSize: '1.25em'
        },
        closeButton: {
            width: '100px',
            height: '60px',
            borderRadius: '15px',
            color: 'white',
            backgroundColor: 'rgba(180, 50,50, 1)',
            fontSize: '1.25em',
            margin: '10px',
            marginRight: '30px'
        },
    };

    const close = () => {
        closeModal();
    }

    const renderModal = () => {
        if (isOpen) {
            return (
                <div style={styles.background} >
                    <div style={styles.modal}>
                        <div style={styles.main}>
                            <div style={styles.image}>  <button style={styles.closeButton} onClick={close}>
                                Close
                            </button></div>

                            <div style={styles.promoText}>
                                Dodge the mutant robo fish, killer bomb, spinning blades and poisonous arrow! Avoid getting sliced in half in the spear cave.
                            </div>
                            <div style={styles.body} >
                                <div style={styles.bodyInfo}>
                                    <div style={{ paddingTop: '5px' }}>
                                        <ul>
                                            <li style={styles.contentText}> Unity 3D on Android and iOS </li>
                                            <li style={styles.contentText}> Firebase integration </li>
                                            <li style={styles.contentText}> Admob and Unity Ads for interstitial ads and reward ads </li>
                                            <li style={styles.contentText}> Game Center integration on iOS and Google Play Services integration on Android </li>
                                            <li style={styles.contentText}> Push notification </li>
                                            <li style={styles.contentText}> In App Purchases </li>
                                        </ul>
                                    </div>
                                    <div style={styles.footer}>
                                        <div style={{ width: '100%' }}>
                                            <div style={styles.linkSection}>
                                                <span style={styles.linkText}>Apple App Store:</span> <a href='https://itunes.apple.com/us/app/mighty-chicken-and-friends/id1422459374?ls=1' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Mighty Chicken iOS</a>
                                            </div>

                                            <div style={styles.linkSection}>
                                                <span style={styles.linkText}>Google Play Store:</span>  <a href='https://play.google.com/store/apps/details?id=com.intoxic8studio.mightychicken' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Mighty Chicken Android</a>
                                            </div>

                                            <div style={styles.linkSection}>
                                                <span style={styles.linkText}>Website:</span>  <a href='http://www.themightychicken.com/' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>www.themightychicken.com</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={styles.bodyGame}>
                                    <iframe style={styles.bodyGame} frameBoarder={0} src="./games/mightychicken/index.html" title="Mighty Chicken"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    const renderGame = () => {
        return (
            <div></div>
        );
    }

    if (showGame)
        return renderGame();
    else
        return renderModal();
}

export default MightyChickenModal;