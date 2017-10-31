import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {
  Button,
  FormInput,
  FormLabel,
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import axios from '../../lib/customAxios';
import HouseNavBack from '../HouseNavBack';

import ChoreList from './ChoreList';


const styles = StyleSheet.create({

});

class ChoresView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chores: [],
      text: '',
      addingChore: false,
    };

    this.getChores = this.getChores.bind(this);
    this.postChore = this.postChore.bind(this);
  }
  componentWillMount() {
    this.getChores();
  }
  getChores() {
    axios.get(`/api/tasks/${this.props.houseId}`)
    .then((tasks) => {
      const onlyChores = tasks.data.filter(chore => chore.type === 'chore');
      onlyChores.forEach((chore) => {
        this.props.roomies.forEach((roomie) => {
          if (roomie.id === chore.posterId) {
            chore.poster = roomie.firstName;
          }
        });
      });
      this.setState({ chores: onlyChores });
    })
    .catch((err) => {
      this.setState({ chores: err});
      console.log('Error retrieving tasks', err);
    });
  }
  postChore() {
    axios.post(`api/tasks/`, {
      houseId: this.props.houseId,
      posterId: this.props.userId,
      text: this.state.text,
      type: 'chore',
    })
      .then(() => {
        this.getChores();
        this.setState({ addingChore: !this.state.addingChore });
      })
      .catch(err => console.log('Error post task', err));   
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Chores</Text>
        <ChoreList chores={this.state.chores} />
        {!this.state.addingChore &&
          <Button title="Add Chore" onPress={() => this.setState({ addingChore: !this.state.addingChore })} />
        }
        {this.state.addingChore &&
          <View style={styles.inputContainer}>
            <FormLabel style={styles.roomieLabel}>Chore:</FormLabel>
            <FormInput
              containerStyle={styles.input}
              onChangeText={task => this.setState({ text: task })}
            />
            <Button title="Submit" onPress={() => this.postChore()} />
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
    roomies: store.house.roomies,
    houseId: store.user.houseId,
    userId: store.user.id,
  };
};

const ChoresViewRedux = connect(mapStateToProps, null)(ChoresView)

const Chores = StackNavigator({
  Chores: {
    screen: ChoresViewRedux,
    navigationOptions: ({ navigation }) => ({
      title: 'Chores',
      headerLeft: <HouseNavBack navigation={navigation} />,
    }),
  },
});

export default Chores;
