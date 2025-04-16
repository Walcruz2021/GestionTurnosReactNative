import {
  View,
  Button,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {React, useState} from 'react';
import {KeyObject} from 'crypto';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addClient} from '../../store/actions/actionsClients';
import {useSelector, useDispatch} from 'react-redux';

const ModalAddClient = ({modalAddClient, setModalAddClient}) => {
  const idCompany = '67ca2004e7c4d209a060f90b';
  const dispatch = useDispatch();
  const [stateValue, setStateValue] = useState({
    name: '',
    phone: '',
    address: '',
    notesCli: '',
    email: '',
  });

  const handleChange = (field, value) => {
    setStateValue(prev => ({...prev, [field]: value}));
  };

  const handleClose = () => {
    setModalAddClient(false);
    setStateValue({
      name: '',
      phone: '',
      address: '',
      notesCli: '',
      email: '',
    });
  };

  const handleSumbit = () => {
  
    if (
      stateValue.name.trim() === '' ||
      stateValue.phone.trim() === '' ||
      stateValue.notesCli.trim() === '' ||
      stateValue.address.trim() === ''
    ) {
      Alert.alert('Faltan Datos por Completar');
    } else {
      dispatch(
        addClient({
          name: stateValue.name,
          address: stateValue.address,
          notesCli: stateValue.notesCli,
          phone: stateValue.phone,
          status: true,
          // Company: companySelectedState._id,
          Company: idCompany,
          email: stateValue.email,
        }),
      );
      Alert.alert('Cliente Creado Correctamente');
      setModalAddClient(false);
      setStateValue({
        name: '',
        phone: '',
        address: '',
        notesCli: '',
        email: '',
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalAddClient}
      onRequestClose={() => setModalAddClient(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={{alignSelf: 'flex-end'}}>
            <Icon name="times" onPress={handleClose} size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalText}>Adherir Cliente</Text>

          <View style={styles.line} />
          <Text style={styles.label}>Nombre y Apellido</Text>
          <TextInput
            style={styles.input}
            placeholder="Pepe Argennto"
            placeholderTextColor="#aaa"
            value={stateValue.name}
            onChangeText={value => handleChange('name', value)}
          />
          <Text style={styles.label}>Domicilio</Text>
          <TextInput
            style={styles.input}
            placeholder="Dean Fuenes 2512"
            placeholderTextColor="#aaa"
            value={stateValue.address}
            onChangeText={value => handleChange('address', value)}
          />
          <Text style={styles.label}>Teléfono de Contacto</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            value={stateValue.phone}
            onChangeText={value => {
              const numericValue = value.replace(/[^0-9]/g, ''); // Solo permite números
              handleChange('phone', numericValue);
            }}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Nota Cliente</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaa"
            value={stateValue.notesCli}
            onChangeText={value => handleChange('notesCli', value)}
            multiline={true}
            numberOfLines={4}
          />

          <Pressable onPress={() => handleSumbit()} style={styles.closeButton}>
            <Text style={[styles.ButtonText, styles.Button]}>
              Agregar Cliente
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignSelf: 'flex-start',
  },
  Button: {
    marginTop: 8,
    backgroundColor: '#5499c7',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc', //color del borde del input
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
    width: '100%',
    borderWidth: 1, // Reduce el grosor del borde
    marginTop: 4,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
    alignSelf: 'flex-start', // Asegura que el texto no se centre dentro de un contenedor flex
    marginTop: 5,
  },
  line: {
    height: 6, // Altura de la línea
    backgroundColor: 'red', // Color de la línea
    marginVertical: 10, // Espacio antes y después de la línea
  },
});

export default ModalAddClient;
