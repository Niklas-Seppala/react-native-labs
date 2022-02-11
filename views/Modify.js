import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements';
import UpdateForm from '../components/ModifyForm';

const Modify = ({route: {params}, navigation}) => {
  return (
    <View>
      <Card>
        <UpdateForm
          onSuccess={() => navigation.navigate('MyFiles')}
          item={params}
        />
      </Card>
    </View>
  );
};

Modify.propTypes = {
  navigation: PropTypes.object,
};

export default Modify;
