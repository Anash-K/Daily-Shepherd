import React, {useState, useMemo, memo, useCallback} from 'react';
import {
  View,
  ActivityIndicator,
  ImageSourcePropType,
  ColorValue,
  StyleSheet,
} from 'react-native';
import CachedImage, {
  FastImageProps,
  OnLoadEvent,
} from 'react-native-fast-image';
import CustomImages from '../assets/customImages';

interface fastImageLoadingProp {
  style?: FastImageProps['style'];
  imgStyle?: FastImageProps['style'];
  placeholderImage?: ImageSourcePropType;
  loaderSize?: number;
  placeHolderImageStyle?: FastImageProps['style'];
  placeHolderResize?: FastImageProps['resizeMode'];
  backgroundColor?: ColorValue;
  children?: React.ReactNode;
}

const FastImageLoading = (props: fastImageLoadingProp & FastImageProps) => {
  const {
    style,
    imgStyle,
    placeholderImage,
    loaderSize,
    children,
    placeHolderImageStyle,
    backgroundColor,
    ...otherProps
  } = props;

  const [Status, setStatus] = useState<'loading' | 'error' | 'success'>(
    !otherProps?.source?.uri ? 'error' : 'loading',
  );

  const renderLoading = () => {
    return (
      <View style={styles.imagePlaceHolderContainer}>
        <ActivityIndicator
          color={'#20C997'}
          size={loaderSize ? loaderSize : 'large'}
        />
      </View>
    );
  };

  const renderPlaceholder = () => {
    return (
      <View style={[styles.imagePlaceHolderContainer]}>
        <CachedImage
          resizeMode={
            otherProps?.placeHolderResize
              ? otherProps?.placeHolderResize
              : 'contain'
          }
          source={placeholderImage ? placeholderImage : CustomImages.profilePic}
          style={[
            {
              ...styles.placeHolderImage,
            },
            placeHolderImageStyle,
          ]}
        />
      </View>
    );
  };

  const onImageLoad = useCallback(
    (e: OnLoadEvent) => {
      setStatus.call(null, 'success');
      otherProps?.onLoad?.call(null, e);
    },
    [otherProps?.onLoad],
  );

  const CachedImageMemoized = useMemo(() => {
    return (
      <CachedImage
        {...otherProps}
        style={[styles.ActualImage, imgStyle]}
        onError={setStatus.bind(null, 'error')}
        onLoad={onImageLoad}>
        {children}
      </CachedImage>
    );
  }, [otherProps]);

  return (
    <View style={[styles.outerView, style, {backgroundColor}]}>
      {CachedImageMemoized}
      {Status === 'loading' ? renderLoading() : <></>}
      {Status === 'error' ? renderPlaceholder() : <></>}
    </View>
  );
};

export default memo(FastImageLoading);

const styles = StyleSheet.create({
  imagePlaceHolderContainer: {
    position: 'absolute',
    zIndex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  outerView: {overflow: 'hidden'},
  placeHolderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  ActualImage: {height: '100%', width: '100%'},
});
