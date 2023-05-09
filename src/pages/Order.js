import React, { Component } from 'react';

import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            filteredOrders: [],
            searchValue: '',
            sortBy: '', // Track current sorting field
            sortAsc: true, // Track current sorting order

        };
    }



    componentDidMount() {
        this.setState({ isLoading: true });
        const projectId = localStorage.getItem('projectId');

        fetch(`http://127.0.0.1:9092/order/getAllOrdersByProject/${projectId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ orders: data.orders, filteredOrders: data.orders });
                console.log(data.orders)

            })
            .catch(error => {
                this.setState({ error });
            });
    }

    handleSearchChange = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredOrders = this.state.orders.filter((order) => {
            const customerName = order.customerName.toLowerCase();
            const productNames = order.products
                .map((product) => product.product.name.toLowerCase())
                .join(' ');
            return customerName.includes(searchValue) || productNames.includes(searchValue);
        });
        this.setState({ filteredOrders, searchValue });
    };

    sortByTotalPrice = () => {
        const { filteredOrders, sortAsc } = this.state;
        const sortedOrders = [...filteredOrders].sort((a, b) => {
            return sortAsc ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
        });
        this.setState({ filteredOrders: sortedOrders, sortBy: 'totalPrice', sortAsc: !sortAsc });
    }

    // Sort orders by created at
    sortByCreatedAt = () => {
        const { filteredOrders, sortAsc } = this.state;
        const sortedOrders = [...filteredOrders].sort((a, b) => {
            return sortAsc ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
        });
        this.setState({ filteredOrders: sortedOrders, sortBy: 'createdAt', sortAsc: !sortAsc });
    }

    render() {

        const { orders } = this.state;

        const thirtyDaysAgo = new Date();

        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);



        const totalRevenue = this.state.orders
            ? this.state.orders
                .filter(order => new Date(order.createdAt) >= thirtyDaysAgo)
                .reduce((acc, order) => {
                    return acc + order.products.reduce((acc2, product) => {
                        if (!product.price) {
                            return acc2; // skip this iteration
                        }
                        return acc2 + product.price * product.quantity;
                    }, 0);
                }, 0)
            : 0;


        const numOrders = this.state.orders.length;
        const averageOrderValue = numOrders > 0 ? totalRevenue / numOrders : 0;

        const orderVolume = this.state.orders.length;

        const currentDate = new Date();

        const ordersToday = this.state.orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate.getFullYear() === currentDate.getFullYear() &&
                orderDate.getMonth() === currentDate.getMonth() &&
                orderDate.getDate() === currentDate.getDate();
        });
        const { sortBy, sortAsc } = this.state;

        return (
            <div id="wrapper">
                <NavLeftDashboard />
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <HeaderDashboard />

                        <div style={{ display: 'flex' }}>
                            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', padding: '16px', width: '300px', marginRight: '16px' }}>
                                <div>
                                    <h3 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: 'rgb(241, 92, 87)' }}>Total Revenue</h3>
                                    <p style={{ margin: '0', fontSize: '14px', color: '#999', marginTop: '4px' }}>Last 30 days</p>
                                    <h2 style={{ margin: '0', fontSize: '36px', fontWeight: 'bold', color: '#00a0c4' }}>${totalRevenue.toFixed(2)}</h2>

                                </div>
                                <div>
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', padding: '16px', width: '300px', marginRight: '16px' }}>
                                <div>
                                    <h3 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: 'rgb(241, 92, 87)' }}>Average Order Value</h3>
                                    <p style={{ margin: '0', fontSize: '14px', color: '#999', marginTop: '4px' }}>Last 30 days</p>
                                    <h2 style={{ margin: '0', fontSize: '36px', fontWeight: 'bold', color: '#00a0c4' }}>${averageOrderValue.toFixed(2)}</h2>
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', padding: '16px', width: '300px', marginRight: '16px' }}>
                                <div>
                                    <h3 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: 'rgb(241, 92, 87)' }}>Order Volume</h3>
                                    <p style={{ margin: '0', fontSize: '14px', color: '#999', marginTop: '4px' }}>Last 30 days</p>
                                    <h2 style={{ margin: '2px', fontSize: '36px', fontWeight: 'bold', color: '#00a0c4' }}>{orderVolume}</h2>
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', width: '300px' }}>
                                <div>
                                    <h3 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: 'rgb(241, 92, 87)' }}>Total Orders Today</h3>
                                    <p style={{ margin: '0', fontSize: '14px', color: '#999', marginTop: '4px' }}>As of {currentDate.toLocaleDateString()}</p>
                                    <h2 style={{ margin: '0', fontSize: '36px', fontWeight: 'bold', color: '#00a0c4' }}>{ordersToday.length}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="container mt-4">
                            <h1>Orders</h1>
                            <div style={{ fontFamily: 'Arial, sans-serif' }}>
                                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <input style={{ textAlign: 'left', width: '250px' }} type="text" value={this.state.searchValue} onChange={this.handleSearchChange} placeholder="Search" />
                                </div>
                                <table style={{ borderCollapse: 'collapse', width: '100%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#00a0c4', color: 'white', borderBottom: '1px solid #ddd' }}>Order Number</th>
                                            <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#00a0c4', color: 'white', borderBottom: '1px solid #ddd' }}>Customer Name</th>
                                            <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#00a0c4', color: 'white', borderBottom: '1px solid #ddd' }}>Products</th>
                                            <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#00a0c4', color: 'white', borderBottom: '1px solid #ddd' }}>Quantite</th>
                                            <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#00a0c4', color: 'white', borderBottom: '1px solid #ddd' }}>Price</th>
                                            <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#00a0c4', color: 'white', borderBottom: '1px solid #ddd' }}>
                                                <button onClick={this.sortByTotalPrice} style={{ backgroundColor: 'rgb(241, 92, 87)', color: 'white', border: 'none', borderRadius: '4px', padding: '8px', cursor: 'pointer' }}>Total Price {sortBy === 'totalPrice' && (sortAsc ? '▲' : '▼')}</button>
                                            </th>
                                            <th style={{ padding: '8px', textAlign: 'left', backgroundColor: '#00a0c4', color: 'white', borderBottom: '1px solid #ddd' }}>
                                                <button onClick={this.sortByCreatedAt} style={{ backgroundColor: 'rgb(241, 92, 87)', color: 'white', border: 'none', borderRadius: '4px', padding: '8px', cursor: 'pointer' }}>Created At {sortBy === 'createdAt' && (sortAsc ? '▲' : '▼')}</button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.filteredOrders.map((order, index) => (
                                            <tr key={order._id}>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{index + 1}</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{order.customerName}</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                                    <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                                                        {order.products.map((product) => (
                                                            <li key={product._id} style={{ margin: '4px 0' }}>
                                                                {product.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                                    <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                                                        {order.products.map((product) => (
                                                            <li key={product._id} style={{ margin: '4px 0' }}>
                                                                {product.quantity}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                                    <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                                                        {order.products.map((product) => (
                                                            <li key={product._id} style={{ margin: '4px 0' }}>
                                                                {product.price}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{order.totalPrice}</td>
                                                <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>{new Date(order.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <FooterDashboard />

                </div>

            </div >



        )
    }
}
export default Order;
