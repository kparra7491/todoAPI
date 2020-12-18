import React, { component } from "react";

//create your first component
export class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],

			currentItem: "",
			url: "https://assets.breatheco.de/apis/fake/todos/user/kparra"
		};
	}

	addItem = () => {
		if (this.state.currentItem) {
			var newListObject = { label: this.state.currentItem, done: false };
			var updatedList = this.state.list.concat(newListObject);
			this.setState({
				list: updatedList
			});

			fetch(this.state.url, {
				method: "PUT", // or 'POST'
				body: JSON.stringify(updatedList), // data can be `string` or {object}!
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => res.json())
				.then(response =>
					console.log("Success:", JSON.stringify(response))
				)
				.catch(error => console.error("Error:", error));
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

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/kparra")
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(jsonifiedResponse => {
				console.log(jsonifiedResponse);

				this.setState({ list: jsonifiedResponse });
			})

			.catch(function(error) {
				console.log("ya broke it", error);
			});
	}

	render() {
		return (
			<div>
				<ol>
					<li value="0">
						<div className="listTop d-flex justify-content-between">
							<div>
								<input
									type="text"
									className="input"
									id="in"
									ref={el => (this.input = el)}
									onChange={e =>
										this.setState({
											currentItem: e.target.value
										})
									}
								/>
							</div>
							<div
								ref={el => (this.plus = el)}
								onClick={this.addItem}>
								<i className="fas fa-plus" />
							</div>
						</div>
					</li>
					{this.state.list.map((item, i) => (
						<li
							ref={el => (this.li = el)}
							value={i}
							className="listTop d-flex justify-content-between"
							key={i}
							// onMouseOver={this.unhide()}
							//ref={el => (this.listRefs[i] = el)}
						>
							{item.label}-{item.done}
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
