import React, { Component } from 'react';

import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            currentProduct: null,
            currentQuantity: 1,
            cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
        };
    }



    componentDidMount() {
        fetch('http://127.0.0.1:9092/product/getallproduct', {
            method: "GET",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
                console.log(data);
            })
            .catch(error => console.error(error));
    }

    // handleAddToOrder = (product) => {
    //     fetch('http://127.0.0.1:9092/product/getallproduct', {
    //         method: "post",
    //         crossDomain: true,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //     })
    //     .then(res => {
    //         console.log('Order added successfully!');
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }

    handleDecreaseQuantity = () => {
        if (this.state.currentQuantity > 1) {
            this.setState({ currentQuantity: this.state.currentQuantity - 1 });
        }
    };

    handleIncreaseQuantity = () => {
        if (this.state.currentQuantity < this.state.currentProduct.quantity) {
            this.setState({ currentQuantity: this.state.currentQuantity + 1 });
        }
    };

    handleAddToCart = (product) => {
        const { currentQuantity } = this.state;
        const item = { product, quantity: currentQuantity };
        this.addToLocalStorage(item);
    };

    addToLocalStorage = (item) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find((cartItem) => cartItem.product._id === item.product._id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cartItems.push(item);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    render() {
        const { products } = this.state;
        const { currentProduct, currentQuantity } = this.state;

        return (
            <div id="wrapper">
                <NavLeftDashboard />
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <HeaderDashboard />
                        <div>
                            <h1 style={{ textAlign: 'center' }}>Featured Products</h1>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: '10px',
                                    flexWrap: 'wrap',
                                    gap: '2em'
                                }}
                            >
                                {products.map((product) => (
                                    <div
                                        style={{
                                            textAlign: 'left',
                                            color: 'black',
                                            width: '300px',
                                            borderRadius: '5px',
                                            padding: '1em',
                                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}
                                        key={product._id}
                                    >

                                        <img src={product.image.url} alt='' style={{ height: '200px', width: 'auto' }} />
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                        <p>{product.price} DNT</p>

                                        {product === currentProduct && (
                                            <div>
                                                <div style={{ display: 'flex' }}>
                                                    <button onClick={() => this.handleAddToCart(currentProduct)} style={{ backgroundColor: '#00a0c4', color: 'white', border: 0, textAlign: 'left', marginRight: '15px' }} >
                                                        Add to Order
                                                    </button>
                                                    <div >
                                                        <button onClick={this.handleDecreaseQuantity} style={{ backgroundColor: '#00a0c4', color: 'white', border: 0 }}>-</button>
                                                        <span style={{ margin: '0 10px' }}>{currentQuantity}</span>
                                                        <button onClick={this.handleIncreaseQuantity} style={{ backgroundColor: '#00a0c4', color: 'white', border: 0 }}>+</button>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                        {product !== currentProduct && (
                                            <button style={{ backgroundColor: 'rgb(241, 92, 87)', border: 0, color: 'white' }} onClick={() => this.setState({ currentProduct: product, currentQuantity: 1 })}>
                                                Select
                                            </button>
                                        )}

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <FooterDashboard />

                </div>

            </div >



        )
    }
}
export default Shop;

