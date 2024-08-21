import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
  return (
    <div style={styles.container}>
      <BeatLoader size={25} color={"var(--navbar-color)"} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh", // Full viewport height to center vertically
  },
};

export default Loading;
