import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import Svg, { Image } from 'react-native-svg';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const  SvgComponent = (props) => {
  return (
    <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
    </Svg>
  );
}

const App = () => {

  const [countries, setCountries] = useState(null)

  useEffect(() => {
    if (countries === null) {
      async function fetchData() {
        await axios.get('http://restcountries.eu/rest/v2/all')
          .then(response => setCountries(response.data))
      }
      fetchData()
    }
  })

  const renderItem = ({ item }) => (
      <View style={styles.country}>
        <Svg>
          <Image href={`${item.flag}`} style={styles.image}/>
        </Svg>
          {/* <Image 
            source={{ uri: `${item.flag}` }} 
            style={styles.image}
          /> */}
          <Text>
              {item.name}
          </Text>
          <Text>
              {item.capital}
          </Text>
      </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={countries}
        renderItem={renderItem}
        keyExtractor={countries => countries.alpha3Code}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
      paddingTop: 30,
      fontSize: 50,
      textDecorationLine: "underline",
      textAlign: "center"
  },
  country: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
  },
  image: {
      flex: 1,
      width: 150,
      height: 100,
      resizeMode: 'contain'
  }
});

export default App;