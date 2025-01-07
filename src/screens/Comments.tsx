import {
  FlatList,
  Image,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {DemoCommentData} from '../utils/demoComments';
import CommentBox from '../common/CommentBox';
import React, {useCallback, useEffect, useState} from 'react';
import {ScreenParams, ScreenProps} from '../navigation/Stack';
import CustomImages from '../assets/customImages';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomFont from '../assets/customFonts';
import {useMutation} from 'react-query';
import {MutationKeys} from '../utils/MutationKeys';
import {GetVerseComments} from '../axious/getApis';
import {AppLoaderRef} from '../../App';
import {ErrorHandler} from '../utils/ErrorHandler';
import NoComments from '../common/NoComments';
import {AddComment} from '../axious/PostApis';

const Comments: React.FC<ScreenProps<'Comments'>> = ({route}) => {
  const {bottom} = useSafeAreaInsets();
  const {verseId} = route.params;

  const [inputComment, setInputComment] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [onFirstLoad, setOnFirstLoad] = useState<boolean>(true);
  const [comment, setComment] = useState([]);

  const {mutate: getCommentsData} = useMutation({
    mutationKey: MutationKeys.VerseCommentKey,
    mutationFn: async () => await GetVerseComments({verseId}),
    onMutate: () => {
      AppLoaderRef.current?.start();
      setIsLoading(true);
    },
    onSuccess(data) {
      console.log(data);
      setComment(data?.payload?.data);
    },
    onError(error) {
      console.log(error);
      ErrorHandler(error);
    },
    onSettled: () => {
      AppLoaderRef.current?.stop();
      setIsLoading(false);
      setOnFirstLoad(false);
    },
  });

  const {} = useMutation({
    mutationKey: MutationKeys.AddCommentKey,
    mutationFn: async () =>
      await AddComment({id: verseId, comment: inputComment}),
  });

  useEffect(() => {
    if (verseId) {
      getCommentsData();
    }
  }, [verseId]);

  useEffect(() => {
    console.log(comment, 'comment');
  }, [comment]);

  const handleChange = useCallback((val: string) => {
    setInputComment(val);
  }, []);

  if (isLoading && onFirstLoad) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}>
      <View style={styles.container}>
        {comment.length > 0 ? (
          <View style={styles.listContainer}>
            {/* <FlatList
              data={comment}
              renderItem={({item}) => <CommentBox {...item} />}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
            /> */}
          </View>
        ) : (
          <NoComments />
        )}

        <View
          style={[
            styles.inputContainer,
            {
              paddingBottom: Platform.select({
                ios: bottom + 10,
                android: bottom + 35,
              }),
            },
          ]}>
          <View style={styles.customInput}>
            <TextInput
              style={styles.textInput}
              placeholder="Write a comment..."
              placeholderTextColor="#A0A0A0"
              onChangeText={handleChange}
            />
            <TouchableOpacity style={styles.sendButton}>
              <Image source={CustomImages.rightArrow} style={styles.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  customInput: {
    borderRadius: 31,
    borderWidth: 1,
    borderColor: '#38393E',
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 16,
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#20C997',
    // paddingHorizontal: 5,
    // paddingVertical: 11,
    width: 32,
    height: 32,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18171C',
    padding: 8,
    paddingTop: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: '#26252A',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    flex: 1,
    color: 'rgba(217, 217, 217, 1)', // Ensure text is visible
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 8,
    fontFamily: CustomFont.Urbanist400,
    lineHeight: 19.2,
  },
  sendIcon: {
    width: 16,
    height: 12,
    tintColor: '#18171C',
  },
});

export default Comments;
