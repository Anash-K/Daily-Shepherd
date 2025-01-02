import React, {memo} from 'react';

interface ThumbnailGeneratorProps {
  videoLink: string;
}

const ThumbnailGenerator: React.FC<{videoLink: any}> = (
  {videoLink}) => {
    const videoKey = videoLink.split('=')[1]; // Assuming the video link contains the key after '='
    return `https://img.youtube.com/vi/${videoKey}/maxresdefault.jpg`;
  };

export default ThumbnailGenerator;
