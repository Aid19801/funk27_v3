import * as React from "react";

type ProgressiveImageProps = {
  src: string;
  loadingSrc?: string;
  //   height?: number;
  //   width?: number;
  alt?: string;
};

export const ProgressiveImage = ({
  src,
  loadingSrc,
  alt,
}: ProgressiveImageProps) => {
  const [hasLoaded, setHasLoaded] = React.useState<boolean>(false);
  const imgRef = React.useRef();

  const handleOnLoad = () => {
    if (!hasLoaded) {
      setTimeout(() => {
        setHasLoaded(true);
      }, 500);
    }
  };

  React.useEffect(() => {
    const img: { src: string; alt: string; complete: any } = imgRef.current;
    if (img && img.complete) {
      handleOnLoad();
    }
  }, []);

  console.log("hasLoaded => ", hasLoaded);

  return (
    <div
      className="progressiveImage__container"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100%",
        height: "auto",
        // border: "2px solid red",
        contain: "content",
      }}
    >
      <img
        ref={imgRef}
        className="properPicture"
        src={src}
        onLoad={handleOnLoad}
        onError={(err) => console.log(err)}
        alt={alt}
        style={{
          opacity: hasLoaded ? 1 : 0.1,
          position: "absolute",
          top: 0,
          left: 0,
          maxWidth: "100%",
          minHeight: "100%",
          minWidth: "100%",
          objectFit: "cover",
        }}
      />

      <img
        className="veryBlurryPicture"
        src={loadingSrc}
        alt={alt}
        style={{
          opacity: hasLoaded ? 0 : 1,
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          filter: "blur(1px)",
          maxWidth: "100%",
          minHeight: "100%",
          minWidth: "100%",
          transition: "opacity ease-in 300ms",
        }}
      />
    </div>
  );
};

export default ProgressiveImage;
