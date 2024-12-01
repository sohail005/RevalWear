import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Baseurl, JWTToken, Login } from '../Utils/Constants';
import axios from 'axios';

export default function SplashScreen({ navigation }) {
    const [loading, setLoading] = useState(true);
    const [isApiError, setIsApiError] = useState(false);

    useEffect(() => {
        GetSecurityToken()
    }, []);

    const GetSecurityToken = async () => {
        setLoading(true)
        const apiUrl = Baseurl + JWTToken; // Replace with your API endpoint
        const data = {
            "SessionID": "d11960ad-47f7-4e82-8ca2-6db46cea828f",
            "SiteURL": "https://revalsys.revalerp.com",
            "CountryCode": "ind",
            "CurrencyCode": "inr",
            "LanguageCode": "eng"
        };
        try {
            const response = await axios.post(apiUrl, data);
            if (response.data != undefined && response.data != null) {
                setLoading(false)
                LoginApi(response.data.SecurityToken)
                setIsApiError(false)
            }
        } catch (error) {
            setLoading(false)
            setIsApiError(true)
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };
    const LoginApi = async (token) => {
        const apiUrl = Baseurl + Login; // Replace with your API endpoint
        const data = {
            "UserName": "sohail.md@revalsys.in",
            "UserPassword": "U2FsdGVkX1/4A0u+Oxw1eOA6zTFyr4EsjgX/TXPqzGQ=",
            "latitude": "17.408490856119364",//17.408490856119364, 78.42947855465648
            "longitude": "78.42947855465648",
            "CountryCode": "ind",
            "CurrencyCode": "inr",
            "LanguageCode": "eng"
        };
        try {
            const response = await axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                    Authorization: "Bearer " + token, // Add auth token if needed
                },
            });
            console.log("response.data:", response.data.Data[0]);
            if (response.data != undefined && response.data != null) {
                navigation.replace("Homescreen", response.data.Data[0])
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <View style={styles.container}>
            {isApiError ?
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.title}>Please check your internet connection and try again.</Text>
                    <TouchableOpacity onPress={() => GetSecurityToken()} activeOpacity={0.8}
                        style={styles.checkoutbtn}>
                        <Text style={[styles.successText, { color: '#FFF', fontSize: 14, paddingHorizontal: 10, fontWeight: '700' }]}>Retry</Text>
                    </TouchableOpacity>
                </View>
                :
                <>
                    <Text style={styles.title}>You Are about to "Login" & "Check-in" Automatically</Text>
                    <Text style={styles.title}>Please wait!</Text>
                    {loading && <ActivityIndicator size="small" color="#FFF" />}
                </>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    title: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFF',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    checkoutbtn: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 100 / 2,
        bottom: 5,
        position: 'absolute'
    }
});
