import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { Pipes } from './Pipes';


@ccclass('PipePool')
export class PipePool extends Component {

    @property({
        type: Prefab
    })
    public prefabPipes = null;

    @property({
        type: Node
    })
    public pipePoolHome;

    public pool = new NodePool;
    public createPipe; 

    initPool(){
        let initCount = 5;
        for(let i=0; i< initCount; i++){
            this.createPipe = instantiate(this.prefabPipes);

            if (i == 0){
                this.pipePoolHome.addChild(this.createPipe);
            } else{
                this.pool.put(this.createPipe);
            }
        }
    }

    addPool(){
        if (this.pool.size()>0){
            this.createPipe = this.pool.get();
        } else {
            this.createPipe = instantiate(this.prefabPipes);
        }
        
        this.pipePoolHome.addChild(this.createPipe);
    }

    reset(){
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


