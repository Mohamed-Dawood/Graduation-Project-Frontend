import './Input.css';
function Input({ icon: Icon, label, id, ...props }) {
  return (
    <div className="input">
      {label && <label htmlFor={id}>{label}</label>}
      <div>
        {Icon && <Icon />}
        <input id={id} {...props} />
      </div>
    </div>
  );
}

export default Input;
