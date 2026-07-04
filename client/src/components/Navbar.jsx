function Navbar({ lightTheme, setLightTheme }) {
  return (
    <header className="navbar">
      <div className="logo">
        📦 <span>StockFlow</span>
      </div>
      <button
        onClick={() => setLightTheme(!lightTheme)}
        className="theme-toggle-btn"
        title={lightTheme ? 'Toggle Dark Mode' : 'Toggle Light Mode'}
      >
        {lightTheme ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

export default Navbar;
