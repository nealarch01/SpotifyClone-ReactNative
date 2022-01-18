import React, { useState, Fragment, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Modal
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MockData from '../Genres/MockData.json';

import { getCategoryData_US } from '../Genres/GetCategories';

import { categoryScreen } from '../Genres/CategoryScreen';

/*
Sample images
top lists: https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg
hip hop: https://t.scdn.co/media/original/hip-274_0a661854d61e29eace5fe63f73495e68_274x274.jpg
*/

const SearchStack = createStackNavigator();

export const SearchScreen = () => {
    return (
        <NavigationContainer independent={true}>
            <SearchStack.Navigator
                name='SearchStackNavigator'
                initialRouteName='Main'
                screenOptions={{
                    headerShown: false
                }}
            >
                <SearchStack.Screen name='Main' component={MainDisplay} />
                <SearchStack.Screen name='Lookup' component={LookupScreen} />
                <SearchStack.Screen name='Category' component={categoryScreen} />
            </SearchStack.Navigator>
        </NavigationContainer>
    );
}

const MainDisplay = ({ navigation }) => {
    const renderItem = ({ item }) => (
        (item === null || item.id === null || item.icons[0].url === null)
            ? <View />
            : <CategoryItem
                categoryID={item.id}
                categoryName={item.name}
                navigation={navigation}
                img={item.icons[0].url}
            />
    );
    const [categoryData, SetCategoryData] = useState(null);
    useEffect(() => {
        async function getCategoryData() {
            SetCategoryData(await getCategoryData_US(50));
        }
        if (categoryData === null) getCategoryData();
    }, []);
    return (
        <View style={[styles.MainContainer]}>
            {
                (categoryData === null || categoryData === undefined)
                    ? <BrowseScreenHeader navigation={navigation} />
                    : <FlatList
                        data={categoryData.categories.items}
                        renderItem={renderItem}
                        keyExtractor={dataItem => (dataItem === null || dataItem.items === null) ? 'ERROR_NULL_CATEGORY' : dataItem.id}
                        numColumns={2}
                        ListHeaderComponent={<BrowseScreenHeader navigation={navigation} />}
                        contentContainerStyle={{ paddingBottom: 155 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        showsVerticalScrollIndicator={false}
                    />
            }
        </View >
    );
}

const BrowseScreenHeader = (props) => {
    return (
        <View>
            <SearchTopView />
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={[styles.SearchBarButton]} onPress={() => props.navigation.navigate('Lookup')}>
                    <Ionicons name='ios-search' size={26} color='#191414' style={{ paddingLeft: 7 }} />
                    <Text style={[styles.SearchBarText]}>Search artists, songs, podcasts</Text>
                </TouchableOpacity>
                <TopTwo />
                <Text style={[styles.CategoriesText]}>Browse</Text>
            </View>
        </View>
    );
}

const LookupScreen = ({ navigation }) => {
    const [searchText, SetSearchText] = useState('');
    const [activeSearchType, SetSearchType] = useState('Top');
    return (
        <View style={[styles.MainContainer, { paddingLeft: 0, paddingRight: 0 }]}>
            <View style={{ backgroundColor: '#FFFFFF10', paddingBottom: 10 }}>
                <View style={[styles.ModalSearchBox]}>
                    <TextInput
                        style={[styles.SearchInput]}
                        placeholder='Playlists, artists, generes, podcasts, etc'
                        onChangeText={SetSearchText}
                        placeholderTextColor={'#FFFFFF99'}
                    />
                    <TouchableOpacity style={{ justifyContent: 'center', marginTop: 60, paddingLeft: 6 }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 16, color: '#FFFFFF', paddingLeft: 3, }}>Close</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.SearchTypeView]}>
                    <ScrollView horizontal={true}
                        contentContainerStyle={{ paddingRight: 5 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        <TouchableOpacity
                            style={[styles.SearchTypeButton, (activeSearchType === 'Top') ? { backgroundColor: '#1DB954' } : { backgroundColor: '#191414' }]}
                            onPress={() => SetSearchType('Top')}
                        >
                            <Text style={[styles.SearchTypeText]}>Top</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.SearchTypeButton, (activeSearchType === 'Genres') ? { backgroundColor: '#1DB954' } : { backgroundColor: '#191414' }]}
                            onPress={() => SetSearchType('Genres')}
                        >
                            <Text style={[styles.SearchTypeText]}>Genres</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.SearchTypeButton, (activeSearchType === 'Songs') ? { backgroundColor: '#1DB954' } : { backgroundColor: '#191414' }]}
                            onPress={() => SetSearchType('Songs')}
                        >
                            <Text style={[styles.SearchTypeText]}>Songs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.SearchTypeButton, (activeSearchType === 'Albums') ? { backgroundColor: '#1DB954' } : { backgroundColor: '#191414' }]}
                            onPress={() => SetSearchType('Albums')}
                        >
                            <Text style={[styles.SearchTypeText]}>Albums</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.SearchTypeButton, (activeSearchType === 'Artists') ? { backgroundColor: '#1DB954' } : { backgroundColor: '#191414' }]}
                            onPress={() => SetSearchType('Artists')}
                        >
                            <Text style={[styles.SearchTypeText]}>Artists</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.SearchTypeButton, (activeSearchType === 'Playlists') ? { backgroundColor: '#1DB954' } : { backgroundColor: '#191414' }]}
                            onPress={() => SetSearchType('Playlists')}
                        >
                            <Text style={[styles.SearchTypeText]}>Playlists</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.SearchTypeButton, (activeSearchType === 'Podcasts') ? { backgroundColor: '#1DB954' } : { backgroundColor: '#191414' }]}
                            onPress={() => SetSearchType('Podcasts')}
                        >
                            <Text style={[styles.SearchTypeText]}>Podcasts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.SearchTypeButton, (activeSearchType === 'Users') ? { backgroundColor: '#1DB954' } : { backgroundColor: '#191414' }]}
                            onPress={() => SetSearchType('Users')}
                        >
                            <Text style={[styles.SearchTypeText]}>Users</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

// display the user's top two genres
const TopTwo = (props) => {
    return (
        <View>
            <Text style={[styles.CategoriesText]}>Your top genres</Text>
            <CategoryPair />
        </View>
    );
}

const SearchTopView = () => {
    return (
        <SafeAreaView style={[styles.TopContainer]}>
            <Text style={[styles.SearchTextHeader]}>Search</Text>
            <View style={[styles.TopIconContainers]}>
                <TouchableOpacity style={[styles.TopIconButtons, { marginRight: 0 }]}>
                    <SimpleLineIcons name='camera' size={26} color={'#FFFFFF'} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.TopIconButtons]}>
                    <SimpleLineIcons name='microphone' size={26} color={'#FFFFFF'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// one item
const CategoryItem = (props) => {
    // props.img
    return (
        <TouchableOpacity activeOpacity={0.86}>
            <View style={[styles.CategoryBox]}>
                {
                    (props.img === null || props.img === undefined)
                        ? <View /> // returning an empty view if no valid url is shown
                        : <Image
                            source={{ uri: `${props.img}` }}
                            style={[styles.CategoryImage]}
                        />
                }
                <View style={[styles.CategoryNameView]}>
                    <Text style={[styles.CategoryNameText]}>{props.categoryName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const CategoryPair = (props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CategoryItem />
            <CategoryItem />
        </View>
    );
}

// results from the search
const ResultsScreen = () => {
    return (
        <View></View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#191414',
        paddingLeft: 12,
        paddingRight: 12,
        flex: 1,
    },
    TopContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 65,
    },
    SearchTextHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    TopIconContainers: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    TopIconButtons: {
        marginRight: 20,
    },
    SearchModalContainer: {
        flex: 1,
    },
    SearchBarButton: {
        width: '100%',
        height: 38,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    SearchBarText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#19141499'
    },
    SearchInput: {
        width: '83%',
        height: 40,
        marginTop: 60,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        color: '#FFFFFF',
        paddingLeft: 8,
        borderRadius: 10,
    },
    ModalSearchBox: {
        flexDirection: 'row',
        paddingBottom: 12,
        marginLeft: 12,
        paddingRight: 12,
    },
    SearchTypeView: {
        flexDirection: 'row',
        paddingLeft: 12,
    },
    SearchTypeButton: {
        borderRadius: 15,
        height: 35,
        width: 'auto',
        paddingLeft: 12,
        paddingRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
        flexDirection: 'row',
    },
    SearchTypeText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    CategoriesText: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600',
        marginTop: 4,
        paddingTop: 10,
    },
    CategoryBox: {
        height: 110,
        width: 176,
        borderRadius: 6,
        marginTop: 6,
        marginBottom: 6,
        borderWidth: 1,
    },
    CategoryImage: {
        height: '100%',
        width: '100%',
        borderRadius: 6,
    },
    CategoryNameView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
    },
    CategoryNameText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 18,
        alignSelf: 'center',
    },
}); 