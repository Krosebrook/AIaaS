import React from 'react';

const Header = ({
  logoText = '',
  navLinks = ''
}) => {
  return (
    <>
      <header id="main-header">
		<div className="container">
			<div className="header-left">
				<a>
					<img alt="HQ for AI Logo" className="logo" src="/assets/images/hqforai_com_Logo_642900b3.png"/>
				</a>
				<div className="vertical-line"></div>
				<div className="social-icons-header">
					<a target="_blank"><img alt="Facebook" src="/assets/images/hqforai_com_facebook_fa82bed4.png"/></a>
					<a target="_blank"><img alt="Instagram" src="/assets/images/hqforai_com_instagram_aefcd835.png"/></a>
					<a target="_blank"><img alt="LinkedIn" src="/assets/images/hqforai_com_linkedin_09e23afb.png"/></a>
					<a target="_blank"><img alt="Bluesky" src="/assets/images/hqforai_com_bluesky_99fa151d.png"/></a>
				</div>
			</div>
			<div>
				<nav className="navbar-location">
					<a className="navbar-link">HOME</a>
					<a className="navbar-link">SERVICES</a>
					<a className="navbar-link">CASE STUDIES</a>					
					<a className="navbar-link">WORKSHOPS</a>
					<a className="navbar-link">BIOS</a>
					<a className="navbar-link">TRANSPARENCY</a>
					<a className="navbar-link">CONTACT</a>
				</nav>
			
			
			<div className="hamburger-menu">
				<span></span>
				<span></span>
				<span></span>
			</div>

			<nav className="mobile-nav" id="mobile-menu">
				<a className="mobile-nav-link">HOME</a>
				<a className="mobile-nav-link">SERVICES</a>
				<a className="mobile-nav-link">CASE STUDIES</a>
				<a className="mobile-nav-link">WORKSHOPS</a>
				<a className="mobile-nav-link">BIOS</a>
				<a className="mobile-nav-link">TRANSPARENCY</a>
				<a className="mobile-nav-link">CONTACT</a>
			
			
			<div className="social-icons-mobile">
				<a target="_blank"><img alt="Facebook" src="/assets/images/hqforai_com_facebook_fa82bed4.png"/></a>
				<a target="_blank"><img alt="Instagram" src="/assets/images/hqforai_com_instagram_aefcd835.png"/></a>
				<a target="_blank"><img alt="LinkedIn" src="/assets/images/hqforai_com_linkedin_09e23afb.png"/></a>
				<a target="_blank"><img alt="Bluesky" src="/assets/images/hqforai_com_bluesky_99fa151d.png" style={{marginRight: '0px'}}/></a>
			</div>
			
			</nav>
			
			</div>
		</div>
	</header>
    </>
  );
};

export default Header;