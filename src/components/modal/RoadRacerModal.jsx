import React from 'react'
import roadracerbanner from '../../images/roadracerlogo.png'

const RoadRacerModal = (props) => {
  const { isOpen, closeModal } = props;

  let styles = {
    background: {
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0, 0.8)',
      justifyContent: 'center',
      alignContent: 'center',
      zIndex: 20,
      position: 'relative'
    },
    modal: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      zIndex: 20,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '100%'
    },
    main: {
      borderRadius: '15px',
      backgroundColor: '#fbb921'
    },
    image: {
      display: 'flex',
      flexDirection: 'row-reverse',
      backgroundImage: 'url(' + roadracerbanner + ')',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '20%',
      backgroundColor: '#8bc43f',
      alignItems: 'center',
      minHeight: '20%',
      margin: '0px',
      borderTopLeftRadius: '14px',
      borderTopRightRadius: '14px'
    },
    body: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '10px',
      backgroundColor: '#fbb921'
    },
    bodyInfo: {
      backgroundColor: '#fbb921',
      width: '450px',
      height: ' 80%'
    },
    bodyGame: {
      backgroundColor: '#fbb921',
      width: '800px',
      height: '510px',
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

              <div style={styles.promoText} >
                Tilt to steer, swipe to jump over obstacles, buy cars to unlock Powerups and collect coins to upgrade them, collect gears for rewinds and see how far you can race!              </div>
              <div style={styles.body} >
                <div style={styles.bodyInfo}>
                  <div style={{ paddingTop: '5px' }}>
                    <ul>
                      <li style={styles.contentText}> Custom C++ enagine on iOS</li>
                      <li style={styles.contentText}> Unity 3D on Android and Windows Phone </li>
                      <li style={styles.contentText}> PHP and MYSQL backend to facilitate in game events and app usage insights </li>
                      <li style={styles.contentText}> Firebase integration </li>
                      <li style={styles.contentText}> Admob for interstitial ads and reward ads </li>
                      <li style={styles.contentText}> Push notification </li>
                      <li style={styles.contentText}> In App Purchases (consumable and non-consumable)</li>
                      <li style={styles.contentText}> Procedurally generated levels </li>
                      <li style={styles.contentText}> Game Center integration on iOS and Google Play Services integration on Android </li>
                    </ul>
                  </div>

                  <div style={styles.footer}>
                    <div style={{ width: '100%' }}>
                      <div style={styles.linkSection}>
                        <span style={styles.linkText}>Apple App Store:</span>
                        <a
                          href="https://itunes.apple.com/us/app/road-racer/id575817068?mt=8"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.links}
                        >
                          Road Racer iOS
                        </a>
                      </div>

                      <div style={styles.linkSection}>
                        <span style={styles.linkText}>Google Play Store:</span>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.intoxic8studio.roadracer"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.links}
                        >
                          Road Racer Android
                        </a>
                      </div>

                      <div style={styles.linkSection}>
                        <span style={styles.linkText}>Website:</span>
                        <a
                          href="https://www.intoxic8studio.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.links}
                        >
                          www.intoxic8studio.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={styles.bodyGame}>
                  <iframe style={styles.bodyGame} frameBoarder={0} src="./games/roadracer/index.html" title="RoadRacer"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return renderModal();
}
export default RoadRacerModal;
