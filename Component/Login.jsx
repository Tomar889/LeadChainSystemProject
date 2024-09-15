import { TextInput, Button, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchItems } from './Redux/LoginSlice'; // Import fetchItems for validation

export default function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const validateForm = () => {
        const errors = {};
        if (!name.trim()) errors.name = "Name is required";
        if (!email.trim()) errors.email = "Email is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleLogin = async () => {
        if (validateForm()) {
            try {
                // Fetch the items (users) from the API
                const response = await dispatch(fetchItems()).unwrap();
                console.log('API response:', response); // Log the response
    
                if (!Array.isArray(response)) {
                    throw new Error("Unexpected response format");
                }
    
                const users = response;
    
                // Check if the user with the given name and email exists
                const user = users.find(user => user.name === name && user.email === email);
    
                if (user) {
                    navigation.navigate('Home');
                } else {
                    Alert.alert("Invalid credentials", "No matching user found.");
                }
            } catch (error) {
                console.error("Failed to login: ", error);
                Alert.alert("Login failed", error.message);
            }
        }
    };
    
    return (
        <View style={styles.container}>
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

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>navigation.navigate('Forgotmail')} style={styles.button}>
                <Text style={styles.buttonText}>Forgotmail</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        margin: 10,
        borderColor: 'rgba(163, 90, 125, 1)',
        borderRadius: 5,
        borderWidth: 2,
        width: 300,
        fontWeight: 'bold',
        paddingLeft: 20,
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
        width: 300,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 19,
    },
});
