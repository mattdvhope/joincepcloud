import React from "react";
import BackgroundImage from 'gatsby-background-image'
import { rhythm, scale } from '../utils/typography'

export default class BackgroundStyled extends React.Component {
	constructor() {
    super();
    this.state = {
      window: undefined
    };
  }

  componentDidMount() {
		this.setState({window: window})
  }

  render() {
		let highness;
    if (this.state.window) {

			const inner = window.innerWidth;
			if (inner <= 500) {
				highness = 50;
			} else if (inner > 500 && inner <= 650) {
				highness = 55;
			} else if (inner > 650 && inner <= 800) {
				highness = 60;
			} else if (inner > 800 && inner <= 1000) {
				highness = 70;
			} else if (inner > 1000 && inner <= 1130) {
				highness = 75;
			} else if (inner > 1130 && inner <= 1350) {
				highness = 80;
			} else if (inner > 1350) {
				highness = 85;
			}

    	return (
        <BackgroundImage
          Tag="div"
          className="post-hero"
          fluid={this.props.homgePageHero}
          backgroundColor={`#8BC34A`}
          style={{
            height: `${highness}vh`,
            position: 'relative',
            fontFamily: `Athiti`
          }}
        />
  		)
		} else {
      return <span />
		}
	}

}