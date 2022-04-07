import "./MainCard.css";
function MainCard() {
  return (
    <div className="mainContainer">
      <div className="sidebar">
        <div>
          <img src="https://i.pinimg.com/736x/70/09/1c/70091c4cd9d4cdfb79ecdcf198205c20.jpg"></img>
        </div>
        <div className="content-bar">
          <h3>Channels</h3>
        </div>
        <button>#General</button>
        <button>#Announcements</button>
        <button>#Music</button>
        <button>#Random</button>
      </div>

      <main className="content">
        <div className="content-bar">
          <h3 className="inner-html">#General</h3>
        </div>
        <div className="chat-footer">
          <input />
        </div>
      </main>
    </div>
  );
}
export default MainCard;
