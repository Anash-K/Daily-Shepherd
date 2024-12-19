import {StyleSheet, View} from 'react-native';
import CustomInput from '../common/CustomInput';
import {useCallback} from 'react';

const ChangePassword = () => {
  const handleChange = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <CustomInput
        label="Old Password"
        onChange={handleChange}
        isPassword={true}
      />
      <CustomInput
        label="New Password"
        onChange={handleChange}
        isPassword={true}
      />
      <CustomInput
        label="Confirm New Password"
        onChange={handleChange}
        isPassword={true}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
