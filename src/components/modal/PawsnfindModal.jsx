import React from 'react'
import Modal from './Modal';
import pawsnfindBanner from '../../images/pawsnfind.png';

const PawsnfindModal = (props) => {
  const { isOpen, closeModal } = props;

  const content = {
    promoText: 'Animal Rescue organizations have so much to manage, but their biggest concern is making sure pets go to a great home. Pawsnfind allows rescues to manage their operations while making it easier for adopters to find their perfect pet and connect with the rescue.',
    contentText: [
      'React frontend with MaterialUI',
      'Redux',
      'Serparate dashboard for animal rescues and adopters',
      'Express.js backend with a Postgres database',
      'Stripe integration for rescues to receive donations',
      'Bank accounts can be verified with stripe directly from Pawsnfind\'s dashboard',
      'Image hosting (Uploading and retrieval of images) using PHP and MySQL',
      'React frontend for image hosting for the creation of new accounts and api keys'],
    links: [
      {
        label: 'Website:',
        url: 'https://www.pawsnfind.com',
        name: 'https://www.pawsnfind.com'
      },
      {
        label: 'Github:',
        url: 'https://github.com/Pawsnfind',
        name: 'https://github.com/Pawsnfind'
      },
    ],

    backgroundColor: 'rgba(0,0,0, 0.8)',
    mainBackgroundColor: '#56b05c',
    backgroundImage: "url(" + pawsnfindBanner + ")",
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

export default PawsnfindModal;