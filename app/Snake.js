"use client";

import { useState, useEffect, useCallback } from "react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export default function Snake() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        setDirection(nextDirection);
        const head = prevSnake[0];
        const newHead = {
          x: (head.x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + nextDirection.y + GRID_SIZE) % GRID_SIZE,
        };

        // Colisión con el cuerpo
        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];

        // Comió comida
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [nextDirection, gameOver, food, generateFood]);

  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <h2 style={{ marginTop: 0, fontSize: "1.5rem" }}>🐍 RETRO SNAKE</h2>
      <p style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>Score: {score}</p>

      <div
        style={{
          display: "inline-block",
          border: "3px solid #fff",
          backgroundColor: "#111",
          position: "relative",
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          margin: "1rem 0",
        }}
      >
        {/* Serpiente */}
        {snake.map((segment, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: i === 0 ? "#00ff00" : "#00cc00",
              border: "1px solid #00aa00",
              boxSizing: "border-box",
            }}
          />
        ))}

<<<<<<< HEAD
        {/* Comida - Logo Toctoc */}
        <img
          src="/logo_toctoc.png"
          alt="Toctoc Logo"
          style={{
            position: "absolute",
            left: food.x * CELL_SIZE - CELL_SIZE / 2,
            top: food.y * CELL_SIZE - CELL_SIZE / 2,
            width: CELL_SIZE * 2,
            height: CELL_SIZE * 2,
            objectFit: "contain",
            padding: "2px",
            boxSizing: "border-box",
            borderRadius: "8px",
=======
        {/* Comida */}
        <div
          style={{
            position: "absolute",
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: "#ff0000",
            border: "1px solid #cc0000",
            boxSizing: "border-box",
>>>>>>> main
          }}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        {gameOver && (
          <div>
            <p style={{ fontSize: "1.5rem", color: "#ff0000", margin: "0.5rem 0" }}>
              GAME OVER!
            </p>
            <button
              onClick={resetGame}
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                backgroundColor: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "1rem",
              }}
            >
              Jugar de nuevo
            </button>
          </div>
        )}
        {!gameOver && (
          <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
            Usa flechas o WASD para moverte
          </p>
        )}
      </div>
    </div>
  );
}
