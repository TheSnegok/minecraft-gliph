import React from 'react'

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const Gliph = ({ value, set, maxLength }) => {
    const handleClick = (letter) => {
        set(value.length < maxLength ? value + letter : value);
    }
    return (
        <>
            {alphabet.map(l => <div key={l} className="gliphMine" onClick={() => handleClick(l)}>{l}</div>)}
        </>
    )
}

export default Gliph