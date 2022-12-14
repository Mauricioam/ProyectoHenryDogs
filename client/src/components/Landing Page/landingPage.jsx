import { NavLink } from "react-router-dom";
import "../styles//LandinPageStyle/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landingPage_container">
      <div className="image_landig"><h1 className="container_title"><span className="landing_title">Henry Dog App</span></h1></div>
      <div className="landing_text">
      <h1><span className="landing_welcome">Welcome to Henry App</span></h1>
      <NavLink to="/home" className="link">
      <h3 className="landing_button"><span className="button"> Find your next four legs friend here</span></h3>
      </NavLink>
      <p className="photo_text">Foto de <a className="photo_link" href="https://unsplash.com/es/@alvannee?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Alvan Nee</a> en <a href="https://unsplash.com/es?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" target="_blank">Unsplash</a></p>
      </div>  
    </div>
  );
}
