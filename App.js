import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  Keyboard,
  Image
}
  from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';
import moment from 'moment';

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const endPoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&units=metric&q=";
const apiKey = '27e3987c84691fdebf104a27d34ac483';

const baseurl = 'https://dummyapi.io/data/api/post/'
export default function App() {

  const [cidade, setCidade] = useState('');
  const [previsoes, setPrevisoes] = useState([]);

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const obterPrevisoes = async () => {
    setPrevisoes([]);
    const target = endPoint + cidade + "&appid=" + apiKey;
    console.log('get forecast', baseurl)

    fetch(baseurl, { headers: { 'app-id': '5f5c2ffb8ee3bf797ff81d11' } })
      .then((dados) => {
        // console.log(dados)
        return dados.json()
      })
      .then((dados) => {
        // console.log(dados)
        setPrevisoes(dados["data"])
        Keyboard.dismiss()
      }).catch((e) => console.log('error', e));

  };
  // obterPrevisoes();


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
        // <PrevisaoItem previsao={previsao.item} />
        data={previsoes}
        renderItem={
          previsao => (
            <Dummy item={previsao.item}></Dummy>
          )
        }
      />

    </View>
  );
}

const Dummy = (props) => {
  let item = props.item;
  let owner = item.owner;
  let username = owner.email.split('@', 1);

  // calculate total duration


  // duration in hours
  let time = parseInt(moment.duration(moment().diff(item.publishDate)).asHours());
  let published;
  if (time > 24) {
    time = time / 24;
    published = parseInt(time) + ' dias'
  } else {
    published = parseInt(time) + ' horas'
  }


  return (
    <View style={styles.card}>
      <View style={styles.title}>
        <Image
          style={styles.thumb}
          source={{ uri: owner.picture }}
        />
        <View style={styles.usertitle}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.nick}>{owner.firstName} {capitalize(item.tags[0])}</Text>
        </View>
      </View>
      <View style={styles.imgbox}>
        <Image
          style={styles.imagem}
          source={{ uri: item.image }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.usertitle}>
        <Text>Curtido por<Text style={{ fontWeight: "bold" }}> {item.likes} </Text>pessoas</Text>

        <Text style={styles.text}><Text style={{ fontWeight: "bold" }}>{username} </Text>{item.text}</Text>

        <Text style={styles.date}>há {published}</Text>

    </View>
    </View>
  )
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
  },
  thumb: {
    width: 49,
    height: 49,
    borderRadius: 100,
    margin: 14
  },
  imagem: {
    flex: 1,
    aspectRatio: 1
    // width: "100%",
    // height: 150,
    // borderRadius:21
  },
  username: {
    fontWeight: 'bold',
  },
  nick: {
    fontWeight: '200'
  },
  date: {
    fontWeight: '200',
    fontSize: 11
  },
  card: {
    width: 500
  },
  title: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    // padding:7
  },
  usertitle: {
    display: 'flex',
    flexDirection: "column",
    padding: 14
  },
  text:{
    marginVertical:3
  },
  imgbox:{
flex: 1,
alignItems:"stretch",
justifyContent:"center",
height: 300
  }
});
