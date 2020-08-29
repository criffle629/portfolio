import React from 'react';
import Modal from 'react-modal';
import roadracerbanner from '../../images/roadracerlogo.png';

export default props => {
    const { isOpen, closeModal } = props;

    let styles = {
        modal: {
            content: {
                position: 'fixed',
    
        
            
            }
        },
        image: {
            backgroundImage: "url(" + roadracerbanner + ")",
            backgorundSize: "cover",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: "100%",
            height: "25%"
        }
    }

    return (
        
        <Modal
            style={styles.modal}
            id='road-racer'
            isOpen={isOpen}>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', margin: '10px' }}>
                <div style={styles.image}></div>
                <button onClick={closeModal}>Close</button>
            </div>

        </Modal>
    );
}
