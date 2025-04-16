import axios from "axios";
import host from "../../ruteBack/vbleDeploy"
export const GET_CLIENTS = "GET_CLIENTS";
export const DELETE_CLIENT="DELETE_CLIENT"


export function getClients(idCompany) {

    return async function (dispatch) {
      const listCli = await axios.get(
        //"http://localhost:3002/api/listClients",
        //`${host.development}/api/listClientsCompany/66465ac8c1212f4dc0088087`,
        `${host}/api/listClientsCompany/${idCompany}`,
        {}
      );

      return dispatch({
        type: GET_CLIENTS,
        payload: listCli.data.clientes,
      });
    };
  }

  export function addClient(payload) {
    return async function (dispatch) {
      try {
        const newClient = await axios.post(
          //"http://localhost:3002/api/client",
          `${host}/api/client`,
          payload
        );
        return newClient;
      } catch (error) {
        console.log(error);
      }
    };
  }

  
export const deleteClient = (clientId) => async (dispatch) => {
  // console.log(clientId,"actions")

  try {
    const response = await axios.delete(
      //`http://localhost:3002/api/deleteClient/${clientId}`
      `${host}/api/deleteClient/${clientId}`
    );

    if (response.status === 200 || response.status === 204) {
      dispatch({ type: "DELETE_CLIENT", payload: clientId });
    }

    return response; // <-- Devolvemos la respuesta de la API
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return error.response; // <-- Devolvemos el error para manejarlo en el componente
  }
};

  