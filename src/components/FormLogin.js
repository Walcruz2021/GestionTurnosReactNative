import React, {useState} from 'react';
import {
  View,
  //Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { Text } from 'react-native-paper'; // O NativeBase, si lo prefieres
import {useNavigation} from '@react-navigation/native';
import LogoNew from '../IMAGENES/LogoNew.png';

import Icon from 'react-native-vector-icons/FontAwesome';

//import ModalRestPassword from "./ModalRestPassword"; // Asumiendo que tienes un modal para restablecer contraseña

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingrese correo y contraseña');
      return;
    }
    // Aquí puedes manejar el login
    Alert.alert('Éxito', 'Inicio de sesión exitoso');
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image source={LogoNew} style={styles.logo} />
        <Text style={styles.title}>Gestión de Turnos PY</Text>
        <Text style={styles.subtitle}>LOGIN AL SISTEMA</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="password" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            !email || !password ? styles.disabledButton : null,
          ]}
          onPress={handleSubmit}
          disabled={!email || !password}>
          <Text style={styles.buttonText}>Inicio de Sesión</Text>
        </TouchableOpacity>

        {/* <ModalRestPassword visible={showModal} setVisible={setShowModal} /> */}

        <View style={styles.registerContainer}>
          <Text>¿No tiene una cuenta?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.registerText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={{ padding: 2, fontWeight: 'bold'}}>Gestion de Turnos PY</Text>
        <Text style={{ padding: 2 }}> Con Sistema de Gestión de Turnos de PymesYa, podrás:</Text>
        <Text style={{ padding: 2 }}>Administrar tus turnos</Text>
        <Text style={{ padding: 2 }}>Administrar tus Clientes</Text>
        <Text style={{ padding: 2 }}>Ahorrar Tiempo</Text>
        <Text style={{ padding: 2 }}>Detalle de tus Ingresos y Gastos</Text>
        <Text style={{ padding: 2 }}>Completamente Gratuito</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //permite que ocupe todo el espacio disponible
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
  },
  loginContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#007bff',
    marginLeft: 5,
  },
});

export default FormLogin;
