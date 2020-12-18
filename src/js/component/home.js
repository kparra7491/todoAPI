import React, { component } from "react";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			currentItem: ""
		};
	}

	render() {
		return (
			<div>
				<ol>
					<li>
						<div>
							<input
								type="text"
								ref={el => (this.input = el)}
								onChange={e =>
									this.setState({
										currentItem: e.target.value
									})
								}
							/>
							<a
								ref={el => (this.plus = el)}
								onClick={() =>
									this.setState({
										list: [
											...this.state.list,
											this.state.currentItem
										]
									})
								}>
								<i className="fas fa-plus" />
							</a>
						</div>
					</li>
					{this.state.list.map((item, i) => (
						<li key={i}>
							{item}
							<a
							//can't get a .splice() to work 	onClick={e =>this.setState({ people: })}
							>
								<i className="fas fa-minus" />
							</a>
						</li>
					))}
				</ol>
			</div>
		);
	}
}
