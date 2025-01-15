import React, {memo, useCallback, useState} from 'react';
import {
  DeviceEventEmitter,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Menu, MenuItem} from 'react-native-material-menu';
import CustomImages from '../assets/customImages';
import CustomFont from '../assets/customFonts';
import {formatDate, TimeAgo} from '../utils/currentDateIntlFormat';
import {CommentBoxType} from '../types/CommonTypes';
import {useMutation} from 'react-query';
import {MutationKeys} from '../utils/MutationKeys';
import {ReportComment} from '../axious/PostApis';
import {AppLoaderRef} from '../../App';
import {CustomToaster} from '../utils/AlertNotification';
import {ALERT_TYPE} from 'react-native-alert-notification';
import {ErrorHandler} from '../utils/ErrorHandler';
import {useSelector} from 'react-redux';
import CustomImageHandler from '../utils/CustomImageHandler';
import {DeleteComment} from '../axious/DeleteApi';

const CommentBox: React.FC<CommentBoxType> = memo(
  ({comment, created_at, id, user}) => {
    const userData = useSelector((state: any) => state.auth);

    const [isVisible, setIsVisible] = useState(false);

    const toggleMenu = useCallback(() => {
      setIsVisible(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
      setIsVisible(false);
    }, []);

    const CustomAction = ({commentText}: {commentText: string}) => {
      return (
        <View style={styles.commentAction}>
          <Image source={CustomImages.warningIcon} style={styles.warningIcon} />
          <Text style={styles.menuItemText}>{commentText}</Text>
        </View>
      );
    };

    const {mutate: reportComment} = useMutation({
      mutationKey: MutationKeys.ReportKey,
      mutationFn: async () => await ReportComment({commentId: id}),
      onMutate: () => AppLoaderRef.current?.start(),
      onSuccess(data) {
        handleReportResponse(data);
        // DeviceEventEmitter.emit('trackLike');
      },
      onError(error) {
        ErrorHandler(error);
      },
      onSettled: () => {
        AppLoaderRef.current?.stop();
        closeMenu();
      },
    });

    const {mutate: callCommentDelete} = useMutation({
      mutationKey: MutationKeys.DeleteCommentKey,
      mutationFn: async () => await DeleteComment({commentId: id}),
      onMutate: () => AppLoaderRef.current?.start(),
      onSuccess(data) {
        handleReportResponse(data);
        // DeviceEventEmitter.emit('trackLike');
      },
      onError(error) {
        ErrorHandler(error);
      },
      onSettled: () => {
        AppLoaderRef.current?.stop();
        closeMenu();
      },
    });

    let isUser = user.email == userData.email;

    const handleReportResponse = useCallback((data: any) => {
      if (data?.status == 200) {
        CustomToaster({
          type: ALERT_TYPE.SUCCESS,
          message: isUser ? 'Comment deleted' : 'Comment reported',
        });
      } else {
        CustomToaster({
          type: ALERT_TYPE.DANGER,
          message: isUser ? 'Fail to delete' : 'Fail to report',
        });
      }
    }, []);

    const handleAction = useCallback(() => {
      // Call reportComment as a function to trigger the mutation
      if (isUser) {
        callCommentDelete();
      } else {
        reportComment();
      }
    }, [reportComment, DeleteComment]);

    return (
      <View style={styles.container}>
        {/* Profile Picture */}
        <CustomImageHandler
          sourceImage={user.profile}
          placeholderImage={CustomImages.profilePic}
          imageStyle={styles.profilePic}
        />
        <View style={styles.contentBox}>
          {/* Comment Header */}
          <View style={styles.topHeading}>
            <View style={styles.userInfo}>
              <Text style={styles.nameText}>{user.name}</Text>
              <Text style={styles.time}>{TimeAgo({date: created_at})}</Text>
            </View>

            {/* More Options Menu */}
            <View style={styles.optionMenu}>
              <Menu
                visible={isVisible}
                onRequestClose={closeMenu}
                style={styles.menuStyle}>
                <MenuItem
                  onPress={handleAction}
                  style={styles.menuItem}
                  pressColor={'transparent'}>
                  <CustomAction commentText={isUser ? 'Delete' : 'Report'} />
                </MenuItem>
              </Menu>
            </View>

            <Pressable onPress={toggleMenu} style={[styles.detailButton]}>
              <Image
                source={CustomImages.moreIcon}
                style={styles.moreIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          {/* Comment Content */}
          <Text style={styles.contentText}>{comment}</Text>
        </View>
      </View>
    );
  },
);

export default CommentBox;

const styles = StyleSheet.create({
  commentAction: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  optionMenu: {position: 'absolute', top: 16, paddingTop: 10, right: 5},
  menuStyle: {
    backgroundColor: 'rgba(32, 33, 38, 1)',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 4, height: 2},

    // maxWidth: 117,
  },
  menuItem: {
    paddingVertical: 8,
    backgroundColor: 'rgba(32, 33, 38, 1)',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(250, 250, 250, 0.15)',
    height: 35,
    justifyContent: Platform.select({ios:'center'}),
    alignItems: Platform.select({ios:'center'}),
  },
  menuItemText: {
    fontFamily: CustomFont.Urbanist400,
    fontSize: 16,
    lineHeight: 19.2,
    color: 'rgba(250, 250, 250, 1)',
    textAlign: 'center',
    marginTop: Platform.select({ios:2}),
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
    padding: 10,
    position: 'absolute',
    right: 0,
  },
  moreIcon: {
    width: 15,
    height: 3,
  },
  warningIcon: {
    width: 14,
    height: 15,
    tintColor: 'rgba(250, 250, 250, 1)',
    marginTop: Platform.select({ios:3}),
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
