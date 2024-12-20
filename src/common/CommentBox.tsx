import {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';

const CommentBox = (data: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={CustomImages.demoComment} style={styles.profilePic} />

      <View style={styles.contentBox}>
        {/* Comment Header */}
        <View style={styles.topHeading}>
          <View style={styles.userInfo}>
            <Text style={styles.nameText}>{data.name}</Text>
            <Text style={styles.time}>{data.time}</Text>
          </View>

          {/* More Options Menu */}
          <Menu
            visible={isVisible}
            anchor={
              <TouchableOpacity
                onPress={toggleMenu}
                style={styles.detailButton}>
                <Image
                  source={CustomImages.moreIcon}
                  style={styles.moreIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            }
            onRequestClose={closeMenu}
            style={styles.menuStyle}>
            <MenuItem
              onPress={() => {
                closeMenu();
                console.log('Report action triggered');
              }}
              style={styles.menuItem}>
              <Image
                source={CustomImages.warningIcon}
                style={styles.warningIcon}
              />
              <Text style={styles.menuItemText}>Report</Text>
            </MenuItem>
          </Menu>
        </View>

        {/* Comment Content */}
        <Text style={styles.contentText}>{data.content}</Text>
      </View>
    </View>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  menuStyle: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 4, height: 2},
    // maxWidth: ,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(32, 33, 38, 1)',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(250, 250, 250, 0.15)',
  },
  menuItemText: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(250, 250, 250, 1)',
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(250, 250, 250, 0.05)',
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    columnGap: 10,
  },
  nameText: {
    fontFamily: CustomFont.Urbanist600,
    fontSize: 16,
    color: 'rgba(250, 250, 250, 1)',
    lineHeight: 19.2,
  },
  time: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 14,
    color: 'rgba(250, 250, 250, 0.5)',
    lineHeight: 16.8,
  },
  contentText: {
    fontFamily: CustomFont.Urbanist500,
    fontSize: 16,
    color: 'rgba(250, 250, 250, 1)',
    lineHeight: 19.2,
    maxWidth: 265,
  },
  detailButton: {
    paddingLeft:10
  },
  moreIcon: {
    width: 15,
    height: 3,
  },
  warningIcon: {
    width: 14,
    height: 15,
    tintColor: 'rgba(250, 250, 250, 1)',
  },
  profilePic: {
    width: 28,
    height: 28,
    borderRadius: 15,
  },
  contentBox: {
    flex: 1,
  },
  topHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
});
