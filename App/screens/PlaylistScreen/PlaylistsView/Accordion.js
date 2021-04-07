import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TracksDropdown = ({ label, playlist }) => {
  const { url, items } = playlist;

  const [isOpen, setIsOpen] = React.useState(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const dropdownStyles = [{ flexDirection: 'row', backgroundColor: 'white', overflow: 'hidden' }];

  if (isOpen) {
    dropdownStyles.push({ height: 'auto' });
  } else {
    dropdownStyles.push({ height: 0 });
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => toggleOpen()}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          marginHorizontal: 15,
        }}
      >
        <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
          <View style={styles.dropdownHeader}>
            <Text>{`Show ${label}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={dropdownStyles}
      >
        { items.map((item) => (
          <View key={item.track.id} style={styles.trackContainer}>
            <Text numberOfLines={1}>{ `${item.track.name} by ${item.track.artists[0].name}` }</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

TracksDropdown.propTypes = {
  playlist: PropTypes.shape({
    url: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        track: PropTypes.shape({
          name: PropTypes.string,
          artists: PropTypes.arrayOf(
            PropTypes.shape({ name: PropTypes.string }),
          ),
        }),
      }),
    ),
  }).isRequired,
};

const styles = StyleSheet.create({
  cardLayout: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  cardNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardStyle: {
    backgroundColor: 'blue',
    borderRadius: 18,
    height: 160,
    width: 240,
  },
  dropdownHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  iconStyle: {
    width: 36,
    height: 36,
    backgroundColor: 'white',
    borderRadius: 36,
    textAlign: 'center',
    position: 'absolute',
    bottom: -14,
    right: 14,
  },
  trackContainer: {
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  subtext: { color: 'white', fontSize: 10 },
  thumbnail: { resizeMode: 'contain', width: 60 },
});

export { TracksDropdown as default };
