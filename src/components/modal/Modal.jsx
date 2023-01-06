import React, { useState, useEffect } from 'react';
import './modal.css';

const Modal = (props) => {
    const { isOpen,
        closeModal,
        content } = props;

    const [showGame, setShowGame] = useState(false);

    useEffect(() => {
        document.documentElement.style.setProperty('--background-color', content.backgroundColor);
        document.documentElement.style.setProperty('--main-background-color', content.mainBackgroundColor);
        document.documentElement.style.setProperty('--background-image', content.backgroundImage);
        document.documentElement.style.setProperty('--background-image-size', content.backgroundImageSize);
        document.documentElement.style.setProperty('--background-image-color', content.backgroundImageColor);
        document.documentElement.style.setProperty('--promo-text-color', content.promoTextColor);
        document.documentElement.style.setProperty('--content-text-color', content.contentTextColor);
        document.documentElement.style.setProperty('--line-text-color', content.lineTextColor);
        document.documentElement.style.setProperty('--close-button-color', content.closeButtonColor);
        document.documentElement.style.setProperty('--close-button-background-color', content.closeButtonBackgroundColor);
        document.documentElement.style.setProperty('--game-body-width', content.gameBodyWidth);
        document.documentElement.style.setProperty('--game-body-height', content.gameBodyHeight);
        document.documentElement.style.setProperty('--info-body-width', content.infoBodyWidth);
        document.documentElement.style.setProperty('--info-body-height', content.infoBodyHeight);
    });

    const close = () => {
        closeModal();
    }

    const renderGame = () => {
    }

    const renderModal = () => {
        if (isOpen) {
            return (
                <div className='background'>
                    <div className='modal'>
                        <div className='main'>
                            <div className='image'>
                                <button className='closeButton' onClick={close}>
                                    Close
                                </button></div>

                            <div className='promoText'>
                                {content.promoText}
                            </div>
                            <div className='body' >
                                <div className='bodyInfo'>
                                    <div style={{ paddingTop: '5px' }}>
                                        <ul>
                                            {content.contentText.map((text, index) => {
                                                return (<li className='contentText' key={index}> {text} </li>);
                                            })}
                                        </ul>
                                    </div>
                                    <div className='footer'>
                                        <div style={{ width: '100%' }}>
                                            {content.links.map((link, index) => {
                                                return (
                                                    <div className='linkSection' key={index}>
                                                        <span className='linkText'>{link.label}</span> <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{link.name}</a>
                                                    </div>);
                                            })}
                                        </div>
                                    </div>
                                </div>
                                {renderGame()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    
    return renderModal();
}

export default Modal;