import React, {Component} from 'react';
import './product.css';
import DataService from '../services/data-service';


let ds = new DataService();

class Product extends Component {
    
   constructor(props) {
       super(props);
       
       this.state = {onWishList: ds.itemOnWishList()};
       
       //Bind functions
       this.onButtonClicked = this.onButtonClicked.bind(this);
       
   } 
    
    onButtonClicked = () => {
       ds.addWishListItem(this.props.product); 
    }
    
    render() {
        
        var btnClass;
        
        if(this.state.onWishList) {
            btnClass = "btn btn-danger";
            
        }
        else {
            btnClass = "btn btn-primary";
        }
    return(
        <div className="card product">
           <img className="card-img-top" src={this.props.product.imgUrl} alt="Product"></img>
           <div className="card-block">
                 <h4 className="card-title">{this.props.product.title}</h4>
                 <p className="card-text">Price: ${this.props.product.price}</p>
                 <a href="#" onClick={() => this.onButtonClicked()} className={btnClass}>{this.state.onWishList ? "Remove from WishList" : "Add TO Card"}</a>
            </div>
          </div>
      );
    }
}

export default Product;
    