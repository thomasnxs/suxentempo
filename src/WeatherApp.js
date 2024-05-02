import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '320c88236c3645e096024237240205';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Coloque o nome da cidade!"
        value={city}
        onChangeText={setCity}
      />
      <Button style={styles.button} title="Pesquisar" onPress={fetchWeatherData} />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            Temperatura: {weatherData.current.temp_c}°C
          </Text>
          <Text style={styles.weatherText}>
            Condição: {weatherData.current.condition.text}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#2F4F4F'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:25,
    backgroundColor: '#D3D3D3'
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 30,
    marginBottom: 10,
  },
  button:{
    color:'white',
    backgroundColor:''
    

  }
});

export default WeatherApp;