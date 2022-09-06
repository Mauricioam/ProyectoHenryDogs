import { NavLink } from "react-router-dom";

export default function LandingPage(){

    return (
            <div>
                <h3>Texto de bienvenida a la pagina</h3>
            <NavLink to="/home">
                <button>Let's begin our journey</button>
            </NavLink>
            </div>

    )

}