
export const getPokemons = async () => {
    var resultado;
    try {
        let res = await fetch("https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1", {
            method: "GET", 
            headers: {"content-type": "application/json"}
        })
        let resJson = await res.json();
        //console.log({ obtenerDatos: resJson });
        if (res.status === 200) {
            console.log("Pokemons obtenidos")
        } else {
            console.log("Ha ocurrido un error");
        }
        resultado = resJson;
    } catch (error) {
        console.log(error);
        resultado = error
    }

    return resultado;
}

export const getPokemonById = async (id) => {
    var resultado;
    try {
        let res = await fetch(`https://pokemon-pichincha.herokuapp.com/pokemons/${id}`, {
            method: "GET", 
            headers: {"content-type": "application/json"}
        })
        let resJson = await res.json();
        resultado = resJson;
        if (res.status === 200) {
            console.log("Pokemon obtenidos")
        } else {
            console.log("Ha ocurrido un error");
        }
    } catch (error) {
        console.log(error);
        resultado = error;
    }
    return resultado;
}

export const deleteByIdPokemon = async (id) => {
    var resultado;
    try {
        let res = await fetch(`https://pokemon-pichincha.herokuapp.com/pokemons/${id}`, {
            method: "DELETE", 
            headers: {"content-type": "application/json"}
        })
        let resJson = await res.json();
        resultado = resJson;
        //console.log({ pokemonBorrado: resJson });
        if (res.status === 200) {
            console.log("Pokemons elininado")
        } else {
            console.log("Ha ocurrido un error");
        }
    } catch (error) {
        console.log(error);
        resultado = error;
    }
    return resultado;
}

export const createPokemon = async ({ objPokemon, setMessage, cargarDatos, limpiarCampos, setOpenModal , setErrors, modal }) => {
    //e.preventDefault();
    var resultado;
    try {
        let res = await fetch("https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(objPokemon)
        });
        //console.log(ataque)
        let resJson = await res.json();
        console.log({ resultadoKev: resJson });

        //console.log(resJson.data.errors)
        if (res.status === 200) {
            setMessage("Pokemon creado correctamente")
            cargarDatos();
            limpiarCampos();
            setTimeout(() => {
                setOpenModal(!modal)
            }, 1500);

        } else {
            setMessage("Ha ocurrido un error")
            if(resJson.statusCode === 400){
                console.log(resJson.data.errors )
                setErrors(resJson.data.errors)
            }
        }
        resultado = res;
    } catch (error) {
        console.log(error);
        //console.log({kevinnn: error.data})
        resultado = error;
    }

    return resultado;
}

export const updateByIdPokemon = async ({ idPokemon, objPokemon, setMessage, cargarDatos, limpiarCampos, setOpenModal, modal }) => {
    //e.preventDefault();
    try {
        let res = await fetch(`https://pokemon-pichincha.herokuapp.com/pokemons/${idPokemon}`, {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(objPokemon)
        });
        await res.json();
        //console.log({ actualizadoPokemon: resJson });
        if (res.status === 200) {
            setMessage("Pokemon actualizado correctamente")
            cargarDatos();
            limpiarCampos();
            setTimeout(() => {
                setOpenModal(!modal)
            }, 1500);
        } else {
            setMessage("Ha ocurrido un error")
        }

    } catch (error) {
        console.log(error)
    }
}
