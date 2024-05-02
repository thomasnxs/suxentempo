import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Keyboard } from 'react-native';
import { MaterialIcons, Fontisto, Feather, Ionicons } from '@expo/vector-icons';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '320c88236c3645e096024237240205';


  const getWeatherIcon = (code) => {
    switch (code) {
      case 1000:
        return <MaterialIcons name="wb-sunny" size={50} color="white" />;
      case 1003:
        return <Fontisto name="day-cloudy" size={50} color="white" />;
      case 1006:
        return <Fontisto name="cloudy" size={50} color="white" />;
      case 1063:
      case 1180:
      case 1183:
        return <Feather name="cloud-rain" size={50} color="white" />;
      case 1087:
      case 1273:
        return <Ionicons name="thunderstorm" size={50} color="white" />;
      default:
        return null; // Caso padrão
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=pt`
      );
      const data = await response.json();
      setWeatherData(data);
      setCity('');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="cloud-outline" size={24} color="white" />
        <Text style={styles.appName}>SuxenTempo</Text>
        <Ionicons name="cloud-outline" size={24} color="white" />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade!"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityText}>
            {weatherData.location.name}, {weatherData.location.country}
          </Text>
          <Text style={styles.weatherText}>
            {weatherData.current.temp_c}°C
          </Text>
          <View style={styles.weatherIcon}>
            {getWeatherIcon(weatherData.current.condition.code)}
          </View>
          <Text style={styles.alertText}>
            {weatherData.current.condition.text}
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
    backgroundColor: '#ff0066'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 50,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color:'white'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'white',
    borderWidth: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:20,
    backgroundColor:'#d3d3d3'
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 100,
    marginBottom: 10,
    color:"white",
    fontWeight: 'bold',
  },
  alertText:{
    fontSize: 20,
    marginBottom: 10,
    color:"white",
  },
  cityText:{
    fontSize: 30,
    marginBottom: 10,
    color:"white",
  },
  weatherIcon: {
    marginBottom: 10,
  }
  
});

export default WeatherApp;
