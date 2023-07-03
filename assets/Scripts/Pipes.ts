import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

const random = (min,max) => {
    return Math.random() * (max-min) + min;
}

@ccclass('Pipes')
export class Pipes extends Component {

    @property({
        type:Node,
        tooltip:'Top Pipe'
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: 'Bottom Pipe'
    })
    public bottomPipe: Node;

    public tempStartLocationUp:Vec3 = new Vec3(0,0,0);
    public tempStartLocationDown:Vec3 = new Vec3(0,0,0);
    public scene = screen.windowSize;

    public game; //speed of the pipes from the GameCtrl
    public pipeSpeed:number; //final speed of the pipes
    public tempSpeed:number; //temporary speed

    protected onLoad(): void {
        //The line below is to get pipeSpeed from GameCtrl, but please keep in mind we
        //cannot import GameCtrl file which can create circular request later on(not good).
        //We should use the "find" keyword instead
        this.game = find("GameCtrl").getComponent("GameCtrl");
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
    }

    initPos(){

        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);
        this.tempStartLocationDown.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);

        let gap = random(90,100);
        let topHeight = random(0,450);

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = topHeight - (gap*10);

        this.bottomPipe.setPosition(this.tempStartLocationDown);
        this.topPipe.setPosition(this.tempStartLocationUp);

    }

    protected update(dt: number): void {
        
    }

}



