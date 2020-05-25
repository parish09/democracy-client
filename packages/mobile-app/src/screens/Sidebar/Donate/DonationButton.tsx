import React from 'react';
import {
  StyleSheet,
  NativeModules,
  TextInput,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

const StripeBridge = NativeModules.StripeBridge;

class App extends React.Component {
  state = {
    loadingCardButton: false,
    ccname: 'Maria Bernasconi',
    year: 22,
    ccnumber: 4242424242424242,
    month: 12,
    cvc: 123,
  };

  // event listener to update the values of the different inputs
  _onCCnumberChange = (text: string) => {
    this.setState({ ccnumber: text });
  };
  _onCCnameChange = (text: string) => {
    this.setState({ name: text });
  };
  _onCCmonthChange = (text: string) => {
    this.setState({ month: text });
  };
  _onCCyearChange = (text: string) => {
    this.setState({ year: text });
  };
  _onCCcvvChange = (text: string) => {
    this.setState({ cvc: text });
  };

  pay = () => {
    const { ccnumber, year, month, cvc } = this.state;
    this.setState({ loadingCardButton: true });
    const scriptURL = NativeModules.SourceCode.scriptURL;
    const address = scriptURL.split('://')[1].split('/')[0];
    const hostname = address.split(':')[0];

    console.log({ ccnumber, year, month, cvc });

    fetch(`http://${hostname}:3000/donate`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log(res);
        return res;
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        console.log(responseJson.setupIntentId);

        StripeBridge.createPayment(
          responseJson.setupIntentId,
          ccnumber.toString(),
          month.toString(),
          year.toString(),
          cvc.toString(),
          (error, res, payment_method) => {
            if (res === 'SUCCESS') {
              this.setState({ loadingCardButton: false });
              Alert.alert('Stripe Payment', 'Your Stripe payment succeeded', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ]);
            }
          },
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={{ paddingTop: 100, backgroundColor: '#1e1f34', flex: 1 }}>
        <View style={styles.flowRight}>
          <TextInput
            editable={true}
            style={styles.searchInput}
            autoCapitalize={'words'}
            keyboardType={'default'}
            placeholder="Name on card"
            onChangeText={text => this._onCCnameChange(text)}
            autoCorrect={false}
            multiLine={false}
            placeholderTextColor="#7a7d85"
            selectionColor="white"
            autoCompleteType="off"
            textContentType="none"
            value={this.state.ccname.toString()}
          />
        </View>
        <View style={styles.flowRight}>
          <TextInput
            editable={true}
            maxLength={16}
            style={styles.searchInput}
            keyboardType={'number-pad'}
            placeholder="Card Number"
            onChangeText={text => this._onCCnumberChange(text)}
            autoCorrect={false}
            autoCapitalize={'none'}
            placeholderTextColor="#7a7d85"
            selectionColor="white"
            autoCompleteType="off"
            textContentType="none"
            value={this.state.ccnumber.toString()}
          />
        </View>
        <View style={styles.flowRight}>
          <TextInput
            maxLength={2}
            editable={true}
            style={styles.searchInput}
            keyboardType={'number-pad'}
            placeholder="MM"
            onChangeText={text => this._onCCmonthChange(text)}
            autoCorrect={false}
            multiLine={false}
            placeholderTextColor="#7a7d85"
            selectionColor="white"
            autoCompleteType="off"
            textContentType="none"
            value={this.state.month.toString()}
          />
          <TextInput
            maxLength={2}
            editable={true}
            style={styles.searchInput}
            keyboardType={'number-pad'}
            placeholder="YY"
            onChangeText={text => this._onCCyearChange(text)}
            autoCorrect={false}
            multiLine={false}
            placeholderTextColor="#7a7d85"
            selectionColor="white"
            autoCompleteType="off"
            textContentType="none"
            value={this.state.year.toString()}
          />
        </View>
        <View style={styles.flowRight}>
          <TextInput
            maxLength={3}
            editable={true}
            style={styles.searchInput}
            keyboardType={'number-pad'}
            placeholder="CVC"
            onChangeText={text => this._onCCcvvChange(text)}
            autoCorrect={false}
            multiLine={false}
            placeholderTextColor="#7a7d85"
            selectionColor="white"
            autoCompleteType="off"
            textContentType="none"
            value={this.state.cvc.toString()}
          />
        </View>

        {this.state.loadingCardButton ? (
          <View style={{ paddingTop: 50 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.blueButton}
            onPress={() => this.pay()}>
            <Text>Pay</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  blueButton: {
    marginTop: 50,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 300,
    backgroundColor: '#5ed9f5',
    borderWidth: 1,
    borderColor: '#5ed9f5',
    borderRadius: 0,
  },
  searchInput: {
    color: 'white',
    height: 45,
    paddingLeft: 10,
    flex: 1,
    fontSize: 14,
    borderColor: '#48BBEC',
    backgroundColor: '#1e1f34',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#7a7d85',
  },
});

export default App;
