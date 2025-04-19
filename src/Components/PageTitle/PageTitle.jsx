import './PageTitle.css';
function PageTitle({ text }) {
  return (
    <div>
      <h2 className="pageTitle">{text}</h2>
    </div>
  );
}

export default PageTitle;
