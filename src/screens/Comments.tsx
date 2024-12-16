import {FlatList, View} from 'react-native';
import {DemoCommentData} from '../utils/demoComments';
import CommentBox from '../common/CommentBox';
import React from 'react';
import {ScreenParams, ScreenProps} from '../navigation/Stack';

const Comments: React.FC<ScreenProps<'Comments'>> = () => {
  return (
    <View style={{flex: 1, padding: 16}}>
      <FlatList
        data={DemoCommentData}
        renderItem={({item}) => <CommentBox {...item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Comments;
