import React from 'react';
import Modal from './Modal';
import auctionBentoBanner from '../../images/auctionbentologo.png';

const AuctionBentoModal = props => {

  const { isOpen, closeModal } = props;

  const content = {
    promoText: 'Auction Bento - eBay Sellers Fee calculator for iPhone and iPad. eBay Sellers Fee calculator was an iOS app that allowed users to quickly calculate profitablity by calculating eBay and paypal fees.',
    contentText: [
      'Mobile app',
      ' - UIKit',
      ' - Objective C',
      '',
      'Backend',
      ' - PHP with MySQL Database',
      ' - API to serve in-house ads and affiliate ads',
      ' - Dashboard to manage ads made with HTML, Javascript and CSS',
    ],
    links: [
    ],

    backgroundColor: 'rgba(0,0,0, 0.8)',
    mainBackgroundColor: '#cdc88c',
    backgroundImage: "url(" + auctionBentoBanner + ")",
    backgroundSize: "contain",
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    promoTextColor: 'black',
    contentTextColor: 'black',
    lineTextColor: 'black',
    closeButtonColor: 'white',
    closeButtonBackgroundColor: '#598caa',
    gameBodyWidth: '0px',
    gameBodyHeight: '0px',
    infoBodyWidth: '100%',
    infoBodyHeight: '600px',
  }

  const close = () => {
    closeModal();
  }

  const renderModal = () => {
    if (isOpen) {

      return (
        <Modal isOpen={isOpen} closeModal={close} content={content} />
      );
    }
  }

  return renderModal();
}

export default AuctionBentoModal;