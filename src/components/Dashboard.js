import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import axios from 'axios';
import rutaBackend from '../ruteBack/vbleDeploy';
import {useNavigation} from '@react-navigation/native';
import ModalAddClient from './Modal/ModalAddClient.js';
import ModalAddTurn from './Modal/ModalAddTurn.js';
import ModalAddPet from './Modal/ModalAddPet.js';

import tw from 'tailwind-react-native-classnames';
import TableTurns from './TableTurns.js';
import {useDispatch, useSelector} from 'react-redux';
import {getClients} from '../store/actions/actionsClients.js';


const Dashboard = () => {
  const listClients = useSelector(state => state.clients);
  const dispatch = useDispatch();

  const [turnos, setTurnos] = useState([]); // Estado para guardar los turnos
  const [modalAddClient, setModalAddClient] = useState(false);
  const [modalAddTurno, setModalAddTurno] = useState(false);
  const [modalAddDog, setModalAddDog] = useState(false);


  const [text, setText] = useState();
  const navigation = useNavigation();
  const idCompany = '67ca2004e7c4d209a060f90b';

  // useEffect(() => {
  //   const functionListTurnos = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${rutaBackend}/api/getTurnos/${idCompany}`,
  //       );
  //       setTurnos(response.data.turnos); // Guarda los datos en el estado
  //     } catch (error) {
  //       console.error('Error al obtener los turnos:', error); // Log para depuración
  //     }
  //   };

  //   functionListTurnos(idCompany);
  // }, []); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    if (idCompany) {
      dispatch(getClients(idCompany));
    }
  }, []);

  return (
    <View>
      <ModalAddClient
        modalAddClient={modalAddClient}
        setModalAddClient={setModalAddClient}
      />

      <ModalAddPet modalAddDog={modalAddDog} setModalAddDog={setModalAddDog} />

      <ModalAddTurn
        modalAddTurno={modalAddTurno}
        setModalAddTurno={setModalAddTurno}
      />

      {/* flex-row flex-wrap → Permite que los botones se ajusten automáticamente en filas. */}
      {/* justify-between → Espacia los botones uniformemente en la fila. */}
      <View style={tw`flex-row flex-wrap justify-between p-4`}>
        <TouchableOpacity
          onPress={() => setModalAddTurno(true)}
          style={styles.button}>
          <Image
            source={require('../icons/addTurn.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalAddDog(true)}
          style={styles.button}>
          <Image source={require('../icons/addPet.png')} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalAddClient(true)}
          style={styles.button}>
          <Image
            source={require('../icons/addClient.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ListClients')}
          style={styles.button}>
          <Image
            source={require('../icons/listClients.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <TableTurns />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ff5757',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});
export default Dashboard;
