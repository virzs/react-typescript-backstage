import { connect } from "react-redux";

const HeaderWithRouter = (props: any) => {
  return props.currentRoute.name;
};

const mapStateToProps = (state: any) => {
  return {
    currentRoute: state.currentRoute,
  };
};

export const ContentHeader = connect(mapStateToProps)(HeaderWithRouter);
