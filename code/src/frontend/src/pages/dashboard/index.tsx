import Cards from "@/components/custom/cards";
import ImageCard from "@/components/custom/imageCard";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Carousel } from "react-responsive-carousel";


const Dashboard = () => {
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
				<button className="bg-black hover:bg-gray-200 text-white hover:text-black font-bold py-2 px-4 rounded">
					Click here to chat with your AI assistant {"-->"}
				</button>
			</div>

			<div className="mx-auto flex flex-row justify-center w-full gap-4 p-4">
				<Cards title="About You" description="This is the first card" />
				<Cards
					title="Recent Transactions"
					description="This is the second card"
				/>
				<Cards title="Your Likings" description="This is the third card" />
			</div>
			<div style={{ width: "100%" }} className="p-4 text-black">
				<Carousel
					autoPlay={false}
					interval={1000}
					infiniteLoop={true}
					showThumbs={true}
				>
					<div className="m-auto flex flex-row justify-center w-full gap-4 p-4">
						<ImageCard title="About You" description="This is the first card" />
					</div>
					<div className="m-auto flex flex-row justify-center w-full gap-4 p-4">
						<ImageCard title="About You" description="This is the first card" />
					</div>
					<div className="m-auto flex flex-row justify-center w-full gap-4 p-4">
						<ImageCard title="About You" description="This is the first card" />
					</div>
					<div className="m-auto flex flex-row justify-center w-full gap-4 p-4">
						<ImageCard title="About You" description="This is the first card" />
					</div>
				</Carousel>
			</div>
		</div>
	);
};

export default Dashboard;
