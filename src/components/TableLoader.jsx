import React from "react";
import ContentLoader from "react-content-loader";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 11,
  },
});

const TableLoader = props => (
  <div className={props.classes.root}>
    <ContentLoader
      height={180}
      width={400}
      speed={118}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="25" y="15" rx="5" ry="5" width="350" height="15" />
      <rect x="25" y="35" rx="5" ry="5" width="350" height="15" />
      <rect x="25" y="55" rx="5" ry="5" width="350" height="15" />
      <rect x="25" y="75" rx="5" ry="5" width="350" height="15" />
      <rect x="25" y="95" rx="5" ry="5" width="350" height="15" />
    </ContentLoader>
  </div>
);

export default withStyles(styles)(TableLoader);
