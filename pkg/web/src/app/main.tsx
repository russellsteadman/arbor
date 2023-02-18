import { Grid } from "@mui/material";
import styles from "@/styles/App.module.scss";
import { useState, useRef } from "react";
import { Canvas } from "./canvas";

export default function App() {
  const [text, setText] = useState("");
  const canvasParent = useRef<HTMLDivElement | null>(null);

  return (
    <Grid container spacing={0} className={styles.display}>
      <Grid item md={4} xs={12}>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </Grid>
      <Grid item md={8} xs={12}>
        <div className={styles.tree} ref={canvasParent}>
          <Canvas parent={canvasParent} />
        </div>
      </Grid>
    </Grid>
  );
}
