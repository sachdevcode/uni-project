import React from "react";
import * as PlaceholderCss from "./Placeholder.css?raw";
interface Placeholder {
  styles?: React.StyleHTMLAttributes<HTMLDivElement>;
  additionalClasses?: string;
}
const Placeholder = ({ styles, additionalClasses }: Placeholder) => {
  return (
    <>
      <style type="text/css">{PlaceholderCss.default}</style>
      <div
        className={`placeholder-shimmer ${additionalClasses}`}
        style={{
          ...styles,
        }}
      />
    </>
  );
};

export default Placeholder;
