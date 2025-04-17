import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {DataTable} from 'react-native-paper';
import rutaBackend from '../ruteBack/vbleDeploy';
import AwesomeAlert from 'react-native-awesome-alerts';
import {getTurnos, deleteTurno} from '../store/actions/actionsTurnos';
import ModalEditTurn from './Modal/ModalEditTurn';
import ModalDescription from './Modal/ModalDescription';
const TableTurns = () => {
  const [turnos, setTurnos] = useState([]); // Estado para guardar los turnos
  const idCompany = '67ca2004e7c4d209a060f90b';
  const listTurnos = useSelector(state => state.turns.allTurnos);
  const [showAlertConf, setShowAlertConf] = useState(false);
  const [showAlertDel, setShowAlertDel] = useState(false);
  const [stateDataEdit, setStateDataEdit] = useState();
  const [stateDataDescription, setStateDataDescription] = useState();
  const [stateDataDel, setDataDel] = useState({
    index: '',
    idTurn: '',
  });
  const [modalEditTurno, setModalEditTurno] = useState(false);
  const [modalDescription, setModalDescription] = useState(false);
  const dispatch = useDispatch();
  const [expandedRow, setExpandedRow] = useState(null);
  // useEffect(() => {
  //   const functionListTurnos = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${rutaBackend}/api/getTurnos/${idCompany}`,
  //       );
  //       setTurnos(response.data.turnos); // Guarda los datos en el estado
  //     } catch (error) {
  //       console.error('Error al obtener los turnos:', error);
  //     }
  //   };
  //   functionListTurnos();
  // }, []);

  const toggleRow = id => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleDelete = () => {
    setShowAlertConf(false);
    setShowAlertDel(!showAlertDel);
    dispatch(deleteTurno(stateDataDel.idTurn));
    dispatch(getTurnos(idCompany));
  };

  const handleEditTurn = dataTurn => {
    setStateDataEdit(dataTurn);
    setModalEditTurno(true);
  };

  const handleDescription = dataTurn => {
    setStateDataDescription(dataTurn);
    setModalDescription(true);
  };

  return (
    <View>
      <ModalEditTurn
        modalEditTurno={modalEditTurno}
        setModalEditTurno={setModalEditTurno}
        stateDataEdit={stateDataEdit}
        setStateDataEdit={setStateDataEdit}
      />

      <ModalDescription
        modalDescription={modalDescription}
        setModalDescription={setModalDescription}
        stateDataDescription={stateDataDescription}
        setStateDataDescription={setStateDataDescription}
      />

      <AwesomeAlert
        show={showAlertConf}
        showProgress={false}
        title="¿Estás seguro?"
        message="¡El Turno será borrado de la base de datos!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Sí"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setShowAlertConf(false)}
        onConfirmPressed={() => handleDelete()}
      />

      <AwesomeAlert
        show={showAlertDel}
        showProgress={false}
        title="¡Éxito!"
        message="El turno fue eliminado correctamente."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#4BB543" // Verde
        onConfirmPressed={() => setShowAlertDel(false)}
      />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{flex: 2}}>Nombre Mascota</DataTable.Title>
          <DataTable.Title style={{flex: 1.5}}>Fecha</DataTable.Title>
          <DataTable.Title style={{flex: 1.5}}>Horario</DataTable.Title>
          <DataTable.Title style={{flex: 0}}>Más</DataTable.Title>
        </DataTable.Header>

        {listTurnos
          ? listTurnos.map((turn, index) => {
              return (
                <View key={turn._id}>
                  <DataTable.Row>
                    <DataTable.Cell>{turn.nameDog}</DataTable.Cell>
                    <DataTable.Cell numeric>{turn.date}</DataTable.Cell>
                    <DataTable.Cell numeric>{turn.time}</DataTable.Cell>
                    <TouchableOpacity onPress={() => toggleRow(turn._id)}>
                      <DataTable.Cell numeric>
                        {expandedRow === turn._id ? (
                          <Image
                            source={require('../icons/openIcon.png')}
                            style={styles.image}
                          />
                        ) : (
                          <Image
                            source={require('../icons/closeIcon.png')}
                            style={styles.image}
                          />
                        )}
                      </DataTable.Cell>
                    </TouchableOpacity>
                  </DataTable.Row>

                  {expandedRow === turn._id && (
                    <DataTable.Row style={{justifyContent: 'center'}}>
                      <DataTable.Cell colSpan={3}>
                        <View
                          style={{
                            paddingVertical: 5,
                            flexDirection: 'row',
                            gap: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              // handleDelete({idTurn: turn._id, index: index})
                              {
                                setShowAlertConf(!showAlertConf),
                                  setDataDel({idTurn: turn._id, index: index});
                              }
                            }>
                            <Image
                              source={require('../icons/delete.png')}
                              style={styles.image}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => handleEditTurn(turn)}>
                            <Image
                              source={require('../icons/edit2.png')}
                              style={styles.image}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => handleDescription(turn)}>
                            <Image
                              source={require('../icons/info.png')}
                              style={styles.image}
                            />
                          </TouchableOpacity>
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                  )}
                </View>
              );
            })
          : null}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default TableTurns;
