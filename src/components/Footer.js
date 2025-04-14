import FooterFilter from './FooterFilter.js'
const Footer = () => {
  return (
    <>
    <footer className="footer">
    <span className="todo-count">1 items left</span>
    <FooterFilter/>
    <button className="clear-completed">Clear completed</button>
    </footer>
    </>
  );
};

export default Footer;
