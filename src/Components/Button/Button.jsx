import './Button.css';
function Button({ text, bgColor, ...props }) {
  return (
    <div className="button">
      <button {...props} style={{ background: `var(${bgColor})` }}>
        {text}
      </button>
    </div>
  );
}

export default Button;
