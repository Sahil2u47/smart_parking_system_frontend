import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon">P</div>
            <div className="logo-text">
              <span>Smart</span>
              <strong>Parking</strong>
            </div>
          </div>

          <p>
            A smarter way to find, manage and book
            parking spaces with ease.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <span>PLATFORM</span>
            <a href="/">Home</a>
            <a href="/about">About</a>
          </div>

          <div>
            <span>SUPPORT</span>
            <a href="/login">Login</a>
            <a href="/signup">Get Started</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 Smart Parking</span>
        <span>Smart parking. Simple experience.</span>
      </div>
    </footer>
  );
}

export default Footer;