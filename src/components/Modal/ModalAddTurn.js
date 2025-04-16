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
import {React, useState, useEffect} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {addTurnos} from '../../store/actions/actionsTurnos';
import AwesomeAlert from 'react-native-awesome-alerts';

const ModalAddTurn = ({modalAddTurno, setModalAddTurno}) => {
  //const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();
  const [optionsListSelect, setOptionsListSelect] = useState([]);

  const listClientsAll = useSelector(state => state.clients.allClients);
  const [selectedValue, setSelectedValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [openTime, setOpenTime] = useState(false);

  const [dateSelectedState, setDateSelectedState] = useState('');
  const [stateTimeSelected, setTimeSelected] = useState('');

  const [open, setOpen] = useState(false);
  const [showAlertAddTurn, setShowAlertAddTurn] = useState(false);
  const [valueHora, setValueHour] = useState('');

  const [stateInput, setStateInput] = useState({
    name: '',
    nameDog: '',
    idDog: '',
    notesTurn: '',
    idClient: '',
    phone: '',
  });

  console.log(stateInput, 'stateInput');
  const idCompany = '67ca2004e7c4d209a060f90b';
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const updateOptionsList = clients => {
    const options = clients.map(cliente => {
      let arrayDogs = [];
      if (cliente.perros.length > 0) {
        arrayDogs = cliente.perros.filter(dog => dog.status === true);
      }
      return {
        value: cliente._id,
        label: cliente.name,
        label2: cliente.phone,
        label3: arrayDogs,
        label4: cliente.email,
      };
    });
    setOptionsListSelect(options);
  };

  useEffect(() => {
    if (listClientsAll) {
      updateOptionsList(listClientsAll);
    }
  }, [listClientsAll]);

  function handleChangeClient(selected) {
    console.log(selected, 'selected');
    setStateInput({
      ...stateInput,
      idClient: selected._id,
      name: selected.name,
      arrayDogs: selected.perros,
      phone: selected.phone,
      nameDog: '',
      idDog: '',
    });
  }

  const handleChange = (field, value) => {
    setStateInput(prev => ({...prev, [field]: value}));
  };

  const handleClose = () => {
    setModalAddTurno(false);
    setStateInput({
      date: '',
      time: '',
      notesTurn: '',
    });
  };

  const handleSumbit = () => {
    dispatch(
      addTurnos({
        name: stateInput.name,
        nameDog: stateInput.nameDog,
        idDog: stateInput.idDog,
        date: dateSelectedState,
        notesTurn: stateInput.notesTurn,
        idClient: stateInput.idClient,
        time: stateTimeSelected,
        phone: stateInput.phone,
        Company: idCompany,
      }),
    );
    setShowAlertAddTurn(true);
    setStateInput({
      name: '',
      nameDog: '',
      idDog: '',
      notesTurn: '',
      idClient: '',
      phone: '',
    });
  };

  function handleChangePet(selected) {
    console.log(selected, 'selected');

    /*setStateInput({
      ...stateInput,
      idClient: selectedValue,
      name: selectedValue.label,
    });*/
  }

  const arraySelectClient = listClientsAll => {
    const data = [];
    let arrayItemClients = listClientsAll?.filter(
      option => typeof option.name === 'string' && !option.name.includes('{'),
    );
    arrayItemClients.map(item => {
      data.push({label: item.name, value: item});
    });
    return data;
  };

  function arraySelectPets(arrayDog) {
    const optionSelectPerro = [];
    if (arrayDog && arrayDog.length > 0) {
      arrayDog.map(np => {
        const option = {label: np.nameDog, value: np._id};
        optionSelectPerro.push(option);
      });
    }
    return optionSelectPerro;
  }

  return (
    <View>
      <AwesomeAlert
        show={showAlertAddTurn}
        showProgress={false}
        title="¡Éxito!"
        message="Turno Creado Correctamente."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#4BB543" // Verde
        onConfirmPressed={() => {
          setShowAlertAddTurn(false), setModalAddTurno(false);
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAddTurno}
        onRequestClose={() => setModalAddTurno(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={handleClose}
              style={{alignSelf: 'flex-end'}}>
              <Icon name="times" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalText}>Agregar Turno</Text>

            <RNPickerSelect
              onValueChange={value => handleChangeClient(value)}
              items={arraySelectClient(listClientsAll)}
              placeholder={{label: 'Seleccione un cliente', value: null}}
            />

            <RNPickerSelect
              onValueChange={value => handleChangePet(value)}
              items={arraySelectPets(stateInput.arrayDogs)}
              placeholder={{label: 'Seleccione una mascota', value: null}}
            />

            <View style={styles.line} />

            <Button title="Seleccionar fecha" onPress={() => setOpen(true)} />

            <DatePicker
              modal
              open={open}
              date={date}
              mode="date"
              onConfirm={selectedDate => {
                if (selectedDate instanceof Date) {
                  setOpen(false);
                  const formattedDate = selectedDate.toLocaleDateString(
                    'es-ES',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    },
                  );

                  setDateSelectedState(formattedDate);
                }
              }}
              onCancel={() => setOpen(false)}
            />

            <Text>Fecha seleccionada: {dateSelectedState}</Text>

            <Button
              title="Seleccionar Hora"
              onPress={() => setOpenTime(true)}
            />
            <DatePicker
              modal
              open={openTime}
              date={time}
              mode="time" // Modo de hora
              is24hour={true} // Configura formato 24h (true) o 12h (false)
              onConfirm={selectedTime => {
                setOpenTime(false);
                setTime(selectedTime);
                const timeSelected = time.toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                setTimeSelected(timeSelected);
              }}
              onCancel={() => setOpenTime(false)}
            />
            <Text>
              Hora seleccionada:{' '}
              {time.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>

            <Text style={styles.label}>Nota Turno</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaa"
              value={stateInput.notesTurn}
              onChangeText={value => handleChange('notesTurn', value)}
              multiline={true}
              numberOfLines={4}
            />

            <Pressable
              onPress={() => handleSumbit()}
              style={styles.closeButton}>
              <Text style={[styles.ButtonText, styles.Button]}>
                Agregar Turno
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

export default ModalAddTurn;
