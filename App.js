import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ alignItems: "center", justifyContent: 'center',flex:1 }}>
      <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})