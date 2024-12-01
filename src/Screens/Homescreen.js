import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { Baseurl, CaptureWhours } from '../Utils/Constants';
import axios from 'axios';

export default function Homescreen({ route }) {
    const { JwtToken, FirstName, LastName } = route.params;
    const [isCheckin, setIsCheckin] = useState(false);
    const [isCheckoutClicked, setIsCheckoutClicked] = useState(true);
    useEffect(() => {
        CallCheckin()
    }, [])

    const CallCheckin = async () => {
        const apiUrl = Baseurl + CaptureWhours; // Replace with your API endpoint
        const data = {
            "Type": "1",
            "latitude": "17.408490856119364",
            "longitude": "78.42947855465648",
            "CountryCode": "ind",
            "CurrencyCode": "inr",
            "LanguageCode": "eng"
        };
        try {
            const response = await axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                    Authorization: "Bearer " + JwtToken, // Add auth token if needed
                },
            });
            if (response.data != undefined && response.data != null) {
                if (response.data.ReturnCode == 0) {
                    setTimeout(() => {
                    setIsCheckin(true)
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };
    const CallCheckOut = async () => {
        const apiUrl = Baseurl + CaptureWhours; // Replace with your API endpoint
        const data = {
            "Type": "2",
            "latitude": "17.408490856119364",
            "longitude": "78.42947855465648",
            "CountryCode": "ind",
            "CurrencyCode": "inr",
            "LanguageCode": "eng"
        };
        try {
            const response = await axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                    Authorization: "Bearer " + JwtToken, // Add auth token if needed
                },
            });
            if (response.data != undefined && response.data != null) {
                if (response.data.ReturnCode == 0) {
                    setIsCheckin(true)
                }
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Bounce-in animation
      Animated.spring(scaleValue, {
        toValue: 1, // Final scale
        friction: 3, // Control the bounce effect
        tension: 40, // Control the speed and bounciness
        useNativeDriver: true,
      }).start();
    }, [scaleValue]);
    return (
        <View style={styles.container}>
            {/* {!isCheckoutClicked ?
                <> */}
                <Animated.Text
        style={[
          styles.successText,
          { transform: [{ scale: scaleValue }] }, // Apply bounce-in effect
        ]}
      >
        You are successfully logged in as <Text style={[styles.successText, { fontStyle: 'italic', fontWeight: '900' }]}>{LastName}</Text>.

      </Animated.Text>
            {isCheckin ?
                <Text style={styles.successText}>"Check in" Successful!</Text>
                : null}

            {/* <TouchableOpacity onPress={() => setIsCheckoutClicked(true)} activeOpacity={0.8} style={styles.checkoutbtn}>
                <Text style={[styles.successText, { color: '#FFF', fontSize: 14 }]}>Check Out</Text>
            </TouchableOpacity> */}
            {/* </>
                :
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[styles.successText, { fontSize: 16 }]}>You’re about to complete your workday. Make sure all tasks are marked as finished before checking out.</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10, bottom: 10, position: 'absolute' }}>
                        <TouchableOpacity onPress={() => setIsCheckoutClicked(true)} activeOpacity={0.8} style={{ backgroundColor: 'red', padding: 5, marginHorizontal: 10, borderRadius: 100 / 2 }}>
                            <Text style={[styles.successText, { color: '#FFF', fontSize: 14 }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => CallCheckOut()} activeOpacity={0.8} style={{ backgroundColor: 'red', padding: 5, marginHorizontal: 10, borderRadius: 100 / 2 }}>
                            <Text style={[styles.successText, { color: '#FFF', fontSize: 14 }]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            } */}
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
    successText: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: '#3c763d',
        textAlign: 'center'
    },
    checkoutbtn: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 100 / 2,
        bottom: 5,
        position: 'absolute'
    }
});
