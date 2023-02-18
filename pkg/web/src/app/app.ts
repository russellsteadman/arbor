import { Application, Container } from "pixi.js";
import { RefObject } from "react";
import {
  BACKGROUND_COLOR,
  Draggable,
  drawBackground,
  drawConcept,
  resizeBackground,
} from "./graphics";

export default class ConceptTree {
  app: Application;
  background: Container;
  concepts: Draggable[] = [];

  // Create a new concept tree
  constructor(
    canvas: RefObject<HTMLCanvasElement>,
    parent: RefObject<HTMLElement>
  ) {
    this.app = new Application({
      view: canvas.current!,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: BACKGROUND_COLOR,
      resizeTo: parent.current!,
      antialias: true,
      hello: process.env.NODE_ENV === "development",
    });

    this.background = drawBackground(this.app);

    window.addEventListener("resize", this.onResize);
  }

  // Add a concept to the tree
  addConcept(text: string) {
    this.concepts.push(drawConcept(this.background, text));
  }

  // Resize components on window resize
  onResize() {
    resizeBackground(this.app, this.background);
  }

  // Remove event listeners
  remove() {
    window.addEventListener("resize", this.onResize);
  }
}
