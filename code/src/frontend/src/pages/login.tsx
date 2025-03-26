import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [isOrgLogin, setIsOrgLogin] = useState(false);
	const [custId, setCustId] = useState('');
	const [password, setPassword] = useState('');
	const [failed, setFailed] = useState(false);
	const nav = useNavigate();

	
	const handleOnLoad = async () => {
		try {
		  const resp = await axios.post("http://127.0.0.1:5000/preload-summary", {
			custid: custId,
		  });
		  sessionStorage.setItem("custId", custId);
		  console.log("Summary Loaded:", resp.data);
		} catch (error) {
		  console.error("Error loading summary:", error);
		}
	}	
		

    const handleClick = async () => {
		try {
		  const resp = await axios.post("http://127.0.0.1:5000/signup", {
			custid: custId,
			password: password
		  });
		  console.log("Summary Loaded:", resp.data, resp.status);
		  if(resp.status === 200){
             nav('/dashboard')
		  }
		  handleOnLoad();
		} catch (error) {
		  console.error("Error loading summary:", error);
		  if(error.response.status === 401){
			setFailed(true)
		  }
		}
	  };

	const LoginForm = () => {
		return (
			<div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
				<h2 className="p-3 text-3xl font-bold text-black">Finnovate  - {isOrgLogin ? "WealthIQ" : "SocialIQ"}</h2>
				<div className="inline-block border-[1px] justify-center w-20 border-black border-solid"></div>
				<h3 className="text-xl font-semibold text-black-200 pt-2">Sign In to {isOrgLogin ? 'Organization' : "Personal"} profile!</h3>
				<div className="flex space-x-2 m-4 items-center justify-center">
					
				</div>
				{/* Inputs */}
				<div className="flex flex-col items-center justify-center">
					<input
					    onChange={(e) => setCustId(e.target.value)}
						value={custId}
						type="email"
						className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-black m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
						placeholder="Customer ID"
					></input>
					<input
					    onChange={(e) => setPassword(e.target.value)}
						value={password}
						type="password"
						className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-black m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
						placeholder="Password"
					></input>
					<button className="rounded-2xl m-2 text-white bg-black w-2/5 px-4 py-2 shadow-md hover:text-black hover:bg-white transition duration-200 ease-in" onClick={handleClick}>
						Sign In
					</button>
					{failed && (<p style={{ color: 'red' }} className="mb-2"> Login failed!</p>)}
				</div>
				<div className="inline-block border-[1px] justify-center w-20 border-black border-solid"></div>
				<p className="text-black mt-4 text-sm">Don't have an account?</p>
				<p
					className="text-black mb-4 text-sm font-medium cursor-pointer"
					onClick={() => setIsLogin(false)}
				>
					Create a New Account?
				</p>
				<p
					className="text-black mb-4 text-sm font-medium cursor-pointer"
					onClick={() => setIsOrgLogin(!isOrgLogin)}
				>
					Login to {isOrgLogin ? "Personal" : "Organization"} account
				</p>
			</div>
		);
	};

	const SignUpForm = () => {
		return (
			<div className="bg-black text-white rounded-2xl shadow-2xl  flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
				<h2 className="p-3 text-3xl font-bold text-white">Finnovate</h2>
				<div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
				<h3 className="text-xl font-semibold text-white pt-2">
					Create Account!
				</h3>

				<div className="flex flex-col items-center justify-center mt-2">
					<input
						type="text"
						className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-black m-1 focus:shadow-md focus:border-black text-black focus:outline-none focus:ring-0"
						placeholder="Name"
					></input>
					<input
						type="email"
						className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-black m-1 focus:shadow-md focus:border-black text-black focus:outline-none focus:ring-0"
						placeholder="Email"
					></input>
					<input
						type="password"
						className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-black m-1 focus:shadow-md focus:border-black text-black focus:outline-none focus:ring-0"
						placeholder="Password"
					></input>
		
					<button className="rounded-2xl m-4 text-black bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-black transition duration-200 ease-in">
						Sign Up
					</button>
				</div>
				<div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
				<p className="text-white mt-4 text-sm">Already have an account?</p>
				<p
					className="text-white mb-4 text-sm font-medium cursor-pointer"
					onClick={() => setIsLogin(true)}
				>
					Sign In to your Account?
				</p>
			</div>
		);
	};

	return (
		<div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
			<main className="flex items-center w-full px-2 md:px-20">
				<div className="hidden md:inline-flex flex-col flex-1 space-y-1">
					<p className="text-6xl text-black font-bold">Finnovate {isOrgLogin ? "Wealth" : "Social"}</p>
					<p className="font-medium text-lg leading-1 text-gray-400">
						Smart finance Assistant for saving,planning and investing. 🚀
					</p>
				</div>
				{isLogin ? <LoginForm /> : <SignUpForm />}
			</main>
		</div>
	);
};

export default Login;
