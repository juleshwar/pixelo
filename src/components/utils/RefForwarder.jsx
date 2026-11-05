import { Component, forwardRef } from "react";

export default function refForwarder(WrappedComponent) {
  class RefForwarder extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return forwardRef((props, ref) => (
    <RefForwarder forwardedRef={ref} {...props} />
  ));
}
