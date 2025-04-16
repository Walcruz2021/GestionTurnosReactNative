import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {getClients,deleteClient} from '../store/actions/actionsClients';
import {DataTable} from 'react-native-paper';
import ModalAddClient from '../components/Modal/ModalAddClient';
import AwesomeAlert from 'react-native-awesome-alerts';

const ListClients = () => {
  const dispatch = useDispatch();
  const listClients = useSelector(state => state.clients.allClients);
  const [modalAddClient, setModalAddClient] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const idCompany = '67ca2004e7c4d209a060f90b';
  useEffect(() => {
    dispatch(getClients(idCompany));
  }, []);

  

  return (
    <View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="¿Estás seguro?"
        message="¡El Cliente será borrado de la base de datos!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Sí"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={() => handleDelete()}
      />

      <ModalAddClient
        modalAddClient={modalAddClient}
        setModalAddClient={setModalAddClient}
      />
      <TouchableOpacity
        onPress={() => setModalAddClient(true)}
        style={styles.button}>
        <Image
          source={require('../icons/addClient.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nombre Cliente</DataTable.Title>
          <DataTable.Title numeric>Contacto</DataTable.Title>
          <DataTable.Title numeric>Domicilio</DataTable.Title>
          {/* <DataTable.Title numeric>Notas</DataTable.Title> */}
        </DataTable.Header>

        {listClients
          ? listClients.map(cli => {
              return (
                <View key={cli._id}>
                  <DataTable.Row>
                    <DataTable.Cell>{cli.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{cli.phone}</DataTable.Cell>
                    <DataTable.Cell numeric>{cli.address}</DataTable.Cell>
                    {/* <DataTable.Cell numeric>{cli.notesCli}</DataTable.Cell> */}
                  </DataTable.Row>
                </View>
              );
            })
          : null}
      </DataTable>

      <TouchableOpacity
        onPress={() => setShowAlert(true)}
        style={styles.button}>
        <Image
          source={require('../icons/deleteClient.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModalAddClient(true)}
        style={styles.button}>
        <Image
          source={require('../icons/editClient.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default ListClients;
