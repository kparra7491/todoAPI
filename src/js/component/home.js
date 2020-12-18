import React, { component } from "react";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			listRefs: [],
			currentItem: ""
		};
	}

	addItem = () => {
		if (this.state.currentItem) {
			this.setState({
				list: [...this.state.list, this.state.currentItem]
			});
		}
	};

	removeItem = index => {
		var newList = this.state.list;
		newList.splice(index, 1);

		this.setState({
			list: newList
		});
	};

	// unhide = index => {
	// 	var contentStyle = this.listRefs[index].style;
	// 	contentStyle.display === "none"
	// 		? (contentStyle.display = "block")
	// 		: (contentStyle.display = "none");
	// };

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
								onClick={this.addItem}>
								<i className="fas fa-plus" />
							</a>
						</div>
					</li>
					{this.state.list.map((item, i) => (
						<li
							key={i}
							// onMouseOver={this.unhide()}
							//ref={el => (this.listRefs[i] = el)}
						>
							{item}
							<a onClick={() => this.removeItem(i)}>
								<i className="fas fa-minus" />
							</a>
						</li>
					))}
				</ol>
			</div>
		);
	}
}
