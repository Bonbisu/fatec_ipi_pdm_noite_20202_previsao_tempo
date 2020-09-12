import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Keyboard, Image
}
  from 'react-native';

import Cartao from './Cartao';
import moment from 'moment-timezone';


const OverviewCard = (props) => {
  const formatTime = time => moment(new Date(time)).tz('America/Sao_Paulo').format("HH:mm");

  return (
    <Cartao >
      <View style={{ ...styles.row, padding: 14 }}>
        <View style={styles.coluna}>
          <View style={styles.row}>

            <View style={styles.col}>
              <Text style={styles.title}>
                {props.cidade.country ? String.fromCodePoint(props.cidade.country.codePointAt(0) + 127397) + String.fromCodePoint(props.cidade.country.codePointAt(1) + 127397):''} {props.cidade.name} - {props.cidade.country}</Text>
              <Text style={{ marginBottom: 14 }}>TZ: {props.detalhes.timezone}</Text>
            </View>
          </View>


          <View style={styles.row}>
            <View style={styles.sol}>
              <Image
                style={styles.imagem}
                source={{ uri: "https://cdn.icon-icons.com/icons2/1370/PNG/512/if-weather-27-2682824_90788.png" }}
              />
              <Text style={styles.hora}> {props.detalhes.current.sunrise ? formatTime(props.detalhes.current.sunrise) : '---'} </Text>

            </View>
            <View style={styles.sol}>
              <Image
                style={styles.imagem}
                source={{ uri: "https://cdn.icon-icons.com/icons2/1370/PNG/512/if-weather-26-2682825_90789.png" }}
              />
              <Text style={styles.hora}>{props.detalhes.current.sunrise ? formatTime(props.detalhes.current.sunset) : '---'}</Text>
            </View>
          </View>
          <View style={styles.row}>

            <Text>Temp: {props.detalhes.current.temp}ºC</Text>
            <Text>Sensação: {props.detalhes.current.feels_like} ºC</Text>
          </View>
          <View style={styles.row}>

            <Text>Vel. Vento: {props.detalhes.current.wind_speed} km/h</Text><Text>     Ang. Vento: {props.detalhes.current.wind_deg}º</Text>
          </View>
          <View style={styles.row}>
            <Text>Umidade: {props.detalhes.current.humidity}%   </Text><Text>  Pressão: {props.detalhes.current.pressure} hPa</Text>

          </View>
        </View>
      </View>

    </Cartao>)
}

const styles = StyleSheet.create({
  bandeira: {
    width: 63,
    height: 45,
    borderWidth: 1,
    borderColor: '#d1d1d1'
  },
  imagem: {
    width: 50,
    height: 50
  },
  sol: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "space-between", 
    padding:7
  },
  coluna: {
    maxWidth: 280,
  },
  title: {
    fontSize: 24,
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center"
  },
  col:{
    flexDirection: 'column',
    alignItems: "center"
  },
  hora: {
    fontWeight: '700'
  }
});

export default OverviewCard;