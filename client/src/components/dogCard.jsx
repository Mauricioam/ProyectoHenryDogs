
//componente ilustrativo
export default function Dog({name,image,temperament,weight}){
    return <div>
        <h3>{name}</h3>
        <img src={image} alt="dog"/>
        <p><span>Behavior:</span> {temperament}</p>
        <p><span>Weight:</span> {weight}Kg</p>
    </div>
}