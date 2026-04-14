import Snake from "./Snake";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "system-ui, sans-serif",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: "0 0 1rem 0", fontWeight: "900" }}>
        Hola Mundo
      </h1>
      <p style={{ fontSize: "1.25rem", margin: "0 0 2rem 0", opacity: 0.9 }}>
        Juega Snake Retro 🎮
      </p>
      <Snake />
    </main>
  );
}
