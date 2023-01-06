import React from 'react';
import Modal from './Modal';
import portfolioBanner from '../../images/chris.png';

const PortfolioModal = (props) => {


    const { isOpen, closeModal } = props;

    const content = {
        promoText: '',
        contentText: [
             'Frontend',
             ' - React',
             ' - three.js',
             ' - ammo.js',
             ' - Gamepad support',
             '',
            'Backend',
             ' - Express.js',
             ' - Websockets',
             '',
             'Tools Used',
             ' - Blender',
             ' - Gimp',
             ' - Inkscape'
        ],
        links: [
           {label: 'Github:',
           url: 'https://github.com/criffle629/portfolio',
           name: 'https://github.com/criffle629/portfolio'},
        ],
 
        backgroundColor: 'rgba(0,0,0, 0.8)',
        mainBackgroundColor: 'rgb(25, 75, 100)',
        backgroundImage: "url(" + portfolioBanner + ")",
        backgroundSize: "50%",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        promoTextColor: 'black',
        contentTextColor: 'black',
        lineTextColor: 'black',
        closeButtonColor: 'white',
        closeButtonBackgroundColor: '#598caa',
        gameBodyWidth: '0px',
        gameBodyHeight: '0px',
        infoBodyWidth: '750px',
        infoBodyHeight: '600px',
      }
    
      const close = () => {
        closeModal();
      }
    
      const renderModal = () => {
    
    
        if (isOpen) {
    
          return (
             <Modal isOpen={isOpen} closeModal={close} content={content}/>
          );
        }
      }
    
      return renderModal();
    
}

  

export default PortfolioModal;