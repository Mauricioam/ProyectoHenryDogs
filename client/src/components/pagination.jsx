
export default function Pagination({numDogs,dogsLength,handlePaged}){
    let pages = [];
    let totalPages = Math.ceil( dogsLength/ numDogs )
    for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1)
    }

    return(
        <div>
            {pages.map(ele => <a onClick={()=>handlePaged(ele)}>{`${ele}  `}</a> )}
        </div>
    )

  
  
}