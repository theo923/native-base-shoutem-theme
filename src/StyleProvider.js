import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import Theme from "./Theme";

export const ThemeContext = createContext({
  theme: Theme.getDefaultTheme(),
  foregroundColor: null,
});

export const useTheme = () => useContext(ThemeContext);

/**
 *  Provides a theme to child components trough context.
 */
export default class StyleProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      theme: this.createTheme(props),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.style !== this.props.style) {
      this.setState({
        theme: this.createTheme(this.props),
      });
    }
  }

  createTheme(props) {
    return new Theme(props.style);
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;

    return (
      <ThemeContext.Provider value={{ theme }}>
        {React.Children.only(children)}
      </ThemeContext.Provider>
    );
  }
}
