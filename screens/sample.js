const CampingScreen = ({navigation}) => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [searchCity, setSearchCity] = useState('');

  const getCampgrounds = async () => {
      try {
        const data = await getCampgrounds(searchCity);
        console.log(data);
        setCampgrounds(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

const CampingCard = ({campground}) => {
  return (

    <View>
      <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={()=>navigation.navigate('CampingDetails', campground)}
      onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
        <View key={campground.site}>
          <ImageBackground source={campground.image ? campground.image[0].URL : 'https://openclipart.org/download/325701/tent-0032588nahxbh.svg'} style={style.cardImage}>
          <Text style={{
            color: 'ivory',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
            {campground.site}
          </Text>
         
          <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='place' size={20} color='ivory' />
              <Text style={{ marginLeft: 5, color: 'ivory' }}>
                {campground.site}
              </Text>
            </View>
          </View>
        </ImageBackground>
        </View>
      </TouchableOpacity>
      {/* ))} */}
      
    </View>
  )
}
const PopCampingCard = ({popCampsite}) => {
  return (
    <ImageBackground 
      style={style.popCardImage}
      source={popCampsite.image}>
      <Text
        style={{
          color: 'ivory',
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: 10
        }}>
        {popCampsite.name}
      </Text>
      <View 
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
        <View style={{width:'100%', flexDirection:'column',marginTop:10}}>
          <View style={{flexDirection:'row'}}>
            <Icon name='place' size={22} color='ivory'/>
            <Text style={{color: 'ivory', fontWeight:'bold', marginLeft:5}}>{popCampsite.location}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon name='star' size={22} color='gold'/>
            <Text style={{color:'ivory', marginLeft:5}}>{popCampsite.rating}</Text>
          </View>
        </View>
        <View style={{flexDirection:'column'}}>
          <Text style={{color:'ivory', fontWeight: 'bold', fontSize:20, marginBottom: 5}}>${popCampsite.price}</Text>
          <Text style={{color: 'ivory'}}>{popCampsite.details}</Text>
        </View>
      </View>
    </ImageBackground>
  )
  
}
const handleExplore = (e) => {
  e.preventDefault(searchCity);
}

  return (
    <SafeAreaView style={{backgroundColor:'#e4f6f8'}}>
    <StatusBar translucent={false} backgroundColor='#e4f6f8'/>
    
    <View style={style.heading}>
      <Icon name='menu' size={28} color='#0096c7'/>
      <Pressable 
        onPress={()=>navigation.navigate('Profile')}
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}>
        <Icon name='person' size={28} color='#0096c7'/>
      </Pressable>
    </View>
    
    <View style={style.backArrow}>
      <Icon 
        name='arrow-back-ios' 
        size={28} color='#0096c7' 
        onPress={navigation.goBack}
        onPressIn={() => Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}/>
    </View>

{/* SEARCH BAR AREA! */}
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: '#e4f6f8', height:50, paddingHorizontal: 10}}>
          <View style={{flex:1}}>
            <Text style={style.headingTitle}>Discover what's out there...</Text>
            <View style={style.inputContainer}>
              <Icon name='explore' size={28} margin={3}/>
              <TextInput
                  placeholder="Where are you going?"
                  style={{color: 'black'}}
                />
            </View>
          </View>
        </View>

      <View>
      <TouchableOpacity 
        activeOpacity={0.2} 
        style={style.goBtn} 
        onPress={()=> Haptics.selectionAsync(Haptics.ImpactFeedbackStyle.Heavy)}
        // onPressIn={handleExplore}
        >
        <View>

        <Text 
          style={{
            color:'ivory', 
            fontSize: 30, 
            fontWeight:'bold',
            fontFamily: 'AmaticSC_700Bold',
            letterSpacing: 2,
          }}>Search this area

        </Text> 
        </View>
      </TouchableOpacity>
      </View>
      </ScrollView>


    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={style.campingStyle}>Camping</Text>

    <View>
      <FlatList 
        contentContainerStyle={{paddingLeft:20}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={campgrounds} 
        keyExtractor={(item) => item.site}
        renderItem={({item})=> <CampingCard campground={item}/>}
        />
      <Text style={style.campingStyle}>Most Popular</Text>
      <FlatList
      contentContainerStyle={{paddingLeft:20, paddingBottom:20}}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={popCamping}
      renderItem={({item}) => <PopCampingCard popCampsite={item}/>}
      />
    </View>
      </ScrollView>
    </SafeAreaView>
  )


  const campingUrl = `http://localhost:3001/camping?query=${query}`;
