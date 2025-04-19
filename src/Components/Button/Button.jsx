import './Button.css';
function Button({ text, color }) {
  return (
    <div className="button">
      <button style={{ background: `var(${color})` }}>{text}</button>
    </div>
  );
}

export default Button;
