import React from 'react';

const Footer = ({
  copyrightText = ''
}) => {
  return (
    <>
      <footer style={{backgroundColor: '#40E0D0', color: '#000', padding: '40px 0', textAlign: 'center'}}>
		<div className="container">
            <a style={{display: 'inline-block', padding: '0', margin: '0', lineHeight: '0'}}>
				<img alt="HQ for AI Logo" className="logo" src="/assets/images/hqforai_com_Logo_642900b3.png"/>
			</a>
			
			<div className="social-icons-footer">
				<a target="_blank">
					<img alt="Facebook" src="/assets/images/hqforai_com_facebook_fa82bed4.png"/>
				</a>
				<a target="_blank">
					<img alt="Instagram" src="/assets/images/hqforai_com_instagram_aefcd835.png"/>
				</a>
				<a target="_blank">
					<img alt="LinkedIn" src="/assets/images/hqforai_com_linkedin_09e23afb.png"/>
				</a>
				<a target="_blank">
					<img alt="Bluesky" src="/assets/images/hqforai_com_bluesky_99fa151d.png" style={{marginRight: '0px'}}/>
				</a>
			</div>
			
			<p>Copyright © 2025 Headquarters for AI. All Rights Reserved.</p>
			<p style={{fontSize: '0.8rem', marginTop: '20px'}}>This content was Co-Created with AI, Human Approved: <a style={{color: '#000000', fontWeight: 'bold'}}>AI Transparency Commitments</a></p>
		</div>
	</footer>
    </>
  );
};

export default Footer;