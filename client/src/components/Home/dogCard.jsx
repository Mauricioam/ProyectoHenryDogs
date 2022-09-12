import style from "../styles/Card/dogCard.css"
//componente ilustrativo
export default function Dog({name,image,temperament,weight}){
    return <div className="card">
        <h3 className="card_name">{name}</h3>
        <img src={image} alt="dog" className="card_img"/>
        <p className="card_text"><span className="card_subtitle">Behavior:</span> {temperament}</p>
        <p className="card_text"><span  className="card_subtitle">Weight:</span> {weight}Kg</p>
    </div>
}