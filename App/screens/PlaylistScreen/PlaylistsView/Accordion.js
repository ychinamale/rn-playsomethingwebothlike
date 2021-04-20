/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { scaleFont, scaleSize } from '../../../utils/scaling';

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

  const labelText = isOpen ? `Hide ${label}` : `Show ${label}`;

  return (
    <View>
      <TouchableOpacity
        onPress={() => toggleOpen()}
        style={{
          alignSelf: 'center',
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderTopColor: 'lightgrey',
          borderBottomColor: 'lightgrey',
          marginHorizontal: scaleSize(15),
          width: scaleSize(180),
        }}
      >
        <View style={{ flexDirection: 'row', paddingVertical: scaleSize(8) }}>
          <View style={styles.dropdownHeader}>
            <Text style={styles.headingText}>{labelText}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={dropdownStyles}
      >
        { items.map((item, index) => (
          <View key={`${item.track.id}_${index}`} style={styles.trackContainer}>
            <Text numberOfLines={1}>{ `${item.track.name} by ${item.track.artists[0].name}` }</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

TracksDropdown.propTypes = {
  label: PropTypes.string.isRequired,
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
  dropdownHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  headingText: {
    color: '#1DB954',
    fontWeight: 'bold',
    letterSpacing: 1.2,
    textAlign: 'center',
    textShadowColor: '#eee',
    textShadowOffset: { width: scaleSize(2), height: scaleSize(2) },
    textShadowRadius: scaleSize(2),
  },
  iconStyle: {
    width: scaleSize(36),
    height: scaleSize(36),
    backgroundColor: 'white',
    borderRadius: scaleSize(36),
    textAlign: 'center',
    position: 'absolute',
    bottom: scaleSize(-14),
    right: scaleSize(14),
  },
  trackContainer: {
    backgroundColor: 'white',
    marginVertical: scaleSize(8),
    marginHorizontal: scaleSize(8),
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(12),
    borderRadius: scaleSize(6),
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  subtext: { color: 'white', fontSize: scaleFont(10) },
  thumbnail: { resizeMode: 'contain', width: scaleFont(60) },
});

export { TracksDropdown as default };
