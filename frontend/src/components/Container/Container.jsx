import PropTypes from "prop-types";
import "./Container.css";

const Container = ({
  children,
  className = "",
  padding = "20px",
  margin = "0 auto",
  maxWidth = "1200px",
  backgroundColor = "transparent",
  borderRadius = "0px",
  boxShadow = "none",
  minHeight = "auto",
  height = "auto",
  maxHeight = "none",
  overflow = "visible",
  display = "block",
  flexDirection = "row",
  justifyContent = "flex-start",
  alignItems = "flex-start",
  gap = "0",
  ...props
}) => {
  const containerStyle = {
    padding,
    margin,
    maxWidth,
    backgroundColor,
    borderRadius,
    boxShadow,
    minHeight,
    height,
    maxHeight,
    overflow,
    display,
    flexDirection: display === "flex" ? flexDirection : undefined,
    justifyContent: display === "flex" ? justifyContent : undefined,
    alignItems: display === "flex" ? alignItems : undefined,
    gap: display === "flex" ? gap : undefined,
  };

  return (
    <div className={`container ${className}`} style={containerStyle} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  maxWidth: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.string,
  boxShadow: PropTypes.string,
  minHeight: PropTypes.string,
  height: PropTypes.string,
  maxHeight: PropTypes.string,
  overflow: PropTypes.oneOf(["visible", "hidden", "scroll", "auto"]),
  display: PropTypes.oneOf(["block", "flex", "grid", "inline-block"]),
  flexDirection: PropTypes.oneOf([
    "row",
    "column",
    "row-reverse",
    "column-reverse",
  ]),
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  gap: PropTypes.string,
};

export default Container;
