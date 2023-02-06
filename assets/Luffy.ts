import { _decorator, Component,Enum, Input, Node, Vec3, UITransform,math,lerp } from "cc";
const { ccclass, property } = _decorator;


enum DIRECTION {
  NONE,
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
}


@ccclass("Luffy")
export class Luffy extends Component {
  
  count:number=0;
  @property({ type: Enum(DIRECTION) })
  buttonType = DIRECTION.NONE;

  @property(Node)
  myImage: Node = null;
  onLoad() {
    this.node.on(Input.EventType.TOUCH_START, this.moveObject, this);
    this.node.on(Input.EventType.TOUCH_END, () => {
      this.count=0;
    this.unschedule(this.move);
    
    });
  }

  moveObject() {
    this.count=0;
    this.schedule(this.move, 0.01    );
  }

  move() {
    switch (this.buttonType) {
      case DIRECTION.TOP:
        this.MoveUp();
        break;
      case DIRECTION.BOTTOM:
        this.MoveDown();
        break;
      case DIRECTION.LEFT:
        this.MoveLeft();
        break;
      case DIRECTION.RIGHT:
        this.MoveRight();
        break;
    }
  }

  MoveLeft() {
    this.count=1;
  }
  MoveRight() {
    this.count=2;
  }
  MoveUp() {
    this.count=3;
  }
  MoveDown() {
    this.count=4;
    
  }
  update(deltaTime: number) {
    if(this.count==1){
      let old_position: Vec3 =this.myImage.getPosition();
      let image_width:number=this.myImage.getComponent(UITransform).width;  
      let parent_width:number= this.myImage.parent.getComponent(UITransform).width;
      if (old_position.x > -((parent_width/2)-(image_width/2))) {
        let ratio=0.1;
        lerp(old_position.x,old_position.x-10,ratio);
        old_position.x-=10;
      }
      this.myImage.setPosition(old_position);
      // console.log(old_position);
    }
    if(this.count==2)
    {
      let old_position: Vec3 =this.myImage.getPosition();
      let image_width:number=this.myImage.getComponent(UITransform).width;  
      let parent_width:number= this.myImage.parent.getComponent(UITransform).width;
    if (old_position.x < ((parent_width/2)-(image_width/2))) {
      old_position.x+=10;
    }
    this.myImage.setPosition(old_position);
    // console.log(old_position);
  }
  
  if(this.count==3)
  {
    let old_position: Vec3 =this.myImage.getPosition();
    let image_height:number=this.myImage.getComponent(UITransform).height;  
    let parent_height:number= this.myImage.parent.getComponent(UITransform).height;
    if (old_position.y < ((parent_height/2)-(image_height/2))) {
      let speed=0.1;
      lerp(old_position.y, old_position.y+10,deltaTime*speed);
      old_position.y +=10;}
    this.myImage.setPosition(old_position);
    // console.log(old_position);
  }

  if(this.count==4)
  {
    let old_position: Vec3 =this.myImage.getPosition();
    let image_height:number=this.myImage.getComponent(UITransform).height;  
    let parent_height:number= this.myImage.parent.getComponent(UITransform).height;


    if (old_position.y > -((parent_height/2)-(image_height/2))) {

      let speed=0.1;
      lerp(old_position.y, old_position.y+10,deltaTime*speed);
      old_position.y -=10;}
    this.myImage.setPosition(old_position);
    // console.log(old_position);
  }
  }
}
