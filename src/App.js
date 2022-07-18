import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Pokemon from './components/Pokemon'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [pokemons, setPokemons] = useState('');
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
  const [search, setSearch] = useState('');
  const [err, setErr] = useState(false);
  const [searchUrl, setSearchUrl] = useState('');
  const [searchPokemon, setSearchPokemon] = useState('');

  useEffect(()=>{
    const load = async ()=>{
      const req = await axios.get(url);
      setPokemons(req);

    }
    load();
  },[url]);

  useEffect(()=>{
    setSearchPokemon('');
  },[searchUrl])



  return (
    <div className="App">
      <Navbar/>
      {searchUrl !== '' &&
      <a className='inicio' onClick={()=>setSearchUrl('')}>Home</a>
      }
      <div className='searchBtn'>
      <input className='input' onChange={(evento)=>{setSearch(`https://pokeapi.co/api/v2/pokemon/${evento.target.value}`)}}/>
      <button className='input__btn' onClick={()=>{setSearchUrl(search); setSearchPokemon('render')}}>Search</button>
      </div>
        <div className='pokeCard'>

        {pokemons === '' && <h2>LOADING...</h2> }


        {searchUrl !== '' && searchPokemon === '' && <Pokemon url={searchUrl}/> }


        {pokemons !== '' && searchUrl === '' && pokemons.data.results.map((result,key)=>
          <Pokemon key={key} url={result.url}/>
        )}
        </div>




        <div className='buttons'>
        {pokemons !== '' && pokemons.data.previous !== null && searchUrl === '' &&
          <button onClick={(evento)=>{setUrl("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"); setPokemons('')}}>First</button>
        }
        {pokemons !== '' && pokemons.data.previous === null && searchUrl === '' &&
          <button id='disable'>First</button>
        }


        {pokemons !== '' && pokemons.data.previous !== null && searchUrl === '' &&
          <button onClick={(evento)=>{setUrl(pokemons.data.previous); setPokemons('')}}>prev</button>
        }
        {pokemons !== '' && pokemons.data.previous === null && searchUrl === '' &&
          <button id='disable'>prev</button>
        }


        {pokemons !== '' && pokemons.data.next !== null &&  searchUrl === '' &&
          <button onClick={(evento)=>{setUrl(pokemons.data.next); setPokemons('')}}>next</button>
        }
        {pokemons !== '' && pokemons.data.next === null && searchUrl === '' &&
          <button id='disable'>next</button>
        }


        {pokemons !== '' && pokemons.data.next !== null &&  searchUrl === '' &&
          <button onClick={(evento)=>{setUrl("https://pokeapi.co/api/v2/pokemon?offset=1134&limit=20"); setPokemons('')}}>Last</button>
        }
        {pokemons !== '' && pokemons.data.next === null && searchUrl === '' &&
          <button id='disable'>Last</button>
        }
        </div>
        <Footer/>
    </div>
  );
}

export default App;
