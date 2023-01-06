import Scene from './Scene';
import Camera from './Camera';
import Time from './Time';
import Physics from './Physics';
import Renderer from './Renderer';
import PostProcessing from './PostProcessing';
import Input from './Input';
import Gamepad from './Gamepad';
import MainGame from '../maingame/MainGame';

//import StadiumGame from '../stadiumgame/StadiumGame';
//import { isChrome, isFirefox, isSafari, isMobile} from 'react-device-detect';

const isMobile = false;
const isFirefox = false;
const isChrome = true;
const isSafari = false;
class Engine {
    constructor() {
        this.fps = 0;
        this.fpsTime = 0;
        this.frameRate = 0;
        this.renderRate = 1 / 90;
        this.renderTimer = 0;

        if ((isChrome || isFirefox || isSafari) && !isMobile)
            this.renderRate = 0;
        this.mainGame = new MainGame();
        this.mainGame.Init();
        this.show = true;
    }

    Init() {

    }

    SetOpenModalCallback(openModal, isModalOpen) {
        this.openModal = openModal;
        this.isModalOpen = isModalOpen;
    }

    InitRenderer = (canvas, width, height) => {
        this.renderer = new Renderer();
        this.renderer.InitRenderer(canvas, width, height, this.Animate).then(renderer => {
            // PostProcessing.init(renderer);
            //   PostProcessing.addFXAA();
            //  PostProcessing.addBokeh(); 
            //  PostProcessing.addBloom();


        })
            .then(() => {
                //            this.renderer.compile(Scene.scene, Camera.mainCamera); 
            });
    }

    GetRenderer() {
        return this.renderer.renderer;
    }

    Animate = (elapsed) => {

        if (this.isModalOpen()) {
            Gamepad.clearButtons();
            Input.clearKeys();
        }

        Physics.update();
        Gamepad.update();
        Time.Update();
        this.mainGame.update();
        Scene.update();

        this.fpsTime += Time.deltaTime;
        this.fps++;

        if (this.fpsTime >= 1) {
            //   document.title = this.fps + ' fps';
            this.frameRate = parseFloat(this.fps);
            this.fps = 0;
            this.fpsTime = 0;
        }

        if (PostProcessing.isUsingEffects())
            PostProcessing.render();
        else {
            this.renderer.Render(Scene.getScene(), Camera.mainCamera);
        }
    }
}

const GameEngine = new Engine();

export default GameEngine;