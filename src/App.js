import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faEdit, faTrash, faCancel, faPlus } from '@fortawesome/free-solid-svg-icons'
import './styles/styles.css';

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [tablaPokemons, setTablaPokemons] = useState([]);
  const [modal, setOpenModal] = useState(false);
  const [idPokemon, setIdPokemon ] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ataque, setAtaque] = useState(0);
  const [defensa, setDefensa ] = useState(0);
  const [message, setMessage] = useState("");
  const [busqueda, setBusqueda ] = useState("");

  /*const eliminarPokemons = (id) => {
    const eliminado = pokemons.filter((element) => element.id !== id);
    setPokemons(eliminado)
  }*/

  const handleChange = (e) => {
    console.log(e.target.value);
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar = (terminoBusqueda) => {
   
    var resultadoBusqueda = tablaPokemons.filter((elemento) => {
      console.log(elemento);
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
     ){
        return elemento;
      }
      return "";
    })
    setPokemons(resultadoBusqueda);
  }

  const limpiarCampos = () => {
    setIdPokemon(null)
    setName("");
    setImage("");
    setAtaque(0);
    setDefensa(0);
  }

  const cargarDatos = async () => {
    try {
      let res = await fetch("https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1", {
        method: "GET"
      })
      let resJson = await res.json();
      setPokemons(resJson);
      setTablaPokemons(resJson);
      console.log({obtenerDatos: resJson});
    } catch (error) {
      console.log(error);  
    }
  }

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1", {
        method: "POST" ,
        body: JSON.stringify({
          name: name, 
          image: image,
          attack: ataque, 
          defense: defensa, 
          type: "normal",
          idAuthor: 1,
          hp: 0,
          created_at: new Date(), 
          updated_at: new Date()
        })
      });
      //console.log(ataque)
      let resJson = await res.json();
      console.log({resultadoKev: resJson});
      cargarDatos();
      if (res.status === 200){
        limpiarCampos();
        setMessage("Pokemon creado correctamente")
      } else {
        setMessage("Ha ocurrido un error")
      }
      setTimeout(() => {
        setOpenModal(!modal)
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const getPokemonById = async(id) => {
    try {
      let res = await fetch(`https://pokemon-pichincha.herokuapp.com/pokemons/${id}`, {
        method: "GET"
      })
      let resJson = await res.json();
      
      console.log({obtenerPorId: resJson});
      if (resJson.idPokemon !== null) {setIdPokemon(resJson.id)} ;
      if (resJson.name !== "") {setName(resJson.name)} ;
      if (resJson.image !== "") { setImage(resJson.image)} ;
      if (resJson.attack !== "") {setAtaque(resJson.attack)} ;
      if (resJson.defense !== "") {setDefensa(resJson.defense)} ;
    } catch (error) {
      console.log(error);
    }
  }

  const updatePokemonById = async(e) => {
    e.preventDefault();
    try {
      let res = await fetch(`https://pokemon-pichincha.herokuapp.com/pokemons/${idPokemon}`, {
        method: "PUT", 
        body: JSON.stringify({
          name: name, 
          image: image,
          attack: ataque, 
          defense: defensa, 
          updated_at: new Date()
        })
      });
      let resJson = await res.json();
      console.log({actualizadoPokemon: resJson});
      cargarDatos();
      if (res.status === 200){
        limpiarCampos();
        setMessage("Pokemon actualizado correctamente")
      } else {
        setMessage("Ha ocurrido un error")
      }
      setTimeout(() => {
        setOpenModal(!modal)
      }, 2000);
    } catch (error) {
      console.log(error)
    }
  }

  /*const handleActions = (e) => {
    e.preventDefault();
    if(idPokemon === null){
      handleSumbit();
    }else {
      updatePokemonById(idPokemon);
    }
    

  }*/

  const deletePokemonById = async(id) => {
    try {
      let res = await fetch(`https://pokemon-pichincha.herokuapp.com/pokemons/${id}`, {
        method: "DELETE"
      })
      let resJson = await res.json();
      console.log({pokemonBorrado: resJson});
      cargarDatos();
    } catch (error) {
      console.log(error);
    }
  }

  const toggle = () => {
    setOpenModal(!modal);
    setIdPokemon(null);
    console.log({idPokemonInicio: idPokemon});
    limpiarCampos();
    setMessage("");
  }

  const togglEdit = (id) => {
    getPokemonById(id);
    console.log({idPokemonUpdate: id});
    setIdPokemon(id);
    setOpenModal(!modal);
    setMessage("");
  }

  useEffect(() => {
    /*async function cargarPokemones(){
      const respuesta = await fetch("https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1")
      const data = await respuesta.json();
      console.log({datosMuchos: data})
      setPokemons(data);
    }
    cargarPokemones();*/
    /*fetch("https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setPokemons(data);
    })*/
    cargarDatos();
  },[])

  return (
    <>
      <h3>Listado de pokemon</h3>
      <div className="container">
        <div>
          <input 
            type="search" 
            placeholder='Buscar' 
            className='search'
            value={busqueda} 
            onChange={handleChange} />
        </div>
        <div>
          <button 
            onClick={toggle} 
            className="buttonStyles"
          ><FontAwesomeIcon 
              icon={faPlus}  
          />&nbsp; Nuevo</button>
        </div>
      </div>
     
      <table className="styled-table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Imagen</th>
            <th scope="col">Ataque</th>
            <th scope="col">Defensa</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>  
        <tbody>
          {pokemons && pokemons.map((pokemon, i) => (
            <tr key={i}>
              <td>{pokemon.name}</td>
              <td>
                {pokemon.image.includes("https") ? 
                   <img src={pokemon.image} alt={pokemon.name} width={20} height={20}/>
                  : <p>{pokemon.name}</p> }
               
              </td>
              <td>{pokemon.attack}</td>
              <td>{pokemon.defense}</td>
              <td>
                <table className='intern-table'>
                  <tbody>
                    <tr>
                      <td>
                          <FontAwesomeIcon 
                            icon={faEdit}  
                            onClick={() => togglEdit(pokemon.id)} 
                            className="iconStyle"
                          />
                      </td>
                      <td>
                          <FontAwesomeIcon 
                            icon={faTrash} 
                            onClick={() => deletePokemonById(pokemon.id)}
                            className="iconStyle"
                            />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && 
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggle}>&times;</span>
            <p >Nuevo Pokemon</p>
            <div className="row">
              <div className="col">
                <label htmlFor="">Nombre: </label>
                <input 
                  type="text"  
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="">Ataque: </label>
                <input 
                  type="range" 
                  min={0} 
                  step={1}
                  max={100} 
                  value={ataque}
                  onChange={(e) => setAtaque(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="">Imagen: </label>
                <input 
                  type="text" 
                  placeholder='url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="">Defensa: </label>
                <input 
                  type="range" 
                  min={0} 
                  max={100}   
                  step={1}
                  value={defensa}
                  onChange={(e) => setDefensa(e.target.value)}
                  />
              </div>
              
              <div className="containerButton">
                <button  
                  type="submit" 
                  onClick={idPokemon === null ? handleSumbit : updatePokemonById} 
                  disabled={name === "" || image === "" } 
                  id="buttonSave"
                  className={`${name !== "" && image !== "" ? "buttonForm": "buttonInactive"}`}
                  
                ><FontAwesomeIcon 
                    icon={faSave}  
                />&nbsp; Guardar</button>
              
                <button 
                  onClick={toggle}
                  className="buttonForm"
                ><FontAwesomeIcon 
                    icon={faCancel}  
                />&nbsp; Cancelar</button>
              </div>
               
                     
                  
              <div className="message">{message ? <p>{message}</p> : null}</div>
            </div>
          </div>
      
      </div>
      
      }
     
    </>
    
  );
}

export default App;
