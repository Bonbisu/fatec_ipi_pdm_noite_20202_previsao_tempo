import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  FlatList, 
  Button, 
  Keyboard } 
  from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';

export default function App() {

  const [cidade, setCidade] = useState ('');
  const [previsoes, setPrevisoes] = useState ([]);
  
  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const obterPrevisoes = () => {
    setPrevisoes([]);
    const target = endPoint + cidade + "&appid=" + apiKey;
    fetch(target)
    .then((dados) => {
      return dados.json()
    })
    .then((dados) => {
      setPrevisoes (dados["list"])
      Keyboard.dismiss()
    });
    
  };

  const endPoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&units=metric&q=";
  const apiKey = '';
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
      <FlatList
        data={previsoes}
        renderItem={
          previsao =>(
            <PrevisaoItem previsao={previsao.item} />
          )
        } 
      />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
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
  }
});
