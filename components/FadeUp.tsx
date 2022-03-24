import * as React from "react";

export const FadeUp = ({ children }) => {
  const ref = React.useRef();

  const startFadeUp = () => {
    setTimeout(() => {
      //@ts-ignore
      ref?.current?.style?.opacity = 1;
    }, 2000);
  };
  React.useEffect(() => {
    startFadeUp();
  }, []);
  return (
    <div
      className="fadeUp__container"
      ref={ref}
      style={{ transition: "300ms", opacity: 0 }}
    >
      {children}
    </div>
  );
};
