import Cards from "@/components/custom/cards";
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Carousel } from "react-responsive-carousel";
import { PreviewMessage, ThinkingMessage } from "@/components/custom/message";
import { useState,useEffect } from "react";
import { message } from "@/interfaces/interfaces";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";


const Dashboard = () => {
    const [messages, setMessages] = useState<message[]>([]);
    const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aboutYou, setAboutYou] = useState<string>("");
  const [recentTransactions, setRecentTransactions] = useState<string>("");
  const [yourLikings, setYourLikings] = useState<string>("");

  useEffect(() => {
		const handleOnLoad = async () => {
			try {
				const resp = await axios.post("http://127.0.0.1:5000/get-summary", {
					custid: sessionStorage.getItem('custId'),
				});
        console.log("Summary Loaded:", resp.data.about);
        setAboutYou(resp.data.about['customer']);
        setRecentTransactions(resp.data.about["transaction"]);
        setYourLikings(resp.data.about['likings']);
			} catch (error) {
				console.error("Error loading summary:", error);
			}
		};
		handleOnLoad();
	}, []);
  const handleOnSubmit = async () => {
		if (isLoading) return;

		setIsLoading(true);
		setQuestion("");

		try {
			const resp = await axios.post("http://127.0.0.1:5000/get-ads", {
				custid: sessionStorage.getItem('custId'),
			});

			// Simulate streaming by appending the assistant's response
			const assistantMessage = resp.data.ads;
			setMessages(() => [
				{ content: assistantMessage, role: "assistant", id: uuidv4() },
			]);
		} catch (error) {
			console.error("Error fetching offers:", error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="flex flex-col min-w-0  h-dvh bg-background">
			<div className="flex flex-row w-lvw bg-white h-16 shadow-md">
				<div className="flex m-auto items-center pl-4">
					<h1 className=" m-auto text-2xl  text-gray-900">
						Finnovate Yourselves
					</h1>
					<div>
						<img
							style={{ float: "right" }}
							width={"50px"}
							height={"50px"}
							src="src/assets/images/chatbot.png"
							alt="chatbot"
						/>
					</div>
				</div>
			</div>
			<div className="mx-auto p-4 text-black  text-xl ">
				Welcome to your personalized dashboard, where you will get to know more
				about you and your financial Goal settings
			</div>
			<div className="mx-auto p-4 text-black">
				<button
					onClick={()=>{window.location.href = "/chat"}}
					className="bg-black hover:bg-gray-200 text-white hover:text-black font-bold py-2 px-4 rounded"
				>
					Click here to chat with your AI assistant {"-->"}
				</button>
			</div>

			<div className="mx-auto flex flex-row justify-center w-full gap-4 p-4">
				<Cards title="About You" description={aboutYou} />
				<Cards
					title="Recent Transactions"
					description={recentTransactions}
				/>
				<Cards title="Your Likings" description={yourLikings} />
			</div>
			<div className="mx-auto p-4 text-black">
				<button
					onClick={handleOnSubmit}
					className="bg-black hover:bg-gray-200 text-white hover:text-black font-bold py-2 px-4 rounded"
				>
					Click here for personalized offers {"-->"}
				</button>
			</div>
			<div style={{ width: "100%" }} className="p-4 text-black">
				{messages.map((message, index) => (
					<PreviewMessage key={index} message={message} />
				))}
				{isLoading && <ThinkingMessage />}
			</div>
		</div>
	);
};

export default Dashboard;
