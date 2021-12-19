import React from 'react';
import ReactModal from 'react-modal';
import Parser from 'html-react-parser';

class ProductDetail extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };

this.customStyles = {
  overlay: {zIndex: 1500}
};
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal
		   style={this.customStyles}
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
		<h4>{this.props.title}</h4>
		<hr></hr>
		<div class="row">
  <div class="col-sm-4">{Parser(this.props.image)}</div>
  <div class="col-sm-8">
  {Parser(this.props.text)}
  <a href={this.props.url} class="btn btn-sm aliexpress text-white"><i class="fab fa-alipay"></i> Achetez-le</a>
  </div>
</div>
          <button class="btn btn-danger float-right" onClick={this.handleCloseModal}><i class="fas fa-times"></i> Fermer</button>
        </ReactModal>
      </div>
    );
  }
}
export default ProductDetail;