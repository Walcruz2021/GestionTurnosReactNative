import React, {useState} from 'react';
import {Modal, View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalDescription = ({
  modalDescription,
  setModalDescription,
  stateDataDescription,
  setStateDataDescription,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalDescription}
      onRequestClose={modalDescription}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Image
            source={require('../../icons/clientInfo.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Información del Cliente</Text>

          <View style={styles.row}>
            <Icon name="user" size={20} />
           {stateDataDescription.name?<Text style={styles.text}>{stateDataDescription.name}</Text>:null}
          </View>

          <View style={styles.row}>
            <Icon name="phone" size={20} />

          {stateDataDescription.phone?<Text style={styles.text}>{stateDataDescription.phone}</Text>:null}
         
          </View>

          <View style={styles.row}>
            <Icon name="envelope" size={20} />
           <Text style={styles.text}>
              {stateDataDescription.email
                ? stateDataDescription.email
                : 'No tiene email'}
            </Text>
          </View>

          <View style={styles.row}>
            <Icon name="sticky-note" size={20} />
           <Text style={styles.text}>
                {stateDataDescription.notesTurn
                  ? stateDataDescription.notesTurn
                  : 'No tiene notas'}
              </Text>
          </View>

          <Pressable style={styles.button} onPress={setModalDescription}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 25,
    width: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    paddingLeft: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '35%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#A9A9A9',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    },
});

export default ModalDescription;
