import {View, Text} from 'react-native';
import Dashboard from '../components/Dashboard';
import {getTurnos} from '../store/actions/actionsTurnos';
import {useDispatch, useSelector} from 'react-redux';
import React,{useEffect} from "react"

const AgendaTurnos = () => {
  const dispatch = useDispatch();
  const idCompany = '67ca2004e7c4d209a060f90b';
  useEffect(() => {
    dispatch(getTurnos(idCompany));
  }, []);

  return (
    <View>
      <Dashboard />
    </View>
  );
};

export default AgendaTurnos;
