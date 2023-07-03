import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({
        type:Ground,
        tooltip: 'this is ground'
    })
    public ground: Ground;

    @property({
        type: Results,
        tooltip: 'results go here'
    })
    public result: Results;

    @property({
        type: Bird
    })
    public bird: Bird;

    @property({
        type:PipePool
    })
    public pipeQueue: PipePool;

    @property({
        type: CCInteger
    })
    public speed: number = 300;
    
    @property({
        type:CCInteger
    })
    public pipeSpeed: number = 200;

    onLoad(){
        this.initListener();
        this.result.resetScore();
        director.pause();
    }

    initListener(){

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, () => {
            console.log(213);
            this.bird.fly();
        })

    }

    /* Just for testing, DELETE ME after done all the steps */
    onKeyDown(event: EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.gameOver();
            break;
            case KeyCode.KEY_P:
                this.result.addScore();
            break;
            case KeyCode.KEY_Q:
                this.resetGame();
                this.bird.resetBird();
        }        
    }

    startGame(){

        this.result.hideResults();
        director.resume();
    }

    gameOver(){

        this.result.showResults();
        director.pause();

    }

    resetGame(){
        this.result.resetScore();
        this.pipeQueue.reset();
        this.startGame();
    }

    passPipe(){
        this.result.addScore();
    }

    createPipe(){
        this.pipeQueue.addPool();
    }

}
