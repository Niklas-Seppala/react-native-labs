import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {text, container} from '../styles/basestyles';

export const Counter = ({start}) => {
  const [counter, setCounter] = useState(start);
  return (
    <View style={[style.counter, container.large]}>

      <Text style={text.large}>{counter}</Text>
      <View style={style.buttons}>
        <View style={container.small}>
          <Button title='Increase' onPress={() => {
            setCounter(counter + 1);
          }}/>
        </View>
        <View style={container.small}>
          <Button title='Decrease' onPress={() => {
            setCounter(counter - 1);
          }}/>
        </View>
      </View>

    </View>
  );
};

const style = StyleSheet.create({
  counter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#edf2f6',
  },
  buttons: {
    flexDirection: 'row',
  },
});
