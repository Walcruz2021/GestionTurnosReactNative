import axios from "react-native-axios";
import host from "../../ruteBack/vbleDeploy";
export const GET_TURNOS = "GET_TURNOS";
export const DELETE_TURNO = "DELETE_TURNO";
export const UPDATE_TURNO = "UPDATE_TURNO";
export const ORDER_TURNOS = "ORDER_TURNOS";




export function addTurnos(payload) {
 
  return async function (dispatch) {
    try {
      const newTurno = await axios.post(
        //"http://localhost:3002/api/turno",
        `${host}/api/turno`,
        payload
      );
      return newTurno;
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTurnos(idCompany) {

  return async function (dispatch) {
    const listTurnos = await axios.get(
      `${host}/api/getTurnos/${idCompany}`,
      //`http://localhost:3002/api/getTurnos/${idCompany}`,
      //"http://localhost:3002/api/getTurnos",
      //"https://peluqueriapichichu.onrender.com/api/getTurnos",
      {}
    );
    // con esto me doy cuenta si el request desde el actions se esta ejecutando correctamente

    return dispatch({
      type: GET_TURNOS,
      payload: listTurnos.data.turnos,
    });
  };
}

export function deleteTurno(turnoId) {
  return async function (dispatch) {
    await axios.delete(
      //`http://localhost:3002/api/deleteTurno/${turnoId}`
      `${host}/api/deleteTurno/${turnoId}`
    );
    return dispatch({
      type: DELETE_TURNO,
    });
  };
}

export function updateTurno(payload, idElement) {
  console.log(payload,"actions")
  return async function (dispatch) {
    await axios.put(
      //`http://localhost:3002/api/editTurno/${idElement}`,
      `${host}/api/editTurno/${idElement}`,
      payload
    );
    // await axios.get("http://localhost:3002/api/listClients").then((data) => {
    //   return dispatch({
    //     type:UPDATE_CLIENT,
    //     payload:data.data.payload
    //   });
    // });
    return dispatch({
      type: UPDATE_TURNO,
    });
  };
}