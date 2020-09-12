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
import PrevisaoItem from './components/PrevisaoItem';
import Cartao from './components/Cartao';
import OverviewCard from './components/OverviewCard';

const baseUrl = "https://api.openweathermap.org/data/2.5";
const endPointForecast = "/forecast?lang=pt_br&units=metric";
const endPointOneCall = "/onecall?lang=pt_br&units=metric";
const apiKey = '';

export default function App() {

  const [cidadeObj, setCidadeObj] = useState({});
  const [cidade, setCidade] = useState('');
  const [detalhes, setDetalhes] = useState({ current: {}, cidade: {} });
  const [previsoes, setPrevisoes] = useState([]);

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }
  const obterDetalhes = (coord) => {

    const target = `${baseUrl}${endPointOneCall}&lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;

    fetch(target)
      .then((dados) => {
        return dados.json()
      })
      .then((dados) => {
        // console.log('detalhes', dados);
        // dados.current.weather = dados.weather
        setDetalhes(dados);
      })


  }

  const obterPrevisoes = () => {
    setPrevisoes([]);

    // const target = endPoint + cidade + "&appid=" + apiKey;
    const target = `${baseUrl}${endPointForecast}&q=${cidade}&appid=${apiKey}`;


    fetch(target)
      .then((dados) => {
        return dados.json()
      })
      .then((dados) => {
        setPrevisoes(dados["list"])
        setCidadeObj(dados["city"])
        obterDetalhes(dados["city"]['coord'])
        Keyboard.dismiss()
      });

  };


  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome da cidade"
          value={cidade}
          onChangeText={capturarCidade}
        />
        <Button
          title="ok"
          onPress={obterPrevisoes}
        />
      </View>
      <View>
        <OverviewCard detalhes={detalhes} cidade={cidadeObj} estilos={styles} />
      </View>
      <FlatList
        data={previsoes}
        keyExtractor={(item) => item.dt_txt}
        renderItem={
          ({ item }) => (

            <PrevisaoItem previsao={item} />

          )
        }
      />

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 28,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFF'
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  nomeCidade: {
    padding: 12,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  },
  imagem: {
    width: 63,
    height: 45,
    borderWidth: 1,
    borderColor: '#d1d1d1'
  }
});
