import React from 'react';
const Home = () => {
	return (
		<div className='home'>
			<p className='lead'>
				To vote, please login with google. We do this to prevent multiple
				submissions.
			</p>
			<p className='lead'>
				After logging in, you will be redirected to the voting form.
			</p>
			<a
				className='btn btn-primary btn-lg'
				href='https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=email&response_type=code&client_id=447379049298-hr3cst7ggjnhkpcal5v51t95kdou5lfb.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fguild-name-voting.netlify.com%2Fvote'
			>
				Login With Google
			</a>
		</div>
	);
};
export default Home;
