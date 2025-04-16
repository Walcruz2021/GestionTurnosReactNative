import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';

//View=div
//¿Cuándo usar SafeAreaView?
//SafeAreaView es un componente de React Native que garantiza que el contenido no se superponga con las áreas seguras del dispositivo, 
//como la barra de estado (notificaciones), la "notch" en iPhones o la barra de navegación en algunos dispositivos Android.
//Cuando deseas asegurarte de que tu UI no quede oculta detrás de elementos del sistema en dispositivos con notch o bordes redondeados.

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.texto}>Planificador de Gastos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
  },
});

export default Header;
