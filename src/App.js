import React, { useState, useEffect } from 'react';
import { getPokemons, getPokemonById, createPokemon, updateByIdPokemon, deleteByIdPokemon } from './api/pokemons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './styles/styles.css';
import { TablePokemons } from './components/TablePokemons';
import { ModalPokemon } from './components/ModalPokemon';
import { SearchPokemon } from './components/SearchPokemon';
import { ModalDeletePokemon } from './components/ModalDeletePokemon';

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [tablaPokemons, setTablaPokemons] = useState([]);
  const [modal, setOpenModal] = useState(false);
  const [modalDelete, setOpenModalDelete] = useState(false);
  const [idPokemon, setIdPokemon] = useState(null);
  const [idPokemonDelete, setIdPokemonDelete ] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ataque, setAtaque] = useState(0);
  const [defensa, setDefensa] = useState(0);
  const [message, setMessage] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (e) => {
    //console.log(e.target.value);
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar = (terminoBusqueda) => {

    var resultadoBusqueda = tablaPokemons.filter((elemento) => {
      //console.log(elemento.attack.toString().includes(terminoBusqueda));
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.attack.toString().includes(terminoBusqueda)
        || elemento.defense.toString().includes(terminoBusqueda)
      ) {
        return elemento;
      }
      return "";
    })
    setPokemons(resultadoBusqueda);
  }

  const limpiarCampos = () => {
    setIdPokemon(null)
    setIdPokemonDelete(null);
    setName("");
    setImage("");
    setAtaque(0);
    setDefensa(0);
  }

  const cargarDatos = async () => {
    const resultado = await getPokemons();
    setPokemons(resultado);
    setTablaPokemons(resultado);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const objPokemon = {
      name,
      image,
      attack: ataque,
      defense: defensa,
      type: "normal",
      idAuthor: 1,
      hp: 0,
      created_at: new Date(),
      updated_at: new Date()
    }
    createPokemon({ objPokemon, setMessage, cargarDatos, limpiarCampos, setOpenModal, modal });

  }

  const cargarPokemonPorId = async (id) => {
    const resultado = await getPokemonById(id);
    if (resultado.idPokemon !== null) { 
      setIdPokemon(resultado.id) 
      setIdPokemonDelete(resultado.id)
    };
    if (resultado.name !== "") { setName(resultado.name) };
    if (resultado.image !== "") { setImage(resultado.image) };
    if (resultado.attack !== "") { setAtaque(resultado.attack) };
    if (resultado.defense !== "") { setDefensa(resultado.defense) };
  }

  const updatePokemonById = async (e) => {
    e.preventDefault();
    const objPokemon = {
      name,
      image,
      attack: ataque,
      defense: defensa,
      updated_at: new Date()
    }
    updateByIdPokemon({ idPokemon, objPokemon, setMessage, cargarDatos, limpiarCampos, setOpenModal, modal })

  }

  const deletePokemonById = async (id) => {
    await deleteByIdPokemon(id);
    setMessage("Pokemon Eliminado con éxito")
    setTimeout(() => {
      setOpenModalDelete(!modalDelete);
    }, 1500);
    cargarDatos();
  }

  const toggle = () => {
    setOpenModal(!modal);
    setIdPokemon(null);
    setIdPokemonDelete(null);
    console.log({ idPokemonInicio: idPokemon });
    limpiarCampos();
    setMessage("");
  }

  const togglEdit = (id) => {
    cargarPokemonPorId(id);
    console.log({ idPokemonUpdate: id });
    setIdPokemon(id);
    setIdPokemonDelete(null);
    setOpenModal(!modal);
    setMessage("");
  }

  const toggleClose = () => {
    setOpenModalDelete(!modalDelete);
  }

  const toggleDelete = (id) => {
    cargarPokemonPorId(id);
    console.log({idDelete: idPokemon});
    setIdPokemonDelete(id);
    setIdPokemon(null);
    setOpenModalDelete(!modalDelete);
    setMessage("");
  }

  useEffect(() => {
    cargarDatos();
  }, [])

  return (
    <>
      <h3>Listado de pokemon</h3>
      <div className="container">
        <SearchPokemon
          busqueda={busqueda}
          handleChange={handleChange}
        />
        <div>
          <button
            onClick={toggle}
            className="buttonStyles"
          ><FontAwesomeIcon
              icon={faPlus}
            />&nbsp; Nuevo</button>
        </div>
      </div>
      <TablePokemons
        pokemons={pokemons}
        deletePokemonById={deletePokemonById}
        toggleDelete={toggleDelete}
        togglEdit={togglEdit}
      />
      {modal &&
        <ModalPokemon
          toggle={toggle}
          name={name}
          image={image}
          ataque={ataque}
          defensa={defensa}
          message={message}
          idPokemon={idPokemon}
          setName={setName}
          setAtaque={setAtaque}
          setImage={setImage}
          setDefensa={setDefensa}
          handleSubmit={handleSubmit}
          updatePokemonById={updatePokemonById}
        />
      }
      {modalDelete && 
        <ModalDeletePokemon
          name={name}
          message={message}
          idPokemonDelete={idPokemonDelete}
          toggleClose={toggleClose}
          deletePokemonById={deletePokemonById}
        />
      }

    </>

  );
}

export default App;
