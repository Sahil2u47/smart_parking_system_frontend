import "./Loader.css";

function Loader({ size = "medium" }) {
  return (
    <div className={`loader ${size}`} aria-label="Loading">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

export default Loader;