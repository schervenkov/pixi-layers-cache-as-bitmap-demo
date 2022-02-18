import { Group, Layer, Stage } from "@pixi/layers";
import { Application, Container, DisplayObject, Graphics, InteractionEvent, IPointData, Point } from "pixi.js";

const app = new Application({
    width: 640,
    height: 480,
    autoStart: true,
});

app.stage = new Stage();
app.stage.sortableChildren = true;

document.body.appendChild(app.view);

const contGroup = new Group(0, true);
const redGroup = new Group(1, true);
const blueGroup = new Group(2, true);

const contLayer = new Layer(contGroup);
const redLayer = new Layer(redGroup);
const blueLayer = new Layer(blueGroup);

app.stage.addChild(contLayer);
app.stage.addChild(redLayer);
app.stage.addChild(blueLayer);

const circlesCont = new Container();

app.stage.addChild(circlesCont);

const blueCircle = createCircle(0x0000ff, new Point(100, 100), undefined /* blueGroup */, "blue circle");
const redCircle = createCircle(0xff0000, new Point(150, 100), undefined /* redGroup */, "red circle");

circlesCont.parentGroup = contGroup;

function createCircle(color: number, position: Point, group?: Group, name?: string): DisplayObject {
    const circle = new Graphics().beginFill(color).drawCircle(0, 0, 100).endFill();
    if (name) {
        circle.name = name;
    }
    circle.position.copyFrom(position);
    circlesCont.addChild(circle);
    if (group) {
        circle.parentGroup = group;
    }
    circle.interactive = true;
    circle
        .on("mousedown", onDragStart)
        .on("touchstart", onDragStart)
        .on("mouseup", onDragEnd)
        .on("mouseupoutside", onDragEnd)
        .on("touchend", onDragEnd)
        .on("touchendoutside", onDragEnd)
        .on("mousemove", onDragMove)
        .on("touchmove", onDragMove);
    return circle;
}

let dragging = false;
let dragPoint: IPointData | null = null;
let currObj: DisplayObject | null = null;

function toggleCirclesGroups() {
    if (redCircle.parentGroup) {
        redCircle.parentGroup = undefined;
    } else {
        redCircle.parentGroup = redGroup;
    }

    if (blueCircle.parentGroup) {
        blueCircle.parentGroup = undefined;
    } else {
        blueCircle.parentGroup = blueGroup;
    }
}

function onDragStart(event: InteractionEvent) {
    if (!dragging && event.target && !currObj) {
        const data = event.data;
        currObj = event.target;
        currObj.scale.x *= 1.1;
        currObj.scale.y *= 1.1;
        dragPoint = data.getLocalPosition(currObj.parent);
        dragPoint.x -= currObj.x;
        dragPoint.y -= currObj.y;
        dragging = true;
    }
}

function onDragMove(event: InteractionEvent) {
    if (dragging && event.target && currObj) {
        const data = event.data;
        const newPosition = data.getLocalPosition(currObj.parent);
        const x = dragPoint ? dragPoint.x : 0;
        const y = dragPoint ? dragPoint.y : 0;
        currObj.x = newPosition.x - x;
        currObj.y = newPosition.y - y;
    }
}

function onDragEnd(event: InteractionEvent) {
    if (dragging && event.target && currObj) {
        dragging = false;
        currObj.scale.x /= 1.1;
        currObj.scale.y /= 1.1;
        currObj = null;
    }
}

const btn = document.createElement("input");
btn.type = "button";
btn.value = "Toggle cache as bitmap";
btn.onclick = () => {
    circlesCont.cacheAsBitmap = !circlesCont.cacheAsBitmap;
};

const btn2 = document.createElement("input");
btn2.type = "button";
btn2.value = "Add / Remove circles to groups";
btn2.onclick = () => {
    toggleCirclesGroups();
};

const cont = document.body;

if (cont) {
    cont.appendChild(document.createElement("br"));
    cont.appendChild(btn);
    cont.appendChild(btn2);
}
