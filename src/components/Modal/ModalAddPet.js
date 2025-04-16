import React, {useState, useEffect} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {addPets} from '../../store/actions/actionsPets';
import AwesomeAlert from 'react-native-awesome-alerts';
import RNPickerSelect from 'react-native-picker-select';

const ModalAddPet = ({modalAddDog, setModalAddDog}) => {
  const dispatch = useDispatch();
  const listClientsAll = useSelector(state => state.clients.allClients);
  const [showAlertAddPet, setShowAlertAddPet] = useState(false);
  const [selectedTam, setSelectedTam] = useState('');

  const [stateInput, setStateInput] = useState({
    idClient: '',
    nameDog: '',
    notaP: '',
    raza: '',
  });

  const handleClose = () => {
    setModalAddDog(false);
    setStateInput({
      nameDog: '',
      notaP: '',
      raza: '',
    });
    setSelectedTam('');
  };

  const onClose = () => {
    console.log('se hizo click');
  };

  function handleChangePet(selected) {
    const selectedValue = selected;

    setStateInput({
      ...stateInput,
      idClient: selectedValue,
      name: selectedValue.name,
    });
  }
  const handleChange = (field, value) => {
    setStateInput(prev => ({...prev, [field]: value}));
  };

  const handleSumbit = () => {
    dispatch(
      addPets(
        {
          nameDog: stateInput.nameDog,
          notaP: stateInput.notaP,
          raza: stateInput.raza,
          tamaño: selectedTam,
        },
        stateInput.idClient,
      ),
    );
    setShowAlertAddPet(true);
    setStateInput({
      nameDog: '',
      idClient: '',
      nameDog: '',
      notaP: '',
      raza: '',
    });
  };

  const arraySelectClient = listClientsAll => {
    const data = [];
    let arrayItemClients = listClientsAll?.filter(
      option => typeof option.name === 'string' && !option.name.includes('{'),
    );
    arrayItemClients.map(item => {
      data.push({label: item.name, value: item._id});
    });
    return data;
  };

  return (
    <View>
      <AwesomeAlert
        show={showAlertAddPet}
        showProgress={false}
        title="¡Éxito!"
        message="Mascota Creada Correctamente."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#4BB543" // Verde
        onConfirmPressed={() => {
          setShowAlertAddPet(false), setModalAddDog(false);
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAddDog}
        onRequestClose={() => setModalAddDog(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={handleClose}
              style={{alignSelf: 'flex-end'}}>
              <Icon name="times" size={30} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalText}>Adherir Mascota</Text>

            <View style={styles.line} />

            <RNPickerSelect
              onValueChange={listClientsAll => handleChangePet(listClientsAll)}
              items={arraySelectClient(listClientsAll)}
              placeholder={{label: 'Seleccione un cliente', value: null}}
            />
            <Text style={styles.label}>Nombre Mascota</Text>
            <TextInput
              style={styles.input}
              placeholder="Firulais"
              placeholderTextColor="#aaa"
              value={stateInput.nameDog}
              onChangeText={value => handleChange('nameDog', value)}
            />
            <Text style={styles.label}>Raza</Text>
            <TextInput
              style={styles.input}
              placeholder="Doberman"
              placeholderTextColor="#aaa"
              value={stateInput.raza}
              onChangeText={value => handleChange('raza', value)}
            />

            <Text style={styles.label}>Nota Mascota</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaa"
              value={stateInput.notesCli}
              onChangeText={value => handleChange('notaP', value)}
              multiline={true}
              numberOfLines={4}
              s
            />

            <RNPickerSelect
              onValueChange={itemValue => setSelectedTam(itemValue)}
              items={[
                {label: 'Pequeño', value: 'Pequeño'},
                {label: 'Mediano', value: 'Mediano'},
                {label: 'Grande', value: 'Grande'},
              ]}
              placeholder={{label: 'Seleccione tamaño mascota', value: null}}
            />

            <Pressable
              onPress={() => handleSumbit()}
              style={styles.closeButton}>
              <Text style={[styles.ButtonText, styles.Button]}>
                Agregar Mascota
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
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

export default ModalAddPet;
