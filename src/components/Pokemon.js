import axios from "axios";
import React, {useEffect, useState} from "react";
import './Pokemon.css';

const Pokemon = ({url})=>{
    const [poke, setPoke] = useState('');
    const [err, setErr] = useState(false);

    useEffect(()=>{
        const loadPokemon = async ()=>{
            try{
            const res = await axios.get(url);
            setPoke(res);
            setErr(false);
            }catch(err){
                setErr(true);
            }
        }
        loadPokemon();
    },[])

    const typeSelect = (type)=>{
        switch(type){
            case 'normal':
                return "#a6a877";
                break;
            case 'grass':
                return "#77c850";
                break;
            case 'ground':
                return "#dfbf68";
                break;
            case 'fighting':
                return "#bf3028";
                break;
            case 'rock':
                return "#b8a137";
                break;
            case 'steel':
                return "#b9b7cf";
                break;
            case 'fire':
                return "#ee7f30";
                break;
            case 'electric':
                return "#f7cf30";
                break;
            case 'flying':
                return "#a98ff0";
                break;
            case 'psychic':
                return "#f85687";
                break;
            case 'bug':
                return "#a8b720";
                break;
            case 'dragon':
                return "#6f38f6";
                break;
            case 'water':
                return "#678fee";
                break;
            case 'ice':
                return "#98d5d6";
                break;
            case 'poison':
                return "#a03fa0";
                break;
            case 'dark':
                return "#725847";
                break;
            case 'ghost':
                return "#6e5896";
                break;
            case 'fairy':
                return "#feaec7";
                break;
        }
    }

    const concat = (result)=>{
        let i;
        let str = [];
        for( i in result){
            str.push(result[i].type.name);
        }
        return str;
    }

    return(
        <>
            {poke !== '' &&
            <div className={`pokemon ${poke.data.types[0].type.name}`}
            style={{backgroundColor: typeSelect(poke.data.types[0].type.name)}}
            >

                <h2 className="pokemon_title">{poke.data.name}</h2>
                <div className="elements">
                {concat(poke.data.types).map((result, key)=>(
                    <p key={key} className="elements--title"
                    style={{backgroundColor: typeSelect(result)}}
                    >{result}</p>
                ))}
                </div>
                <img src={poke.data.sprites.front_default}/>
                
            </div>
            }
            {err && <h2>not found</h2>}
        </>
    );
}

export default Pokemon;