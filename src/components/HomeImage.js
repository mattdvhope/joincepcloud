import React from "react";
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
		const img_url = `https://cep-pictures.s3-ap-southeast-1.amazonaws.com/mikayla.jpeg`;

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
				<div
	        style={{
	        	backgroundImage: `url(${img_url})`,
						height: `${highness}vh`,
						backgroundPosition: `center`,
						backgroundRepeat: `no-repeat`,
						backgroundSize: `cover`,
					}}
				/>
  		)
		} else {
      return <span />
		}
	}

}