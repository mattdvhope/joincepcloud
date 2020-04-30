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
				highness = 10;
			} else if (inner > 500 && inner <= 650) {
				highness = 14;
			} else if (inner > 650 && inner <= 800) {
				highness = 17;
			} else if (inner > 800 && inner <= 1000) {
				highness = 20;
			} else if (inner > 1000) {
				highness = 22;
			}

    	return (
	      <BackgroundImage
	        Tag="div"
	        className="post-hero"
	        fluid={this.props.homgePageHero}
	        backgroundColor={`#007ACC`}
	        style={{
	          height: rhythm(highness),
	          position: 'relative',
	          marginBottom: `${rhythm(1.5)}`,
	          fontFamily: `Athiti`,
	        }}
	      >
	      </BackgroundImage>
  		)
		} else {
      return <span />
		}
	}

}