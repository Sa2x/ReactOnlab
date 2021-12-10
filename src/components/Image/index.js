import React, { useState, useCallback, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

const Fn = ({ src, placeholderImg, errorImg, ...props }) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);

  const onLoad = useCallback(() => {
    setSrc(src);
  }, [src]);

  const onError = useCallback(() => {
    setSrc(errorImg || placeholderImg);
  }, [errorImg, placeholderImg]);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src, onLoad, onError]);
  if (imgSrc === placeholderImg) {
    return <Skeleton circle={true} height={350} />;
  } else return <img className="image" {...props} alt={imgSrc} src={imgSrc} />;
};

export default Fn;
