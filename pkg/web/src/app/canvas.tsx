import { MutableRefObject, useEffect, useRef } from "react";
import ConceptTree from "./app";

export function Canvas({
  parent,
}: {
  parent: MutableRefObject<HTMLElement | null>;
}) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const tree = useRef<ConceptTree | undefined>();

  useEffect(() => {
    let attached = true;

    const ready = () => {
      tree.current = new ConceptTree(canvas, parent);

      tree.current.addConcept(
        "This is a PixiJS text that goes for a very very long time blah blah blah"
      );
    };

    document.fonts.ready.then(() => {
      if (attached) ready();
    });

    return () => {
      attached = false;
    };
  }, [parent]);

  return <canvas ref={canvas}></canvas>;
}
