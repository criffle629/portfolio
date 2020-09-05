import Scene from './Scene';
import Camera from './Camera';
import Time from './Time';
import Physics from './Physics';
import Renderer from './Renderer';
import PostProcessing from './PostProcessing';
import Input from './Input';
import Gamepad from './Gamepad';
import MainGame from '../maingame/MainGame';
import StadiumGame from '../stadiumgame/StadiumGame';

class Engine {
    constructor() {
        this.fps = 0;
        this.fpsTime = 0;

        this.mainGame = new MainGame();
    }

    Init(){
    

        requestAnimationFrame(this.Animate);
    }
    SetOpenModalCallback(openModal, isModalOpen) {
        this.openModal = openModal;
        this.isModalOpen = isModalOpen;
    }

    InitRenderer = (canvas, width, height) => {
        this.renderer = new Renderer();
        this.renderer.InitRenderer(canvas, width, height, this.Animate).then(renderer => {
            PostProcessing.init(renderer);
           //  PostProcessing.addFXAA();
           //  PostProcessing.addBloom();
            //rz PostProcessing.addBokeh(); 
        })
            .then(() => {
                //    this.renderer.compile(Scene.scene, Camera.mainCamera); 
            });
    }

    GetRenderer() {
        return this.renderer.renderer;
    }

    Animate = () => {

        if (this.isModalOpen()) {
            Gamepad.clearButtons();
            Input.clearKeys();
        }

        Gamepad.update();
        Time.Update();

     
       
        this.mainGame.update();

        Scene.update();

        if (PostProcessing.isUsingEffects())
            PostProcessing.render();
        else
            this.renderer.Render(Scene.getScene(), Camera.mainCamera);

        this.fpsTime += Time.deltaTime;
        this.fps++;
        if (this.fpsTime >= 1) {
            //   document.title = this.fps + ' fps';
            this.fps = 0;
            this.fpsTime = 0;
        }

        Physics.update();
    }
}

const GameEngine = new Engine();

export default GameEngine;