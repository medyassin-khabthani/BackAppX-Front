import React, { Component } from 'react';

import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],

        };
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
        this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this);

    }

    componentDidMount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems) {
            this.setState({ cartItems });
            console.log(cartItems); // console.log the cart data
        }
    }

    handleDecreaseQuantity = (quantity) => {
        this.setState({ quantity: quantity + 1 });
    };


    handleIncreaseQuantity = (quantity) => {
        this.setState({ quantity: quantity + 1 });
    }



    handleAddToCart(product) {
        const { cartItems } = this.state;
        const itemIndex = cartItems.findIndex((item) => item.id === product.id);

        if (itemIndex >= 0) {
            const updatedCartItems = [cartItems];
            updatedCartItems[itemIndex].quantity += 1;
            this.setState({ cartItems: updatedCartItems });
        } else {
            const newCartItem = { id: product.id, name: product.name, price: product.price, quantity: 1 };
            this.setState({ cartItems: [cartItems, newCartItem] });
        }
    }

    handleRemoveFromCart = (id) => {
        const { cartItems } = this.state;
        console.log(cartItems)
        console.log(id)

        const updatedCartItems = cartItems.filter((item) => item.product._id !== id);
        this.setState({
            cartItems: updatedCartItems,
        });
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    handleUpdateQuantity = (productId, newQuantity) => {
        const { cartItems } = this.state;
        const itemIndex = cartItems.findIndex((item) => item.product.id === productId);
        console.log(itemIndex)
        if (itemIndex >= 0 && newQuantity >= 0) {
            const updatedItem = { ...cartItems[itemIndex], quantity: newQuantity };
            const updatedCartItems = [...cartItems];
            updatedCartItems[itemIndex] = updatedItem;
            this.setState({
                cartItems: updatedCartItems,
            });
        }
    };


    // handleOrder = async (customerName) => {
    //     const { cartItems } = this.state;

    //     const orderPromises = cartItems.map(async (item) => {
    //         const { product, quantity } = item;

    //         try {
    //             const response = await fetch('http://localhost:9092/order/addorder', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({
    //                     customerId: '640602ba6e1d319c3b020f15', // replace with actual customer ID
    //                     products: [
    //                         {
    //                             productId: product._id,
    //                             quantity: quantity,
    //                             price: product.price,
    //                             status: 'Pending',
    //                         },
    //                     ],
    //                 }),
    //             });
    //             const data = await response.json();
    //             console.log(data);
    //             return data;
    //         } catch (error) {
    //             console.log(error);
    //             return null;
    //         }
    //     });

    //     const orders = await Promise.all(orderPromises);

    //     // Clear cart and show success message
    //     localStorage.setItem('cartItems', JSON.stringify([]));
    //     this.setState({ cartItems: [] });
    //     alert('Order placed successfully');
    // }

    handleOrder = async (customerName) => {
        const { cartItems } = this.state;

        const orderProducts = cartItems.map(item => {
            const { product, quantity } = item;

            return {
                productId: product._id,
                quantity,
                price: product.price,
                status: 'Pending'
            };
        });

        try {
            const response = await fetch('http://localhost:9092/order/addorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId: '6424632cda74a300005f02d7', // replace with actual customer ID
                    products: orderProducts
                })
            });

            const data = await response.json();
            console.log(data);

            // Clear cart and show success message
            localStorage.setItem('cartItems', JSON.stringify([]));
            this.setState({ cartItems: [] });
            alert('Order placed successfully');
        } catch (error) {
            console.log(error);
            alert('Error placing order');
        }
    }

    render() {
        const { cartItems } = this.state;
        const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
        const { currentQuantity } = this.state;


        return (
            <div id="wrapper">
                <NavLeftDashboard />
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <HeaderDashboard />
                        <div className="container mt-4">
                            <h1>Your Cart</h1>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Product Image</th>
                                        <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Product Name</th>
                                        <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Quantity</th>
                                        <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Price</th>
                                        <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Total</th>
                                        <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {cartItems.map((item) => (
                                        <tr key={item.product.id}>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                                <img src={item.product.image.url} alt='' style={{ height: '200px', width: '200px' }} />
                                            </td>
                                            <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>{item.product.name}</td>

                                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                                <td>
                                                    {/* <button style={{ backgroundColor: '#00a0c4', color: 'white', border: 0 }} size="sm" className="me-2" onClick={() => this.handleUpdateQuantity(item.id, item.quantity - 1)}>-</button> */}
                                                    {item.quantity}
                                                    {/* <button style={{ backgroundColor: '#00a0c4', color: 'white', border: 0 }} size="sm" className="ms-2" onClick={() => this.handleUpdateQuantity(item.id, item.quantity + 1)}>+</button> */}
                                                </td>
                                            </td>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.product.price} DNT</td>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{item.product.price * item.quantity} DNT</td>
                                            <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                                <button style={{ backgroundColor: 'white', color: 'red', padding: '4px 8px', border: 'none', cursor: 'pointer' }} onClick={() => this.handleRemoveFromCart(item.product._id)}><i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td style={{ padding: '8px', borderTop: '2px solid #ddd', fontWeight: 'bold', textAlign: 'right' }} colSpan="3">Total:</td>
                                        <td style={{ padding: '8px', borderTop: '2px solid #ddd', fontWeight: 'bold' }}>{cartTotal} DNT</td>
                                        <td style={{ padding: '8px', borderTop: '2px solid #ddd' }}>
                                            <button style={{ backgroundColor: '#00a0c4', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => this.handleOrder('John Doe')}  >Order</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                    </div>

                    <FooterDashboard />

                </div>

            </div >



        )
    }
}
export default Cart;