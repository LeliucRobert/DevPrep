import React from "react";

const Error = ({ message }) => {
  if (!message) return null;

  return <div style={styles.container}>{message}</div>;
};
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
};
export default Error;
