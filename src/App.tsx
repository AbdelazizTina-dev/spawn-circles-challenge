import { useState } from "react";
import "./App.css";

interface Point {
  coordX: number;
  coordY: number;
}

const Circle = ({ coordX, coordY }: Point) => {
  return (
    <div
      className="circle"
      style={{
        left: `${coordX}px`,
        top: `${coordY}px`,
      }}
    />
  );
};

function App() {
  const [circles, setCircles] = useState<Point[]>([]);
  const [popped, setPopped] = useState<Point[]>([]);

  const spawnCircle = (e: React.MouseEvent<HTMLDivElement>) => {
    setCircles([...circles, { coordX: e.clientX, coordY: e.clientY }]);
  };

  const undo = () => {
    const newCircles = [...circles];
    const poppedCircle = newCircles.pop();

    if (!poppedCircle) return;

    setPopped([...popped, poppedCircle]);
    setCircles(newCircles);
  };

  const redo = () => {
    const newPopped = [...popped];
    const poppedCircle = newPopped.pop();

    if (!poppedCircle) return;

    setCircles([...circles, poppedCircle]);
    setPopped(newPopped);
  };

  return (
    <div>
      <div className="buttons">
        <button disabled={circles.length === 0} onClick={undo}>
          Undo
        </button>
        <button disabled={popped.length === 0} onClick={redo}>
          Redo
        </button>
      </div>
      <div className="canvas" onClick={spawnCircle}>
        {circles.map(({ coordX, coordY }) => (
          <Circle coordX={coordX} coordY={coordY} />
        ))}
      </div>
    </div>
  );
}

export default App;
