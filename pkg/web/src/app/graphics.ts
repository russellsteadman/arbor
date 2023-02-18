import {
  Application,
  Graphics,
  FederatedPointerEvent,
  Text,
  Point,
  Container,
} from "pixi.js";

const CONCEPT_MARGIN = 12;
export const BACKGROUND_COLOR = 0xe9e9e9;

let drag: Draggable | false = false;
export class Draggable extends Graphics implements Graphics {
  dragging = false;
  dragFrom: Point | null = null;

  constructor() {
    super();

    this.eventMode = "dynamic";

    const dragStart = (e: FederatedPointerEvent) => {
      console.log("drag start");
      drag = this;
      this.dragFrom = new Point(e.globalX, e.globalY);
    };

    this.on("pointerdown", dragStart);
  }
}

// export const bindPointerMove = (app: Application) => {
//   app.renderer.plugins.interaction.on("pointermove", (e: PointerEvent) => {
//     if (drag) {
//       console.log(e.clientX, e.clientY, e.globalX, e.globalY);
//       drag.position.x = e.globalX - (drag.dragFrom!.x ?? 0);
//       drag.position.y = e.globalY - (drag.dragFrom!.y ?? 0);
//     }
//   });
// };

// Draw the background
export const drawBackground = (app: Application) => {
  const background = new Container();
  background.width = app.screen.width;
  background.height = app.screen.height;

  const dragMove = (e: FederatedPointerEvent) => {
    if (drag) {
      console.log(e.clientX, e.clientY, e.globalX, e.globalY);
      drag.position.x = e.globalX;
      drag.position.y = e.globalY;
    }
  };

  const dragEnd = () => {
    drag = false;
  };

  background.eventMode = "dynamic";
  background.on("pointermove", dragMove);
  background.on("pointerup", dragEnd);
  background.on("pointerupoutside", dragEnd);
  // background.on("pointerout", dragEnd);

  app.stage.addChild(background);

  return background;
};

// Resize the background on window resize
export const resizeBackground = (app: Application, background: Container) => {
  background.width = app.screen.width;
  background.height = app.screen.height;
};

// Draw a concept bubble with text
export const drawConcept = (
  bg: Container,
  text: string,
  x = 0,
  y = 0
): Draggable => {
  const textNode = new Text(text, {
    fontFamily: "Roboto",
    fontSize: 16,
    fill: 0x000000,
    wordWrap: true,
    wordWrapWidth: 250,
  });

  textNode.x = CONCEPT_MARGIN;
  textNode.y = CONCEPT_MARGIN;

  const bubble = new Draggable();
  bubble.beginFill(0xcc0000);
  bubble.drawRoundedRect(
    x,
    y,
    textNode.width + 2 * CONCEPT_MARGIN,
    textNode.height + 2 * CONCEPT_MARGIN,
    CONCEPT_MARGIN
  );
  bubble.endFill();

  bubble.addChild(textNode);

  bg.addChild(bubble);

  return bubble;
};
