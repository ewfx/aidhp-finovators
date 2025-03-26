interface CardsProps { 
  title: string;
  description: string;
}
const Cards = (props : CardsProps) => {
  return (
		<div>
			<div className="m-6 max-w-sm rounded overflow-hidden shadow-lg">
				<div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{ props.title}</div>
					<p className="text-gray-700 text-base">
						{ props.description}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Cards