import { useState } from "react";

 export default function Pagination({numDogs,dogsLength,handlePaged}){


 
    let pages = [];
    let totalPages = Math.ceil( dogsLength/ numDogs )
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }
    
    return(
        <div className="pagiation_container">
            {pages.map(ele => <a onClick={()=>handlePaged(ele)} className="pagination_number">{`${ele}  `}</a> )}
        </div>
    )

  
  
}

 
