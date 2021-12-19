import React from 'react';
import Pagination from './Pagination'
import Parser from 'html-react-parser';

class Products extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			isLoaded: false,
			items: [],
			pageCount: 1,
			currentPage: 1
		};

		this.handlePageClick = this.handlePageClick.bind(this);
		this.totalPostsByPage = 12;
	}
	
	currencySymbol(currencyPrice) {
		const currencyArray = {
			"usd": "$",
			"real": "R$",
			"cad": "CAD",
			"gbp": "£",
			"euro": "€"
		}
		
		return currencyArray[currencyPrice];
	}

	componentDidMount() {
		this.getDatas();
	}
  
	handlePageClick (data) {
		data = data.selected + 1;

		this.setState({currentPage: data}, function () {
			this.getDatas();
		});
	}

	toggleSearch() {
		this.getDatas()
	}
  
	getDatas() {
		var textSearch = "";

		if(this.props.searchValue !== "")
			textSearch = "&orsearch=" + this.props.searchValue;

		const url = process.env.REACT_APP_URL + "api/book_stores?page=" + this.state.currentPage + "&order[id]=desc" + textSearch + "&book.book.language.abbreviation=fr";

		fetch(url)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					items: result["hydra:member"],
					pageCount: Math.ceil(result["hydra:totalItems"] / this.totalPostsByPage),
					currentPage: this.state.currentPage
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}

	render() {
		const { error, isLoaded, items } = this.state;

		if (error) {
			return <div>Erreur : {error.message}</div>;
		} else if (!isLoaded) {
			return <div className="text-center text-white"><div className="fa-3x"><i className="fas fa-spinner fa-pulse load-spinner"></i></div>Chargement…</div>;
		} else if (items.length == 0) {
			return (
				<div>
					<div className="alert alert-info">
					Aucun résultat n'a été trouvé !
					</div>
				</div>
			)
		} else {
			return (
				<div>
					<div className="row">
						{items.map(item => (
							<div className="col-lg-3 col-md-4 col-sm-6">
								<div className="card mb-4 shadow-sm">
									<div className="text-center">{Parser(item.imageEmbeddedCode)}</div>
									<div className="card-body">
										<p className="text-center fw-bold">{item.title}</p>
										{item.price > 0 && 
											<p className="price text-center"><span>{item.price} {this.currencySymbol(item.currencyPrice)}</span></p>
										}
										<div className="text-center">
											<i className="fas fa-sun"></i> {item.book.book.theme.title}
											<br />
											{ item.book.book.authors.length > 0 ? <i className="fas fa-user"></i> : ''}
											{item.book.book.authors.map((author, index) => (
												<span> {author.title}{item.book.book.authors.length < index ? ", " : ""}</span>
											))}
										</div>
										<div className="card-text"></div>
										<hr />
										<div className="text-center">
											<a href={item.externalAmazonStoreLink} className="btn btn-sm amazon text-white"><i className="fab fa-amazon"></i> Achetez-le sur Amazon</a>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

				<Pagination 
					pageCount={this.state.pageCount}
					initialPage={this.state.currentPage - 1}
					forcePage={this.state.currentPage - 1}
					previousLabel={'<'}
					nextLabel={'>'}
					onPageChange={this.handlePageClick}
					pageRangeDisplayed={this.totalPostsByPage}
				></Pagination>
				</div>
			);
		}
	}
}
export default Products;