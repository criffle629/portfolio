import React from 'react'
import Input from '../engine/Input'
import GameEngine from '../engine/GameEngine'
import Scene from '../engine/Scene'
import Camera from '../engine/Camera'

import RoadRacerModal from './modal/RoadRacerModal'
import MightyChickenModal from './modal/MightyChickenModal'
import PawsnfindModal from './modal/PawsnfindModal'
import AuctionBentoModal from './modal/AuctionBentoModal'
import SkullValleyModal from './modal/SkullValleyModal'
import PortfolioModal from './modal/PortfolioModal'
import MainGameUI from './MainGameUI/MainGameUI'

export default class Game extends React.Component {
  constructor(props) {
    super()
    this.canvas = null
    this.isLoaded = false
    this.state = {
      currentModal: 'none',
    }

    document.addEventListener('keydown', this.HandleKeyPress)
    document.addEventListener('keyup', this.HandleKeyUp)
  }

  componentDidMount() {
    GameEngine.SetOpenModalCallback(this.openModal, this.isModalOpen)
    GameEngine.Init()
  }

  Load = () => {
    if (this.isLoaded) return

    this.isLoaded = true
    Scene.setScreenSize(document.body.clientWidth, document.body.clientHeight)
    Camera.Configure(60, Scene.aspectRatio, 1, 500.0)
    GameEngine.InitRenderer(this.canvas, Scene.screenWidth, Scene.screenHeight)

    this.canvas.focus()
  }

  gamepadConnected(e) {
    console.log(e)
  }

  gamepadeDisconnected(e) {
    console.log(e)
  }
  HandleKeyPress(e) {
    e.preventDefault()
    e.stopPropagation()
    Input.addKey(e.key)
  }

  HandleKeyUp(e) {
    e.preventDefault()
    e.stopPropagation()
    Input.removeKey(e.key)
  }

  clearInput = () => {
    Input.clearKeys()
  }

  closeModal = () => {
    this.setState({ currentModal: 'none' })
  }

  openModal = (modal) => {
    this.setState({ currentModal: modal })
  }

  isModalOpen = () => {
    return this.state.currentModal !== 'none'
  }

  render() {
    return (
      <div
      id='game'
        style={{
          width: '100vw',
          height: '100vh',
          padding: 0,
          margin: 0,
          overflow: 'hidden',
        }}
      >
        <MainGameUI />

        <canvas
          id="game"
          style={{
            outline: 'none',
            display: 'block',
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            zIndex: -1,
          }}
          tabIndex="0"
          ref={(c) => {
            this.canvas = c
            this.Load()
          }}
          onBlur={this.clearInput}
        ></canvas>

        <RoadRacerModal
          isOpen={this.state.currentModal === 'roadracer'}
          closeModal={this.closeModal}
        />
        <MightyChickenModal
          isOpen={this.state.currentModal === 'mightychicken'}
          closeModal={this.closeModal}
        />
        <PawsnfindModal
          isOpen={this.state.currentModal === 'pawsnfind'}
          closeModal={this.closeModal}
        />
        <AuctionBentoModal
          isOpen={this.state.currentModal === 'auctionbento'}
          closeModal={this.closeModal}
        />
        <SkullValleyModal
          isOpen={this.state.currentModal === 'skullvalley'}
          closeModal={this.closeModal}
        />
        <PortfolioModal
          isOpen={this.state.currentModal === 'portfolio'}
          closeModal={this.closeModal}
        />
       
       <video controls={false} id="mightychicken" loop autoPlay muted   style={{display: "none"}}>  <source src="./assets/videos/mightychicken.webm" type="video/mp4" /> </video>
       <video controls={false} id="roadracer" loop autoPlay muted   style={{display: "none"}}>  <source src="./assets/videos/roadracer.mp4" type="video/mp4" /> </video>
       <video controls={false} id="skullvalley" loop autoPlay muted   style={{display: "none"}}>  <source src="./assets/videos/skullvalley.mp4" type="video/mp4" /> </video>

      </div>
    )
  }
}
