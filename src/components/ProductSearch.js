import React from 'react';

class ProductSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		if(this.props.onSubmit && typeof this.props.onSubmit === "function") {
			this.props.onSubmit(this.state.value);
		}
	}

	render() {
		return (
			<form class="d-flex" onSubmit={this.handleSubmit}>
				<div class="input-group">
					<input class="form-control" type="search" placeholder="Rechercher" aria-label="Search" value={this.state.value} />
					<button class="btn btn-secondary" type="submit"><i class="fas fa-search"></i></button>
				</div>
			</form>
		);
	}
}

export default ProductSearch;