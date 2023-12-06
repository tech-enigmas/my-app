import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, StatusBar, ImageBackground, TouchableOpacity, Pressable, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
// import DatePicker from "react-native-modern-datepicker";
// import { getFormatedDate } from "react-native-modern-datepicker";
import * as Haptics from 'expo-haptics';

const CampDetailsScreen = ({navigation, route}) => {
  const campsite = route.params;
  const [isFav, setFav] = useState();
  const [modal, setModal] = useState(false);
  const [tripModal, setTripModal] = useState(false);

  // const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  // const today = new Date();
  // const startDate = getFormatedDate(
  //   today.setDate(today.getDate() + 1),
  //   "YYYY/MM/DD"
  // );
  // const [selectedStartDate, setSelectedStartDate] = useState("");
  // const [startedDate, setStartedDate] = useState("12/12/2023");

  // function handleChangeStartDate(propDate) {
  //   setStartedDate(propDate);
  // }

  // const handleOnPressStartDate = () => {
  //   setOpenStartDatePicker(!openStartDatePicker);
  // };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#e4f6f8'}}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)'/>
      <ImageBackground style={{flex:0.7}} source={campsite.image}>
        <View style={style.imageHeading}>
          <Icon 
            name='arrow-back-ios' 
            size={28} color='#0096c7' 
            onPress={navigation.goBack}
            onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}
            />
        </View>
        <View style={style.imageDetails}> 
          <Text style={{
            width: '70%',
            fontSize: 35,
            fontWeight: 'bold',
            color:'ivory',
            marginBottom: 20
          }}>
          {campsite.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon name='star' size={30} color='gold'/>
            <Text style={{color:'ivory', fontWeight:'bold', fontSize: 20}}>{campsite.rating}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={style.detailsContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert('Added to your favorites!');
          setModal(!modal);
        }}>
          <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Added to your favorites!</Text>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setModal(!modal)}
              onPressIn={() => setFav(!isFav)}>
              <Icon name='thumb-up' color='ivory'/>
            </Pressable>
          </View>
        </View>
      </Modal>
        <Pressable onPress={() => setFav(!isFav)} onPressIn={()=>setModal(true)} style={style.iconContainer}>
          <Icon name='favorite' size={28} color={isFav ? 'red' : 'ivory'}/>
        </Pressable>

        <View style={{flexDirection:'row', marginTop:15}}>
          <Icon name='place' size={28} color='#0096c7' marginLeft={-8}/>
          <Text 
            style={{
              marginLeft:1,
              fontSize:25,
              fontWeight:'bold',
              color:'#0096c7',
            }}>
            {campsite.location}
          </Text>
        </View>
        <Text style={{marginTop:20, fontWeight:'bold', fontSize:45, fontFamily: 'AmaticSC_700Bold' }}>
          Campsite Details
        </Text>
        <Text style={{marginTop: 5, marginBottom: -10, fontSize:15, fontWeight: 'bold'}}>${campsite.price}</Text>
        <Text style={{marginTop: 20, lineHeight:22}}>{campsite.details}</Text>
      </View>
      <View style={style.footer}>
      <View style={style.addToTripBtn}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={tripModal}
          onRequestClose={() => {
            Alert.alert('Added to your favorites!');
            setTripModal(!tripModal);
            }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Added to your trips!</Text>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setTripModal(!tripModal)}>
              <Icon name='thumb-up' color='ivory'/>
            </Pressable>
          </View>
        </View>
        </Modal>
        <View>
          {/* <View>
            <Text>Check Availability</Text>
            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text>
                {selectedStartDate}
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={startedDate}
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}

        </View>
          <Pressable activeOpacity={0.2} onPressIn={()=>setTripModal(true)}>
            <Text 
              style={{
                color:'#0096c7', 
                fontSize: 15, 
                fontWeight:'bold'
              }}>Add to your Trip</Text> 
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  backArrow: {
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
  },
  imageHeading: {
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:20,
  },
  imageDetails: {
    padding: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    position:'absolute',
    bottom:30,
  },
  detailsContainer:{
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginBottom: 50,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#e4f6f8',
    flex: 0.3,
  },
  iconContainer:{
    height: 40,
    width: 40,
    position: 'absolute',
    top: 15,
    backgroundColor: 'rgba(0,150,199,0.2)',
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer:{
    flexDirection: 'row',
    backgroundColor: '#0096c7',
    height: 70,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
  },
  addToTripBtn: {
    height: 50,
    width: '100%',
    backgroundColor: 'ivory',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:25,
    fontWeight:'bold',
    fontFamily: 'AmaticSC_700Bold'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#0096c7',
  },
  textStyle: {
    color: 'ivory',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
})

export default CampDetailsScreen