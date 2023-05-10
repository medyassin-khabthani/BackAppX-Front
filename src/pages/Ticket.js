import React, { Component, useEffect } from 'react';
import io from 'socket.io-client';

import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reclamations: [],
            messages: [],
            activeReclamation: null,
            objet: '',
            contenu: '',
            stat: '',
            message: '',
            userId: "",
            userData:"",
            id:"",
            role:""

        };
        this.socket = io("http://localhost:9092");
        this.messageContainer = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleObjetChange = this.handleObjetChange.bind(this);
        this.handleContenuChange = this.handleContenuChange.bind(this);
        this.handleStatChange = this.handleStatChange.bind(this);
    }

    handleObjetChange = (event) => {
        this.setState({ objet: event.target.value });
    };

    handleContenuChange = (event) => {
        this.setState({ contenu: event.target.value });
    };

    handleStatChange = (event) => {
        this.setState({ stat: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.objet)
        const requestBody = {
            objet: this.state.objet,
            contenu: this.state.contenu,
            userId: window.localStorage.getItem("userId"),
            stat: this.state.stat,
        };

        fetch(`http://127.0.0.1:9092/reclamation/reclamation`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ reclamations: data });
                console.log(data);
                window.location.href = "./ticket"

            })
            .catch(error => {
                this.setState({ error });
            });
    };

    handleReclamationClick = (reclamation) => {
        // Store the selected reclamationId in localStorage
        localStorage.setItem("selectedReclamationId", reclamation._id);

        /////////////////////////////////////////////////////////
        // clearInterval(this.messagesInterval);
        /////////////////////////////////////////////////////////

        // Update the component's state with the selected reclamation
        this.setState(
            {
                selectedReclamation: reclamation,
                messages: [],
            },
            () => {
                this.fetchMessages(reclamation._id);
                ////////////////////////////////////////////////////////////////////////////
                // Fetch messages for the selected reclamation
                //   this.messagesInterval = setInterval(() => {
                //      this.fetchMessages(reclamation._id);
                //  }, 5000);
                ////////////////////////////////////////////////////////////////////////////              
            }
        );
    };

    fetchMessages(reclamationId) {
        fetch(`http://127.0.0.1:9092/reclamation/reclamation/getMessages/${reclamationId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched messages: ", data); // Add this line
                this.setState({ messages: data });
            })
            .catch((error) => console.error(error));
    }

    sendMessage = (content) => {
        const currentUser = JSON.parse(window.localStorage.getItem('currentUser'));

        const reclamationId = localStorage.getItem("selectedReclamationId");
        const id = localStorage.getItem("userId");

        if (!content) {
            alert("Please enter a message");
            return;
        }

        const message = {
            senderId: id,
            reclamtionId: reclamationId,
            content,
        };
        const json = JSON.stringify(message);
        console.log(json);

        this.socket.emit("message", message);

        this.setState(
            { message: "" },
            () => {
                setTimeout(() => {
                    this.messageContainer.current.scrollTop = this.messageContainer.current.scrollHeight;
                }, 5);
            }
        );

    };

    componentDidMount() {

        fetch('http://127.0.0.1:9092/user/userData', {
            method: 'POST',
            crossDomain: true,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              token: window.localStorage.getItem('token'),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              this.setState({id:data?.data._id,role:data?.data.Role});

              window.localStorage.setItem("userId", data?.data._id)
              window.localStorage.setItem("userRole",data?.data.Role)
            });




            let id= window.localStorage.getItem("userId")
            let role = window.localStorage.getItem("userRole")
            console.log("role",role)
            console.log("id",id)

        if (role == "Admin") {
            fetch(`http://127.0.0.1:9092/reclamation/allReclamations`, {
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
                    this.setState({ reclamations: data });
                    console.log("1")
                })
                .catch(error => console.error(error));
        } else {
            fetch(`http://127.0.0.1:9092/reclamation/getReclamationsByUserId/${id}`, {
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
                    this.setState({ reclamations: data });
                    console.log("2")

                })
                .catch(error => console.error(error));
        }

        // Listen for messages from the server
        this.socket.on("message", (message) => {
            console.log("Received message from server:", message);

            // Add the new message to the messages array in state
            const messages = [...this.state.messages, message];
            this.setState({ messages });
        });
    }


    render() {
        const { selectedReclamation } = this.state;
        const id = window.localStorage.getItem("userId")
        return (
            < div id="wrapper" >
                <NavLeftDashboard />
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <HeaderDashboard />
                        <div className="container-fluid">
                            <h3 className="text-dark mb-4">Reclamation</h3>

                            <div className="card shadow">
                                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                    <p className="text-primary m-0 fw-bold" style={{ primary: '#00a0c4' }}>
                                        <span style={{ fontWeight: 'normal !important', color: 'rgba(var(--bs-dark-rgb)' }}>Reclamation</span>
                                    </p>
                                    <button
                                        className="btn btn-sm reset"
                                        href="#CreateNewTicket"
                                        data-bs-toggle="modal"
                                        type="button"
                                        style={{ color: 'white', backgroundColor: 'rgb(241, 92, 87)', border: 0, paddingLeft: '10px' }}
                                    >
                                        Create New Ticket
                                    </button>

                                    <div id="CreateNewTicket" className="modal fade" role="dialog" tabIndex={-1}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="modal-header">
                                                        <h4>Create New Ticket</h4>
                                                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                                                    </div>
                                                    <div className="modal-body">
                                                        <input className="form-control" value={this.state.objet} onChange={this.handleObjetChange} type="text" placeholder="Objet" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <textarea className="form-control" value={this.state.contenu} onChange={this.handleContenuChange} placeholder="Contenu" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }}></textarea>
                                                        <input className="form-control" value={this.state.stat} onChange={this.handleStatChange} placeholder="Stat" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button className="btn btn-light" type="button" data-bs-dismiss="modal">Cancel</button>
                                                        <button className="btn " type="submit" style={{ backgroundColor: 'rgb(241, 92, 87)', color: 'white' }}>Add</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                            <div className="list-group" style={{ backgroundColor: '#F8F8F8' }}>
                                                {this.state.reclamations.slice().reverse().map(reclamation => (
                                                    <a
                                                        key={reclamation.id}
                                                        className="list-group-item list-group-item-action py-4 text-center"
                                                        href={`#list-${reclamation.id}`}
                                                        data-bs-toggle="list"
                                                        onClick={() => this.handleReclamationClick(reclamation)}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexDirection: 'column',
                                                            textDecoration: reclamation.status === 'closed' ? 'line-through' : 'none'
                                                        }}
                                                    >
                                                        <div style={{
                                                            width: '60px',
                                                            height: '60px',
                                                            backgroundColor: '#ccc',
                                                            borderRadius: '50%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            marginBottom: '10px'
                                                        }}> <i className="typcn typcn-ticket" style={{ fontSize: '32px' }}></i>
                                                        </div>
                                                        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{reclamation.objet}</div>

                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-lg-9" >
                                            {selectedReclamation && (
                                                <div className="card" style={{ width: '100%' }}>
                                                    <div className="card-header">{selectedReclamation.objet}</div>
                                                    <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }} ref={this.messageContainer} >
                                                        {this.state.messages.map(message => (
                                                            <div key={message._id} style={{ display: 'flex', flexDirection: 'column' }}>
                                                                {message.senderId == id ? (
                                                                    <div style={{ backgroundColor: '#D9EDF7', padding: '10px', borderRadius: '10px', maxWidth: '80%', alignSelf: 'flex-end', marginTop: '10px' }}>
                                                                        <p style={{ margin: '0' }}>{message.content}</p>
                                                                    </div>
                                                                ) : (
                                                                    <div style={{ backgroundColor: '#F1F0F0', padding: '10px', margin: '10px', borderRadius: '10px', maxWidth: '80%', alignSelf: 'flex-start' }}>
                                                                        <p style={{ margin: '0' }}>{message.content}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="card-footer">
                                                        <div className="input-group mt-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Type your message"
                                                                aria-label="Type your message"
                                                                aria-describedby="send-button"
                                                                value={this.state.message}
                                                                onChange={e => this.setState({ message: e.target.value })}
                                                                onKeyPress={e => {
                                                                    if (e.key === "Enter") {
                                                                        this.sendMessage(this.state.message);
                                                                    }
                                                                }}
                                                            />
                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                type="button"
                                                                id="send-button"
                                                                style={{ backgroundColor: 'rgb(241, 92, 87)', color: 'white' }}
                                                                onClick={() => this.sendMessage(this.state.message)}
                                                            >
                                                                <i className="typcn typcn-location-arrow"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterDashboard />
                </div>
            </div>

        );
    }
}

export default Ticket;
