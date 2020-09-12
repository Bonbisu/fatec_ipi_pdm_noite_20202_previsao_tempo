import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

const Cartao = (props) => {
  return (
    <View style={{...estilos.cartao, ...props.estilos}}>
      {props.children}
    </View>
  );
}


const estilos = StyleSheet.create({
  cartao: {
    alignItems: 'center',
    shadowColor: 'red',
    backgroundColor: '#fff',
    textShadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 1,
    shadowOpacity: 0.32,
    elevation: 7,
    marginVertical: 14,
    padding: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#d1d1d1'
  }
})

export default Cartao;