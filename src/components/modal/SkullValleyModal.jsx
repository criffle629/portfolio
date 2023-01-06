import React from 'react'
 
import skullValleyBanner from '../../images/skullvalleylogo.png'

const SkullValleyModal = (props) => {
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
    },
    main: {
      backgroundColor: '#e37a00',
      borderRadius: '15px'

    },
    image: {
      display: 'flex',
      flexDirection: 'row-reverse',
      backgroundImage: 'url(' + skullValleyBanner + ')',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '20%',
      backgroundColor: '#ae1209',
             alignItems: 'center',
      minHeight: '150px',
      margin: '0px',
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
      height: '700px'
    },
    bodyGame: {

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
      backgroundColor: '#56b05c',
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

                Dodge obstacles and traps to escape a clumbsy death.
              </div>
              <div style={styles.body} >
                <div style={styles.bodyInfo}>
                  <div style={{ paddingTop: '5px' }}>
                    <ul>
                      <li style={styles.contentText}> Unity 3D on Android and iOS </li>
                      <li style={styles.contentText}> Firebase integration </li>
                      <li style={styles.contentText}>
                        {' '}
                        Admob and Unity Ads for interstitial ads and reward ads{' '}
                      </li>
                      <li style={styles.contentText}>
                        {' '}
                        Game Center integration on iOS and Google Play Services
                        integration on Android{' '}
                      </li>
                      <li style={styles.contentText}>
                        {' '}
                        Sharable video replays encoded with ffmpeg on both Android and iOS{' '}
                      </li>
                      <li style={styles.contentText}> Push notification </li>
                      <li style={styles.contentText}> In App Purchases </li>
                      <li style={styles.contentText}> Procedurally generated levels </li>
                      <li style={styles.contentText}>
                        {' '}
                        Native plugins coded in C++ and Objective C on iOS{' '}
                      </li>
                      <li style={styles.contentText}>
                        {' '}
                        Native plugins include, native gesture processing, image and video
                        sharing, video encoding{' '}
                      </li>
                      <li style={styles.contentText}> Timed reward events </li>
                    </ul>
                  </div>

                  <div style={styles.footer}>
                    <div style={{ width: '100%' }}>
                      <div style={styles.linkSection}>
                        <span style={styles.linkText}>Apple App Store:</span>
                        <a
                          href="https://apps.apple.com/us/app/skull-valley/id988550485"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.links}
                        >
                          Skull Valley iOS
                        </a>
                      </div>

                      <div style={styles.linkSection}>
                        <span style={styles.linkText}>Google Play Store:</span>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.intoxic8studio.skullvalley"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.links}
                        >
                          Skull Valley Android
                        </a>
                      </div>

                      <div style={styles.linkSection}>
                        <span style={styles.linkText}>Website:</span>
                        <a
                       href="http://www.skullvalleygame.com"
                       target="_blank"
                       rel="noopener noreferrer"
                       style={styles.links}
                        >
                         www.skullvalley.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={styles.bodyGame}>
                  <iframe style={styles.bodyGame} frameBoarder={0} src="./games/skullvalley/index.html" title="SkullValley"></iframe>
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

export default SkullValleyModal;
