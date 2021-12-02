/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Button, View} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

const App = () => {
  async function pickImage() {
    const result = await launchCamera(
      {mediaType: 'photo', cameraType: 'back'},
      () => {},
    );
    console.log(result);
  }

  return (
    <View>
      <Button title="Take Image" onPress={pickImage} />
    </View>
  );
};

export default App;
