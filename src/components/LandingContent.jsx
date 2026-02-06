import React from 'react';

const LandingContent = ({
  heroTitle = '',
  ctaLabel = ''
}) => {
  return (
    <>
      <main>
	    
		<section id="hero">
			
			<canvas height="150" id="playCanvas" width="300"></canvas>
			
			<div className="hero-overlay-wrap">
				<div className="hero-overlay">
					
					<h1 id="hero-heading" style={{opacity: '1'}}>MEET HQ.</h1>
					
					<p className="typed-subheading" id="typed-text">Practical. </p>
					
					<a className="btn" style={{marginBottom: '30px'}}>GET IN TOUCH</a>
				</div>
			</div>
			
			<div className="scroll-arrow" id="scrollArrow" style={{background: '#40E0D0'}}>▼</div>
		</section>
	
		<section id="about" style={{padding: '80px 20px 40px 20px', backgroundColor: '#000000', color: '#ffffff', textAlign: 'center', position: 'relative'}}>
			<div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
				<div className="steps-container" style={{display: 'flex', justifyContent: 'space-evenly', gap: '10px', alignItems: 'center', maxWidth: '600px', margin: '0 auto', paddingBottom: '0px'}}>
					<div className="step fade-up animate" style={{display: 'flex', alignItems: 'center', gap: '10px', flex: '1', justifyContent: 'center', maxWidth: '200px'}}>
						<div style={{backgroundColor: '#40E0D0', color: '#000000', fontWeight: 'bold', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem'}}>
							1
						</div>
						<p style={{fontSize: '2.5rem', fontWeight: '700', color: '#ffffff'}}>Dream.</p>
					</div>
					<div className="step fade-up animate" style={{display: 'flex', alignItems: 'center', gap: '10px', flex: '1', justifyContent: 'center', maxWidth: '200px'}}>
						<div style={{backgroundColor: '#40E0D0', color: '#000000', fontWeight: 'bold', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem'}}>
							2
						</div>
						<p style={{fontSize: '2.5rem', fontWeight: '700', color: '#ffffff'}}>Plan.</p>
					</div>
					<div className="step fade-up animate" style={{display: 'flex', alignItems: 'center', gap: '10px', flex: '1', justifyContent: 'center', maxWidth: '200px'}}>
						<div style={{backgroundColor: '#40E0D0', color: '#000000', fontWeight: 'bold', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem'}}>
							3
						</div>
						<p style={{fontSize: '2.5rem', fontWeight: '700', color: '#ffffff'}}>Build.</p>
					</div>
				</div>
				<p style={{fontSize: '2.5rem', fontWeight: '400', color: '#ffffff', maxWidth: '900px', margin: '20px auto', fontStyle: 'italic'}}>
					<em>AI is complex.</em> At <strong style={{color: '#40E0D0', fontStyle: 'italic'}}>Headquarters for AI</strong>, we make it simple.
				</p>
				<p style={{fontSize: '1.5rem', lineHeight: '1.6', color: '#ffffff', maxWidth: '900px', margin: '20px auto'}}>
					We show up with bold ideas, relentless execution, and a passion for making AI <strong>work for you</strong>. Whether you're just starting or scaling fast, we bring the energy, expertise, and creativity to turn vision into reality.
				</p>
			</div>
		</section>

        <section id="services" style={{padding: '80px 0', backgroundColor: '#f8f8f8'}}>
            <div className="container">
                <h2 className="section-title">WHO WE ARE</h2>
				<div style={{textAlign: 'center', marginBottom: '40px'}}>
					<p style={{fontSize: '1.5rem', lineHeight: '1.6'}}>We’re your all-in-one consulting partner for bold, practical AI solutions—empowering you to <strong>dream</strong> big, <strong>plan</strong> smart, and <strong>build</strong> the future without breaking the bank.</p>
				</div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '30px', flexWrap: 'wrap'}}>
					<div className="card" style={{height: '256px'}}>
						<div className="flip-container">
							<div className="flipper">
								<div className="flip-front">
									<div className="steps-container fade-down animate" style={{display: 'flex', gap: '10px', margin: '0 auto', paddingBottom: '20px'}}>
										<div className="step" style={{display: 'flex', alignItems: 'center', gap: '10px', flex: '1', justifyContent: 'center', maxWidth: '200px'}}>
											<div style={{backgroundColor: '#40E0D0', color: '#000000', fontWeight: 'bold', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem'}}>
												1
											</div>
											<p style={{fontSize: '2.5rem', fontWeight: '700', color: '#000000', marginTop: '0px'}}>Dream.</p>
										</div>
									</div>
									<p className="fade-up animate" style={{fontSize: '1.2rem'}}>We spark your imagination and help you <span style={{color: '#40E0D0', fontWeight: 'bold'}}>DREAM</span>. We break down AI into clear, hands-on lessons—so your team can explore ideas, experiment fearlessly, and uncover the potential of AI in everyday work.</p>
									<a className="btn flip-button" style={{padding: '12px 24px'}}>LEARN MORE</a>
								</div>
								<div className="flip-back">
									<h3 style={{fontSize: '1.8rem', color: '#000000'}}><span style={{color: '#40E0D0', fontWeight: 'bold'}}>DREAM</span> Details</h3>
									<p style={{fontSize: '1.2rem'}}>We tear down the barriers to AI—our approach is hands-on and intuitive. We equip your team with the core AI concepts and practical exercises they need to experiment and innovate.</p>
									<ul style={{listStyleType: 'none', padding: '0', marginTop: '20px', fontSize: '1.2rem'}}>
										<li style={{marginBottom: '10px'}}><span style={{color: '#40E0D0', fontWeight: 'bold'}}>Essential Knowledge: </span>Demystify AI so everyone understands its potential and practical applications.</li>
										<li style={{marginBottom: '10px'}}><span style={{color: '#40E0D0', fontWeight: 'bold'}}>Interactive Learning: </span>Workshops, coaching, and live demos that transform curiosity into capability.</li>
										<li><span style={{color: '#40E0D0', fontWeight: 'bold'}}>Confidence Building: </span>Create an environment where experimentation leads to real action.</li>
									</ul>
									<a className="btn flip-button-back">BACK</a>
								</div>
							</div>
						</div>
					</div>
					
					<div className="card" style={{height: '256px'}}>
						<div className="flip-container">
							<div className="flipper">
								<div className="flip-front">
									<div className="steps-container fade-down animate" style={{display: 'flex', gap: '10px', margin: '0 auto', paddingBottom: '20px'}}>
										<div className="step" style={{display: 'flex', alignItems: 'center', gap: '10px', flex: '1', justifyContent: 'center', maxWidth: '200px'}}>
											<div style={{backgroundColor: '#40E0D0', color: '#000000', fontWeight: 'bold', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem'}}>
												2
											</div>
											<p style={{fontSize: '2.5rem', fontWeight: '700', color: '#000000', marginTop: '0px'}}>Plan.</p>
										</div>
									</div>
									<p className="fade-up animate" style={{fontSize: '1.2rem'}}>With <span style={{color: '#40E0D0', fontWeight: 'bold'}}>PLAN</span>, we work side-by-side to evaluate the right AI tools and design a secure, scalable adoption strategy. Using rapid prototypes, we cut through the noise and validate ideas meet business goals.</p>
									<a className="btn flip-button" style={{padding: '12px 24px'}}>LEARN MORE</a>
								</div>
								<div className="flip-back">
									<h3 style={{fontSize: '1.8rem', color: '#000000'}}><span style={{color: '#40E0D0', fontWeight: 'bold'}}>PLAN</span> Details</h3>
									<p style={{fontSize: '1.2rem'}}>Skip the consulting jargon. We help you cut through the hype to find the right AI tools, create a nimble action plan, and find real use cases that drive measurable impact.</p>
									<ul style={{listStyleType: 'none', padding: '0', marginTop: '20px', fontSize: '1.2rem'}}>
										<li style={{marginBottom: '10px'}}><span style={{color: '#40E0D0', fontWeight: 'bold'}}>Smart Tool Evaluation: </span>Quickly identify and test AI tools that align with your goals.</li>
										<li style={{marginBottom: '10px'}}><span style={{color: '#40E0D0', fontWeight: 'bold'}}>Prototyping: </span>Validate AI solutions for fit and scale before making further investments.</li>
										<li><span style={{color: '#40E0D0', fontWeight: 'bold'}}>Real-World Use Cases: </span>Uncover genuine opportunities to deploy AI where it fits best.</li>
									</ul>
									<a className="btn flip-button-back">BACK</a>
								</div>
							</div>
						</div>
					</div>
					
					<div className="card" style={{height: '256px'}}>
						<div className="flip-container">
							<div className="flipper">
								<div className="flip-front">
									<div className="steps-container fade-down animate" style={{display: 'flex', gap: '10px', margin: '0 auto', paddingBottom: '20px'}}>
										<div className="step" style={{display: 'flex', alignItems: 'center', gap: '10px', flex: '1', justifyContent: 'center', maxWidth: '200px'}}>
											<div style={{backgroundColor: '#40E0D0', color: '#000000', fontWeight: 'bold', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem'}}>
												3
											</div>
											<p style={{fontSize: '2.5rem', fontWeight: '700', color: '#000000', marginTop: '0px'}}>Build.</p>
										</div>
									</div>
									<p className="fade-up animate" style={{fontSize: '1.2rem'}}>Now, put your plans into action with <span style={{color: '#40E0D0', fontWeight: 'bold'}}>BUILD</span>. Our AI-enabled engineers create smart, automated workflows, dynamic AI agents, and custom data solutions that deliver real outcomes—no fluff, just results.</p>
									<a className="btn flip-button" style={{padding: '12px 24px'}}>LEARN MORE</a>
								</div>
								<div className="flip-back">
									<h3 style={{fontSize: '1.8rem', color: '#000000'}}><span style={{color: '#40E0D0', fontWeight: 'bold'}}>BUILD</span> Details</h3>
									<p style={{fontSize: '1.2rem'}}>When it’s time to turn vision into reality, this is your launchpad. Our AI-enabled engineers develop cutting-edge automations, dynamic AI agents, and custom data solutions.</p>
									<ul style={{listStyleType: 'none', padding: '0', marginTop: '20px', fontSize: '1.2rem'}}>
										<li style={{marginBottom: '10px'}}><span style={{color: '#40E0D0', fontWeight: 'bold'}}>Rapid Development: </span>Leverage AI to accelerate your projects without sacrificing quality.</li>
										<li style={{marginBottom: '10px'}}><span style={{color: '#40E0D0', fontWeight: 'bold'}}>Tailored Solutions: </span>From data pipelines to custom AI applications, we build it all.</li>
										<li><span style={{color: '#40E0D0', fontWeight: 'bold'}}>Grow Together: </span>Get more than a project—gain a learning experience that upskills your team.</li>
									</ul>
									<a className="btn flip-button-back">BACK</a>
								</div>
							</div>
						</div>
					</div>					
                </div>
            </div>
        </section>
		
		<section id="reality-check" style={{backgroundColor: '#40E0D0', color: '#000000', padding: '80px 0', textAlign: 'center'}}>
			<div className="container" style={{maxWidth: '1200px', margin: 'auto'}}>
				<h2 className="section-titlewhite">REALITY CHECK</h2>
				<p className="reality-check-text">
					The <span className="chip"><span className="fill-in" id="seq1" style={{opacity: '1'}}>profitable</span></span> opportunities in AI belong to those who <span className="no-break"><span className="chip" style={{marginRight: '5px'}}><span className="fill-in" id="seq2" style={{opacity: '1'}}>act now</span></span><span className="punctuation">.</span></span> Are you <span className="no-break"><span className="chip" style={{marginRight: '5px'}}><span className="fill-in" id="seq3" style={{opacity: '1'}}>ready</span></span><span className="punctuation">,</span></span> or will you be <span className="no-break"><span className="chip" style={{marginRight: '2.5px'}}><span className="fill-in" id="seq4" style={{opacity: '1'}}>left out</span></span><span className="punctuation">?</span></span>
				</p>
				<a className="btn" style={{marginTop: '30px', backgroundColor: '#000000'}}>START TODAY</a>
			</div>
		</section>

		<section id="key-trends" style={{position: 'relative', padding: '80px 0'}}>
		  
		  <canvas height="418" id="keyTrendsCanvas" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '0', pointerEvents: 'none'}} width="1888"></canvas>
		  
		  
		  <div className="container" style={{position: 'relative', zIndex: '1'}}>
			<div className="content-wrapper">
			  <h2 className="section-title">KEY TRENDS</h2>
			  <div style={{display: 'flex', justifyContent: 'space-between', gap: '30px', flexWrap: 'wrap'}}>
				<div className="card" style={{flex: '1', background: 'rgba(0,0,0,0.7)'}}>
				  <h3 className="fade-down animate" style={{fontSize: '1.8rem', color: '#ffffff', marginBottom: '0px'}}>SPENDING</h3>
				  <h4 className="fade-down animate" style={{fontSize: '2.5rem', color: '#40E0D0', margin: '0px 0px 10px 0px'}}>92%</h4>
				  <p className="fade-up animate" style={{color: '#ffffff', fontSize: '1.2rem'}}>of companies plan to invest more in GenAI over the next 3 years.</p>
				</div>
				<div className="card" style={{flex: '1', background: 'rgba(0,0,0,0.7)'}}>
				  <h3 className="fade-down animate" style={{fontSize: '1.8rem', color: '#ffffff', marginBottom: '0px'}}>USAGE</h3>
				  <h4 className="fade-down animate" style={{fontSize: '2.5rem', color: '#40E0D0', margin: '0px 0px 10px 0px'}}>3x</h4>
				  <p className="fade-up animate" style={{color: '#ffffff', fontSize: '1.2rem'}}>more employees are using GenAI, and for more tasks, than their leaders realize.</p>
				</div>
				<div className="card" style={{flex: '1', background: 'rgba(0,0,0,0.7)'}}>
				  <h3 className="fade-down animate" style={{fontSize: '1.8rem', color: '#ffffff', marginBottom: '0px'}}>ADOPTION</h3>
				  <h4 className="fade-down animate" style={{fontSize: '2.5rem', color: '#40E0D0', margin: '0px 0px 10px 0px'}}>48%</h4>
				  <p className="fade-up animate" style={{color: '#ffffff', fontSize: '1.2rem'}}>of employees rank training as the most important factor for GenAI adoption.</p>
				</div>
				<div className="card" style={{flex: '1', background: 'rgba(0,0,0,0.7)'}}>
				  <h3 className="fade-down animate" style={{fontSize: '1.8rem', color: '#ffffff', marginBottom: '0px'}}>SPEED</h3>
				  <h4 className="fade-down animate" style={{fontSize: '2.5rem', color: '#40E0D0', margin: '0px 0px 10px 0px'}}>47%</h4>
				  <p className="fade-up animate" style={{color: '#ffffff', fontSize: '1.2rem'}}>of the C-suite say their companies are developing GenAI tools too slowly.</p>
				</div>
			  </div>
			</div>
		  </div>
		</section>

		<section id="partners" style={{padding: '80px 0', backgroundColor: '#000000'}}>
			<div className="container">
				<h2 className="section-titlewhite" style={{color: '#40E0D0'}}>OUR PARTNERS</h2>
					<div className="logo-carousel">
						<div className="logo-slide-track">
						
							<div className="logo-slide"><img alt="Partner 1" src="/assets/images/hqforai_com_Compass_0551f621.png"/></div>
							<div className="logo-slide"><img alt="Partner 2" src="/assets/images/hqforai_com_Team_Bespoke_32a4e0a8.png"/></div>
							<div className="logo-slide"><img alt="Partner 3" src="/assets/images/hqforai_com_Thresholds_91c55e17.png"/></div>
							<div className="logo-slide"><img alt="Partner 4" src="/assets/images/hqforai_com_SurePath_AI_f58b9a62.png"/></div>
							<div className="logo-slide"><img alt="Partner 5" src="/assets/images/hqforai_com_WestLoop_75167be1.png"/></div>
							<div className="logo-slide"><img alt="Partner 6" src="/assets/images/hqforai_com_Rockhop_536bbcfc.png"/></div>
							<div className="logo-slide"><img alt="Partner 7" src="/assets/images/hqforai_com_ACPM_3e635944.png"/></div>
							<div className="logo-slide"><img alt="Partner 8" src="/assets/images/hqforai_com_Bruce_Bolt_9266bb74.png"/></div>
							<div className="logo-slide"><img alt="Partner 9" src="/assets/images/hqforai_com_Trackforce_8cf840da.png"/></div>
							<div className="logo-slide"><img alt="Partner 10" src="/assets/images/hqforai_com_Smithbucklin_643cfe78.png"/></div>
							<div className="logo-slide"><img alt="Partner 11" src="/assets/images/hqforai_com_Qurrent_d93adb7c.png"/></div>
							<div className="logo-slide"><img alt="Partner 12" src="/assets/images/hqforai_com_47th_44f8b44e.png"/></div>
							<div className="logo-slide"><img alt="Partner 13" src="/assets/images/hqforai_com_FiveM_8e5a35ce.png"/></div>
							<div className="logo-slide"><img alt="Partner 14" src="/assets/images/hqforai_com_BIG_b1e738a9.png"/></div>
							<div className="logo-slide"><img alt="Partner 15" src="/assets/images/hqforai_com_Nixon_6d11f812.png"/></div>
							<div className="logo-slide"><img alt="Partner 16" src="/assets/images/hqforai_com_JusticeJourney_b57dc27d.png"/></div>
							<div className="logo-slide"><img alt="Partner 17" src="/assets/images/hqforai_com_AIT_a9a95fe3.png"/></div>
						
							<div className="logo-slide"><img alt="Partner 1" src="/assets/images/hqforai_com_Compass_0551f621.png"/></div>
							<div className="logo-slide"><img alt="Partner 2" src="/assets/images/hqforai_com_Team_Bespoke_32a4e0a8.png"/></div>
							<div className="logo-slide"><img alt="Partner 3" src="/assets/images/hqforai_com_Thresholds_91c55e17.png"/></div>
							<div className="logo-slide"><img alt="Partner 4" src="/assets/images/hqforai_com_SurePath_AI_f58b9a62.png"/></div>
							<div className="logo-slide"><img alt="Partner 5" src="/assets/images/hqforai_com_WestLoop_75167be1.png"/></div>
							<div className="logo-slide"><img alt="Partner 6" src="/assets/images/hqforai_com_Rockhop_536bbcfc.png"/></div>
							<div className="logo-slide"><img alt="Partner 7" src="/assets/images/hqforai_com_ACPM_3e635944.png"/></div>
							<div className="logo-slide"><img alt="Partner 8" src="/assets/images/hqforai_com_Bruce_Bolt_9266bb74.png"/></div>
							<div className="logo-slide"><img alt="Partner 9" src="/assets/images/hqforai_com_Trackforce_8cf840da.png"/></div>
							<div className="logo-slide"><img alt="Partner 10" src="/assets/images/hqforai_com_Smithbucklin_643cfe78.png"/></div>
							<div className="logo-slide"><img alt="Partner 11" src="/assets/images/hqforai_com_Qurrent_d93adb7c.png"/></div>
							<div className="logo-slide"><img alt="Partner 12" src="/assets/images/hqforai_com_47th_44f8b44e.png"/></div>
							<div className="logo-slide"><img alt="Partner 13" src="/assets/images/hqforai_com_FiveM_8e5a35ce.png"/></div>
							<div className="logo-slide"><img alt="Partner 14" src="/assets/images/hqforai_com_BIG_b1e738a9.png"/></div>
							<div className="logo-slide"><img alt="Partner 15" src="/assets/images/hqforai_com_Nixon_6d11f812.png"/></div>
							<div className="logo-slide"><img alt="Partner 16" src="/assets/images/hqforai_com_JusticeJourney_b57dc27d.png"/></div>
							<div className="logo-slide"><img alt="Partner 17" src="/assets/images/hqforai_com_AIT_a9a95fe3.png"/></div>
						</div>
					</div>
			</div>
		</section>
		
		
		<section id="whyHQ" style={{position: 'relative', padding: '80px 0', backgroundColor: '#40E0D0', textAlign: 'center'}}>
		  
		  <div id="bubbleContainer" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '1'}}><div className="bubble" style={{width: '35px', height: '35px', opacity: '1', transition: 'opacity 1s ease-out', left: '1370.08px', top: '406px', '--tx': '-5px', '--ty': '-127px', animationDuration: '8.13532s', animationDelay: '0s', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none'}}></div><div className="bubble" style={{width: '28px', height: '28px', opacity: '1', transition: 'opacity 1s ease-out', left: '856.094px', top: '413px', '--tx': '-13px', '--ty': '-129px', animationDuration: '9.86845s', animationDelay: '0s', backgroundColor: 'transparent', border: '2px dotted rgba(0, 0, 0, 0.8)'}}></div><div className="bubble" style={{width: '58px', height: '58px', opacity: '1', transition: 'opacity 1s ease-out', left: '1296.12px', top: '383px', '--tx': '-3px', '--ty': '-97px', animationDuration: '9.90225s', animationDelay: '0s', backgroundColor: 'rgba(128, 128, 128, 0.6)', border: 'none'}}></div><div className="bubble" style={{width: '33px', height: '33px', opacity: '1', transition: 'opacity 1s ease-out', left: '480.486px', top: '408px', '--tx': '-7px', '--ty': '-76px', animationDuration: '9.80569s', animationDelay: '0s', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none'}}></div><div className="bubble" style={{width: '32px', height: '32px', opacity: '1', transition: 'opacity 1s ease-out', left: '184.671px', top: '409px', '--tx': '-12px', '--ty': '-97px', animationDuration: '9.29443s', animationDelay: '0s', backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none'}}></div><div className="bubble" style={{width: '36px', height: '36px', opacity: '1', transition: 'opacity 1s ease-out', left: '780.59px', top: '405px', '--tx': '8px', '--ty': '-100px', animationDuration: '7.18319s', animationDelay: '0s', backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none'}}></div><div className="bubble" style={{width: '35px', height: '35px', opacity: '1', transition: 'opacity 1s ease-out', left: '757.425px', top: '406px', '--tx': '-13px', '--ty': '-76px', animationDuration: '7.10891s', animationDelay: '0s', backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none'}}></div><div className="bubble" style={{width: '37px', height: '37px', opacity: '1', transition: 'opacity 1s ease-out', left: '1579.88px', top: '404px', '--tx': '-11px', '--ty': '-52px', animationDuration: '9.21916s', animationDelay: '0s', backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none'}}></div><div className="bubble" style={{width: '36px', height: '36px', opacity: '1', transition: 'opacity 1s ease-out', left: '1114.58px', top: '405px', '--tx': '3px', '--ty': '-119px', animationDuration: '7.75935s', animationDelay: '0s', backgroundColor: 'rgba(128, 128, 128, 0.6)', border: 'none'}}></div><div className="bubble" style={{width: '33px', height: '33px', opacity: '1', transition: 'opacity 1s ease-out', left: '939.396px', top: '408px', '--tx': '-7px', '--ty': '-93px', animationDuration: '6.61586s', animationDelay: '0s', backgroundColor: 'transparent', border: '2px dotted rgba(0, 0, 0, 0.8)'}}></div><div className="bubble" style={{width: '48px', height: '48px', opacity: '1', transition: 'opacity 1s ease-out', left: '52.7486px', top: '393px', '--tx': '17px', '--ty': '-81px', animationDuration: '9.38094s', animationDelay: '0s', backgroundColor: 'transparent', border: '2px dotted rgba(0, 0, 0, 0.8)'}}></div><div className="bubble" style={{width: '38px', height: '38px', opacity: '1', transition: 'opacity 1s ease-out', left: '560.948px', top: '403px', '--tx': '15px', '--ty': '-62px', animationDuration: '7.47468s', animationDelay: '0s', backgroundColor: 'transparent', border: '2px dotted rgba(255, 255, 255, 0.8)'}}></div></div>
		  
		  
		  <div className="container" style={{position: 'relative', zIndex: '2'}}>
			
			<h2 className="section-titlewhite" style={{color: '#000'}}>OUR SERVICES</h2>
				<div style={{textAlign: 'center', marginBottom: '40px'}}>
					<p style={{fontSize: '1.5rem', lineHeight: '1.6', marginTop: '0px'}}>Experience <strong>Fortune 500</strong> expertise without the traditional price tag—our subscription model and lean, AI-powered teams are rewriting the rules of consulting.</p>
				</div>
			
			<div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', maxWidth: '900px', margin: '20px auto 40px'}}>
			  <div style={{background: '#fff', padding: '20px', margin: '10px', borderRadius: '10px', flex: '1', minWidth: '200px', maxWidth: '300px', textAlign: 'center', fontWeight: 'bold', color: '#000'}}>
				OVERYPAYING FOR ADVICE?
			  </div>
			  <div style={{background: '#fff', padding: '20px', margin: '10px', borderRadius: '10px', flex: '1', minWidth: '200px', maxWidth: '300px', textAlign: 'center', fontWeight: 'bold', color: '#000'}}>
				TIRED OF SLIDES?
			  </div>
			  <div style={{background: '#fff', padding: '20px', margin: '10px', borderRadius: '10px', flex: '1', minWidth: '200px', maxWidth: '300px', textAlign: 'center', fontWeight: 'bold', color: '#000'}}>
				READY FOR PROGRESS?
			  </div>
			</div>
			
			
			<div style={{textAlign: 'center'}}>
			  <a className="btn" style={{backgroundColor: '#000', color: '#fff', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', transition: 'all 0.3s'}}>
				SEE SERVICES
			  </a>
			</div>
		  </div>
		</section>
		
		
		<section className="cs-theme--minimal" id="case-studies" style={{position: 'relative', padding: '80px 0', backgroundColor: '#f8f8f8'}}>
		  
		  <canvas height="16737" id="caseStudiesCanvas" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '0', pointerEvents: 'none'}} width="1904"></canvas>
		  
		  
		  <div className="container" style={{position: 'relative', zIndex: '1'}}>
			<div className="content-wrapper">
			  <h2 className="section-title">CASE STUDIES</h2>
			  <div style={{textAlign: 'center', marginBottom: '40px'}}>
				<p style={{fontSize: '1.5rem', lineHeight: '1.6'}}>Real results from real clients—see how we transform AI from concept to <strong>competitive advantage</strong>.</p>
			  </div>
			  
			  <div className="case-studies-grid">
			  
				
				<div className="case-study-card">
				  <div className="case-study-icon modern-icon">
					
					<svg aria-label="Book" className="cs-svg" role="img" viewBox="0 0 24 24">
					  <rect height="16" rx="2" width="12" x="4" y="3"></rect>
					  <path d="M16 5h4v16H8a4 4 0 0 1-4-4"></path>
					  <path d="M8 7h6"></path>
					</svg>
				  </div>
				  <h3 className="case-study-title fade-down animate">Knowledge at Your Fingertips</h3>
					<div className="case-study-tags fade-up animate">
					  <span className="case-study-tag">Consumer Goods</span>
					  <span className="case-study-tag">Product Enablement</span>
					</div>
				  <p className="case-study-summary fade-up animate">We turned scattered expertise into instant answers. One brand went from hours of searching to seconds—and avoided additional costs in the process.</p>
				  <a className="btn">LEARN MORE</a>
				</div>
				
				
				<div className="case-study-card">
				  <div className="case-study-icon modern-icon">
					
					<svg aria-label="Search" className="cs-svg" role="img" viewBox="0 0 24 24">
					  <circle cx="11" cy="11" r="6"></circle>
					  <line x1="16" x2="21" y1="16" y2="21"></line>
					</svg>
				  </div>
				  <h3 className="case-study-title fade-down animate">Prospecting Without Limits</h3>
					<div className="case-study-tags fade-up animate">
					  <span className="case-study-tag">Professional Services</span>
					  <span className="case-study-tag">Business Development</span>
					</div>
				  <p className="case-study-summary fade-up animate">Goodbye, manual research. Our AI agent scans 30,000 websites quarterly—saving $300K annually and delivering fresher leads than ever before.</p>
				  <a className="btn">LEARN MORE</a>
				</div>
				
				
				<div className="case-study-card">
				  <div className="case-study-icon modern-icon">
					
					<svg aria-label="Line chart" className="cs-svg" role="img" viewBox="0 0 24 24">
					  <polyline points="3,17 9,11 13,14 21,6"></polyline>
					  <line x1="3" x2="21" y1="21" y2="21"></line>
					</svg>
				  </div>
				  <h3 className="case-study-title fade-down animate">Instant Marketing Briefs</h3>
					<div className="case-study-tags fade-up animate">
					  <span className="case-study-tag">Marketing &amp; Advertising</span>
					  <span className="case-study-tag">Performance Reporting</span>
					</div>
				  <p className="case-study-summary fade-up animate">80 brands. 150 hours saved weekly. Zero spreadsheet headaches. See how we transformed reporting from all-day chaos to almost instant clarity.</p>
				  <a className="btn">LEARN MORE</a>
				</div>
				
				
				<div className="case-study-card">
				  <div className="case-study-icon modern-icon">
					
					<svg aria-label="Microphone" className="cs-svg" role="img" viewBox="0 0 24 24">
					  <rect height="10" rx="3" width="6" x="9" y="3"></rect>
					  <path d="M5 10v1a7 7 0 0 0 14 0v-1"></path>
					  <line x1="12" x2="12" y1="21" y2="17"></line>
					</svg>
				  </div>
				  <h3 className="case-study-title fade-down animate">AI Interviews Create Standards</h3>
					<div className="case-study-tags fade-up animate">
					  <span className="case-study-tag">Nonprofit &amp; Associations</span>
					  <span className="case-study-tag">Operations</span>
					</div>
				  <p className="case-study-summary fade-up animate">What if meetings wrote their own documentation? Our voice AI turns conversations into polished SOPs—700 and counting, each in under an hour.</p>
				  <a className="btn">LEARN MORE</a>
				</div>
				
				
				<div className="case-study-card">
				  <div className="case-study-icon modern-icon">
					
					<svg aria-label="Document" className="cs-svg" role="img" viewBox="0 0 24 24">
					  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path>
					  <polyline points="14 3 14 8 19 8"></polyline>
					  <line x1="9" x2="15" y1="13" y2="13"></line>
					  <line x1="9" x2="15" y1="17" y2="17"></line>
					</svg>
				  </div>
				  <h3 className="case-study-title fade-down animate">Payment Now, Not Later</h3>
					<div className="case-study-tags fade-up animate">
					  <span className="case-study-tag">B2B SaaS</span>
					  <span className="case-study-tag">Accounts Receivable</span>
					</div>
				  <p className="case-study-summary fade-up animate">Smart AI drafts that actually get invoices paid. We cut AR teams' daily grind by 75% while keeping every message professional and personal.</p>
				  <a className="btn">LEARN MORE</a>
				</div>
				
				
				<div className="case-study-card">
				  <div className="case-study-icon modern-icon">
					
					<svg aria-label="Users" className="cs-svg" role="img" viewBox="0 0 24 24">
					  <circle cx="9" cy="8" r="3"></circle>
					  <path d="M3 20a6 6 0 0 1 12 0"></path>
					  <circle cx="17" cy="9" r="2.5"></circle>
					  <path d="M14.5 20a5.5 5.5 0 0 1 7-4.9"></path>
					</svg>
				  </div>
				  <h3 className="case-study-title fade-down animate">Demystify to Multiply</h3>
					<div className="case-study-tags fade-up animate">
					  <span className="case-study-tag">Nonprofit</span>
					  <span className="case-study-tag">Org-Wide Enablement</span>
					</div>
				  <p className="case-study-summary fade-up animate">30 staff members. 10 hours saved per person weekly. One organization's journey from AI anxiety to AI mastery through hands-on transformation.</p>
				  <a className="btn">LEARN MORE</a>
				</div>
				
				
				<div className="case-study-card">
				  <div className="case-study-icon modern-icon">
					
					<svg aria-label="Megaphone" className="cs-svg" role="img" viewBox="0 0 24 24">
					  <path d="M3 11v2"></path>
					  <path d="M5 12h6l7-4v12l-7-4H8"></path>
					  <path d="M8 14v4c0 1.1-.9 2-2 2H5"></path>
					</svg>
				  </div>
				  <h3 className="case-study-title fade-down animate">Pitches that Pitch Themselves</h3>
					<div className="case-study-tags fade-up animate">
					  <span className="case-study-tag">PR &amp; Communications</span>
					  <span className="case-study-tag">Content Production</span>
					</div>
				  <p className="case-study-summary fade-up animate">PR teams now spend time building relationships, not drafting emails. Our AI writes pitches editors actually want to read—in your brand's voice.</p>
				  <a className="btn">LEARN MORE</a>
				</div>
				
				
				<div className="case-study-card">
				  <div className="case-study-icon modern-icon">
					
					<svg aria-label="Message" className="cs-svg" role="img" viewBox="0 0 24 24">
					  <rect height="14" rx="3" width="18" x="3" y="4"></rect>
					  <path d="M8 18v3l3-3"></path>
					  <line x1="7" x2="17" y1="9" y2="9"></line>
					  <line x1="7" x2="13" y1="13" y2="13"></line>
					</svg>
				  </div>
				  <h3 className="case-study-title fade-down animate">Hear Your Customers, At Scale</h3>
					<div className="case-study-tags fade-up animate">
					  <span className="case-study-tag">Retail Services</span>
					  <span className="case-study-tag">Voice of the Customer</span>
					</div>
				  <p className="case-study-summary fade-up animate">Thousands of reviews. Dozens of locations. One clear picture. We turned customer feedback chaos into actionable insights that drive real change.</p>
				  <a className="btn">LEARN MORE</a>
				</div>
			  </div>
			</div>
		  </div>
		</section>
		
		<section id="client-feedback" style={{backgroundColor: '#ffffff', padding: '80px 0', textAlign: 'center'}}>
		  <div className="container">
			<h2 className="section-title">CLIENT FEEDBACK</h2>
			<div className="testimonial-carousel">
			  <div className="testimonial-slide-container" style={{width: '11424px', transition: 'transform 700ms ease-in-out', transform: 'translateX(-7616px)'}}>
				<div className="testimonial-slide" style={{width: '1904px'}}>
				  <blockquote>
					<div className="quote-container">
					  <div className="quote-box">
						<span className="quote-mark left">“</span>
					  </div>
					  <div className="quote-content">
						<p>
						  HQ helped us cut through the noise, making AI approachable and impactful. Their workshops and expert support leveled up our AI capabilities, adding value for us and our clients.
						</p>
						<footer className="testimonial-footer">
						  <span className="testimonial-name">DEANNA AVI MADIGAN</span>
						  <span className="testimonial-title">Co-Founder, Team Bespoke</span>
						</footer>
					  </div>
					  <div className="quote-box">
						<span className="quote-mark right">”</span>
					  </div>
					</div>
				  </blockquote>
				</div>
				
				<div className="testimonial-slide" style={{width: '1904px'}}>
				  <blockquote>
					<div className="quote-container">
					  <div className="quote-box">
						<span className="quote-mark left">“</span>
					  </div>
					  <div className="quote-content">
						<p>
						  HQ’s engineering team developed AI tools for us that have produced instant ROI and saved us hours. On top of that, they taught us how to maintain and build our own AI solutions.
						</p>
						<footer className="testimonial-footer">
						  <span className="testimonial-name">COURTNEY TREVINO</span>
						  <span className="testimonial-title">COO, Bruce Bolt</span>
						</footer>
					  </div>
					  <div className="quote-box">
						<span className="quote-mark right">”</span>
					  </div>
					</div>
				  </blockquote>
				</div>

				<div className="testimonial-slide" style={{width: '1904px'}}>
				  <blockquote>
					<div className="quote-container">
					  <div className="quote-box">
						<span className="quote-mark left">“</span>
					  </div>
					  <div className="quote-content">
						<p>
						  We have really appreciated the partnership with HQ. I have learned and became interested in more than I imagined and am already putting my new knowledge to work.
						</p>
						<footer className="testimonial-footer">
						  <span className="testimonial-name">ROSEMAY MICHEL, DPM, FACPM</span>
						  <span className="testimonial-title">President, ACPM</span>
						</footer>
					  </div>
					  <div className="quote-box">
						<span className="quote-mark right">”</span>
					  </div>
					</div>
				  </blockquote>
				</div>
				
				<div className="testimonial-slide" style={{width: '1904px'}}>
				  <blockquote>
					<div className="quote-container">
					  <div className="quote-box">
						<span className="quote-mark left">“</span>
					  </div>
					  <div className="quote-content">
						<p style={{fontSize: '1.2rem'}}>
						  Within months of HQ presenting their Demystify AI workshop, most of our team is using AI regularly and reporting an average time savings of 10 hours per week.
						</p>
						<footer className="testimonial-footer">
						  <span className="testimonial-name">REMY REYA</span>
						  <span className="testimonial-title">Deputy Chief of Staff, Compass Pro Bono</span>
						</footer>
					  </div>
					  <div className="quote-box">
						<span className="quote-mark right">”</span>
					  </div>
					</div>
				  </blockquote>
				</div>
				
				<div className="testimonial-slide" style={{width: '1904px'}}>
				  <blockquote>
					<div className="quote-container">
					  <div className="quote-box">
						<span className="quote-mark left">“</span>
					  </div>
					  <div className="quote-content">
						<p>
						  Thanks to HQ, we’re ahead of the AI curve. While my husband’s Fortune 500 bank is just now rolling out AI tools, we’ve been using them for over a year with HQ’s help.
						</p>
						<footer className="testimonial-footer">
						  <span className="testimonial-name">DIRECTOR</span>
						  <span className="testimonial-title">Client Relationships, Marketing Company</span>
						</footer>
					  </div>
					  <div className="quote-box">
						<span className="quote-mark right">”</span>
					  </div>
					</div>
				  </blockquote>
				</div>
				
				
				
				
			  <div className="testimonial-slide" style={{width: '1904px'}}>
				  <blockquote>
					<div className="quote-container">
					  <div className="quote-box">
						<span className="quote-mark left">“</span>
					  </div>
					  <div className="quote-content">
						<p>
						  HQ helped us cut through the noise, making AI approachable and impactful. Their workshops and expert support leveled up our AI capabilities, adding value for us and our clients.
						</p>
						<footer className="testimonial-footer">
						  <span className="testimonial-name">DEANNA AVI MADIGAN</span>
						  <span className="testimonial-title">Co-Founder, Team Bespoke</span>
						</footer>
					  </div>
					  <div className="quote-box">
						<span className="quote-mark right">”</span>
					  </div>
					</div>
				  </blockquote>
				</div></div>
			</div>
			<div className="carousel-dots">
			  <span className="dot"></span>
			  <span className="dot"></span>
			  <span className="dot"></span>
			  <span className="dot"></span>
			  <span className="dot active"></span>
			  
			  
			  
			</div>
		  </div>
		</section>

		<section className="section" id="solutions" style={{padding: '80px 0', backgroundColor: '#000000'}}>
			<div className="container">
				<h2 className="section-titlewhite" style={{color: '#40E0D0'}}>AI WORKSHOPS</h2>
					<div style={{textAlign: 'center', marginBottom: '40px'}}>
						<p style={{fontSize: '1.5rem', lineHeight: '1.6', marginTop: '0px', color: '#ffffff'}}><strong>Still not sure where to start?</strong> Our workshops make it simple. Learn the essentials, see AI in action, and uncover the best ways to put AI to work for you.</p>
					</div>
					<div style={{display: 'flex', justifyContent: 'space-between', gap: '30px', flexWrap: 'wrap'}}>

						<div className="solution-card" style={{flex: '1 1 calc(30% - 40px)', minWidth: '250px'}}>
							<h3 className="solution-title fade-down animate">Demystify AI</h3>
							
							<div className="tag-container">
								<span className="solution-tag fade-up animate">Workshop</span>
								<span className="solution-tag fade-up animate">Fixed Pricing</span>
							</div>
							<p className="fade-up animate">Lay the foundation for understanding GenAI technologies and their potential impact on your organization with our introductory workshop, perfect for teams new to GenAI or looking to align on the basics.</p>
							<a className="btn" style={{marginTop: '20px'}}>LEARN MORE</a>
						</div>
						
						<div className="solution-card" style={{flex: '1 1 calc(30% - 40px)', minWidth: '250px'}}>
							<h3 className="solution-title fade-down animate">Bootcamp Series</h3>
							
							<div className="tag-container">
								<span className="solution-tag fade-up animate">Workshop</span>
								<span className="solution-tag fade-up animate">Fixed Pricing</span>
							</div>
							<p className="fade-up animate">Equip your team with the knowledge, skills, and confidence to drive GenAI adoption through our comprehensive and hands-on bootcamp series, tailored to your organization's unique needs and goals.</p>
							<a className="btn" style={{marginTop: '20px'}}>LEARN MORE</a>
						</div>
						
						<div className="solution-card" style={{flex: '1 1 calc(30% - 40px)', minWidth: '250px'}}>
							<h3 className="solution-title fade-down animate">Ideation Workshop</h3>
							
							<div className="tag-container">
								<span className="solution-tag fade-up animate">Workshop</span>
								<span className="solution-tag fade-up animate">Fixed Pricing</span>
							</div>
							<p className="fade-up animate">Identify and prioritize high-impact GenAI use cases specific to your business needs with our ideation workshop, setting the stage for practical application and value creation.</p>
							<a className="btn" style={{marginTop: '20px'}}>LEARN MORE</a>
						</div>
			
					</div>
			</div>
		</section>

		<section id="beliefs" style={{backgroundColor: '#f8f8f8', padding: '80px 0'}}>
			<div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
				<h2 className="section-title">OUR BELIEFS</h2>
				<div style={{display: 'flex', justifyContent: 'space-between', gap: '30px', flexWrap: 'wrap'}}>
					<div className="card">
						<h3 className="fade-down animate" style={{fontSize: '1.8rem', color: '#40E0D0', marginBottom: '0px'}}>OUR PURPOSE</h3>
						<p className="fade-up animate" style={{fontSize: '1.2rem'}}>To be your leading AI adoption experts—helping organizations get more out of AI while empowering their people, customers, and data.</p>
					</div>
					<div className="card">
						<h3 className="fade-down animate" style={{fontSize: '1.8rem', color: '#40E0D0', marginBottom: '0px'}}>OUR MISSION</h3>
						<p className="fade-up animate" style={{fontSize: '1.2rem'}}>We are a catalyst for unlocking AI solutions in organizations while ensuring every team member thrives—benefiting employees and customers.</p>
					</div>
					<div className="card">
						<h3 className="fade-down animate" style={{fontSize: '1.8rem', color: '#40E0D0', marginBottom: '0px'}}>OUR PROMISE</h3>
						<p className="fade-up animate" style={{fontSize: '1.2rem'}}>We commit to delivering exceptionally positive thought leadership to maximize safe and healthy consumption of AI tools within organizations.</p>
					</div>
				</div>
			</div>
		</section>
  </main>
    </>
  );
};

export default LandingContent;