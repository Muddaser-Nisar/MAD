import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const MAD_Assesment_2 = () => {
  const useTaskManager = () => {
    const [taskList, setTaskList] = useState([]);

    const getTaskName = index => {
      //returns the task Name
      //check to ensure taskList length
      if (taskList.length > 0) {
        return taskList[index];
      }
    };

    const markCompleted = index => {
      //check to ensure taskList length
      if (taskList?.length > 0) {
        //it will mark the completation status
        let updatedList = [...taskList];
        updatedList[index].isCompleted = true;
        setTaskList(updatedList);
      }
    };
    const isCompleted = index => {
      //check to ensure taskList length
      if (taskList?.length > 0) {
        return taskList[index]?.isCompleted;
      }
      //it will retun the completion status
    };
    const addTask = taskName => {
      if (taskName.length > 0) {
        let taskItem = {taskName: taskName, isCompleted: false};
        //this will basically add the item in task along with completion status
        setTaskList([...taskList, taskItem]);
        setShownTaskList(taskList);
      }
    };

    const clearTaskList = () => {
      setShownTaskList([]);
      setTaskList([]);
    };

    return {
      addTask,
      markCompleted,
      isCompleted,
      getTaskName,
      taskList,
      clearTaskList,
    };
  };

  //In the useEffect I've mentioned the eventlistenr for back handler just to map the event system
  //we could these event like in messages listening for OTP (
  //the function which will get call without user involvement and will get triggered when an event took place)
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const {
    addTask,
    markCompleted,
    isCompleted,
    getTaskName,
    clearTaskList,
    taskList,
  } = useTaskManager();
  const [taskName, setTaskName] = useState('');
  const [shownTaskList, setShownTaskList] = useState(taskList); //by default we will be passing the task list to be shown

  useEffect(() => {
    setShownTaskList(taskList);
  }, [taskList]);

  const renderTask = ({item, index}) => (
    <View style={styles.renderCon}>
      <Text>{item?.taskName}</Text>
      <TouchableOpacity
        style={styles.renderBtn}
        onPress={() => markCompleted(index)}>
        <Text style={styles.text}>
          {item?.isCompleted == true ? 'Completed' : 'Mark It Complete'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  //this event will display the completed task list by not changing the original array
  const showCompletedTask = () => {
    if (taskList.length > 0) {
      let updatedList = [...taskList];
      updatedList = updatedList.filter(item => item?.isCompleted === true);
      if (updatedList.length == 0) {
        setShownTaskList(taskList);
      } else {
        setShownTaskList(updatedList);
      }
    }
  };
  //this event will display the pending task list by not changing the original list

  const showPendingTask = () => {
    if (taskList.length > 0) {
      let updatedList = [...taskList];
      updatedList = updatedList.filter(item => item?.isCompleted === false);
      if (updatedList.length == 0) {
        setShownTaskList(taskList);
      } else {
        setShownTaskList(updatedList);
      }
    }
  };
  const showAllTask = () => {
    setShownTaskList(taskList);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>To DO List</Text>
      <TextInput
        style={styles.inputContainer}
        placeholder="Please Enter Task Name"
        onChangeText={text => setTaskName(text)}
      />
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => addTask(taskName)}>
        <Text style={styles.text}>Add Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={showAllTask}>
        <Text style={styles.text}>All Task List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={showCompletedTask}>
        <Text style={styles.text}>Show Completed </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={showPendingTask}>
        <Text style={styles.text}>Show Pending </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={clearTaskList}>
        <Text style={styles.text}>Clear List </Text>
      </TouchableOpacity>
      <FlatList
        data={shownTaskList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTask}
      />
    </View>
  );
};

export default MAD_Assesment_2;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp(5),
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 10,
    color: '#000',
  },
  inputContainer: {
    borderWidth: 1,
    paddingHorizontal: wp(2),
    width: '80%',
    alignSelf: 'center',
  },
  actionButton: {
    height: hp('4%'),
    width: '80%',
    marginHorizontal: wp('1%'),
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    alignSelf: 'center',
  },
  renderCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  renderBtn: {
    backgroundColor: 'green',
    marginLeft: 20,
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: 'white',
  },
});
