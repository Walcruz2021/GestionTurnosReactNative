import axios from "axios";
import host from "../../ruteBack/vbleDeploy";
export const DELETE_DOG = "DELETE_DOG";
export const UPDATE_DOG = "UPDATE_DOG";
export const ADD_PETS = "ADD_PETS";
export const SEARCH_VTA_CLIENT="SEARCH_VTA_CLIENT"
export function addPets(payload, idClient) {

  return async function (dispatch) {
    try {
      const newPet = await axios.post(
        //`http://localhost:3002/api/addPerro/${idClient}`,
        `${host}/api/addPerro/${idClient}`,
        payload
      );
      return newPet;
    } catch (error) {
      console.log(error);
    }
  };
}


//funciona bien
export function deleteDog(idDog) {
    return async function (dispatch) {
      await axios.put(
        //`http://localhost:3002/api/deleteDog/${idDog}`
        `${host}/api/deleteDog/${idDog}`
      );
      return dispatch({
        type: DELETE_DOG,
      });
    };
  }


export function updateDog(payload, idDog) {
    return async function (dispatch) {
      await axios.put(
        //`http://localhost:3002/api/editDog/${idDog}`, payload
        `${host}/api/editDog/${idDog}`,
        payload
      );
      return dispatch({
        type: UPDATE_DOG,
      });
    };
  }


export function searchHistorialDog(payload) {
  //console.log(payload)
  //628ae8c5d66d1f4760a023be del perro seleccionado
  return async function (dispatch) {
    const vtaxClient = await axios.get(
      //`http://localhost:3002/api/ventaCli/${payload}`
      `${host}/api/ventaCli/${payload}`
    );

    return dispatch({
      type: SEARCH_VTA_CLIENT,
      payload: vtaxClient,
    });
  };
}