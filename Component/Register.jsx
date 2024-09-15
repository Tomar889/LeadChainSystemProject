import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './Redux/LoginSlice';
import LottieView from 'lottie-react-native';
import { TextInput, Button, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); 
  const navigation = useNavigation();

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!phone.trim()) errors.phone = "Phone number is required";
    if (!message.trim()) errors.message = "Message is required";
    setErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const userData = { name, email, phone,message };
     const a = dispatch(addItem(userData))
        .unwrap()
        .then(() => {
          Alert.alert("Your data is Submitted")
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        })
        .catch((error) => {
          console.error("Failed to add item: ", error);
        });  
    }
  };

  return (
    <KeyboardAvoidingView>
    <View style={styles.container}>
     <LottieView source={require('../image/lottie/Animation - 1726054932988.json')} autoPlay loop style={{width:400,height:300}} />
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter Your Name"
        style={[styles.input, errors.name && styles.errorInput]}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Your Email"
        style={[styles.input, errors.email && styles.errorInput]}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter Your Phone"
        style={[styles.input, errors.phone && styles.errorInput]}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Enter Your Message"
        style={[styles.input, errors.message && styles.errorInput]}
      />
      {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
      
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
     
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
  },
  input: {
    margin: 10,
    borderColor: 'rgba(163, 90, 125, 1)',
    borderRadius: 2,
    borderWidth: 2,
    borderRadius:5,
    width: 300,
    fontWeight:'bold',
    paddingLeft:20
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    backgroundColor: 'rgba(89, 20, 52, 1)',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width:300,
    alignItems:'center',
    
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
  },
});

export default Register;