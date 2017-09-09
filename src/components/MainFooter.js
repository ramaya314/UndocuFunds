import React from 'react';

class MainFooter extends React.Component {

	getStyles() {
		const styles = {
			footer: {
				backgroundColor: 'rgb(0, 0, 0)',
			},
		}
		return styles;
	}

	render() {

    	const styles = this.getStyles();

    	const dataLins = {
    		'facebook' : '',
    		'twitter' : '',
    		'mail' : '',
    		'instagram' : '',
    		'youtube' : '',
    	}
		return(

  			<div style={styles.footer} id="footer">
  				<div className="contact">
					<ul className="icons">
						<li><a className="icon fa-facebook" href={dataLinks.facebook} ><span className="label">Facebook</span></a></li>
						<li><a className="icon fa-twitter" href={dataLinks.twitter} ><span className="label">Twitter</span></a></li>
						<li><a className="icon fa-envelope" href={dataLinks.mail} ><span className="label">Mail</span></a></li>
						<li><a className="icon fa-instagram" href={dataLinks.instagram} ><span className="label">Instagram</span></a></li>
						<li><a className="icon fa-youtube" href={dataLinks.youtube} ><span className="label">Dribbble</span></a></li>
					</ul>

					<div className="copyright">
						<ul className="menu">
							<li>&copy; UndocuFunds. All rights reserved.</li>
						</ul>
					</div>
				</div>
  			</div>
		);
	}
}


export default MainFooter;