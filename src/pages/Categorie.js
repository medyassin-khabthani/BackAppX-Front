import React, { Component } from 'react';

import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            name: "",
            description: "",
            reference: "",
            image: "",
            id: "",
            idCategoryEdit: "",
            nameEdit: "test",
            priceEdit: "",
            selectedOption: 'Select an option',
            dropdownOpen: false,
            isDialogOpen: false,

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleReferenceChange = this.handleReferenceChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);


    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleReferenceChange(event) {
        this.setState({ reference: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleImageChange(event) {
        this.setState({ image: event.target.files[0] });
    }

    // handleImageChange(event) {
    //     // this.setState({ image: event.target.files[0] });
    //     console.log(event.target.files[0])
    // }

    handleOptionSelect = (option) => {
        this.setState({
            selectedOption: option,
            dropdownOpen: false,
        });
    };

    toggleDropdown = () => {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen,
        }));
    };

    async handleSubmit(event) {
        event.preventDefault();

        const projectId = localStorage.getItem('projectId');

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('reference', this.state.reference);
        formData.append('image', this.state.image);
        formData.append('project', projectId)

        try {
            const response = await fetch('http://127.0.0.1:9092/category/category', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            alert('category Added  !');
            window.location.href = "./categorie"
            // TODO: Handle successful form submission
        } catch (error) {
            console.error(error);
            this.setState({ errorMessage: 'Error uploading product. Please try again later.' });
        }
    }

    handleUpdate(e) {
        e.preventDefault();
        const { idCategoryEdit, nameEdit, priceEdit } = this.state;
        if (this.validateEdit()) {
            let name = nameEdit;
            let price = priceEdit;
            fetch(`http://127.0.0.1:9092/category/category/${idCategoryEdit}`, {
                method: "PATCH",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    name,
                    price,

                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    window.location.href = "./categorie"

                })
        }
    }

    handleCloseDialog = () => {
        this.setState({ isDialogOpen: false });
    }

    handleDeleteCategory = async (categoryId) => {
        const response = await fetch(`http://localhost:9092/category/category/${categoryId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('category Deleted !');
            this.setState(prevState => ({
                categories: prevState.categories.filter(category => category._id !== categoryId)
            }));
        }
    }

    componentDidMount() {
        const projectId = localStorage.getItem('projectId');
        fetch(`http://127.0.0.1:9092/category/getAllCategoriesByProject/${projectId}`, {
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
                this.setState({ categories: data.categories });
                console.log(data.categories);
            })
            .catch(error => console.error(error));
    }

    handleCloseDialog = () => {
        this.setState({ isDialogOpen: false });
    }

    render() {
        const { categories } = this.state;

        const { selectedOption, dropdownOpen } = this.state;

        return (

            <div id="wrapper">
                <NavLeftDashboard />
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <HeaderDashboard />
                        <div className="container-fluid">
                            <h3 className="text-dark mb-4">E-commerce</h3>
                            <div className="card shadow">
                                <div className="card-header py-3">
                                    <div className="row table-topper align-items-center">
                                        <div className="col-12 col-sm-5 col-md-6 text-start" style={{ margin: '0px', padding: '5px 15px' }}>
                                            <p className="text-primary m-0 fw-bold" style={{ bsprimary: '#00a0c4', bsprimaryrgb: '0,160,196' }}><span style={{ fontweight: 'normal !important', color: 'rgba(var(--bs-dark-rgb), var(--bs-text-opacity))' }}>Categorie</span></p>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-6 text-end" style={{ margin: '0px', padding: '5px 15px' }}>Total Categories: {categories.length}<button className="btn btn-sm reset" href="#addproduct" data-bs-toggle="modal" type="button" style={{ marginLeft: '15px', color: 'white', backgroundColor: 'rgb(241, 92, 87)', border: 0 }}>Add Categorie</button></div>
                                    </div>
                                </div>
                                <div>
                                    <div id="addproduct" className="modal fade" role="dialog" tabIndex={-1}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="modal-header">
                                                        <h4 >Add Categorie</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                                                    </div>
                                                    <div className="modal-body">
                                                        <input className="form-control" value={this.state.name} onChange={this.handleNameChange} type="text" placeholder="Name" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.reference} onChange={this.handleReferenceChange} placeholder="Reference" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input type="file" accept="image/*" onChange={this.handleImageChange} />

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
                                <div>
                                    <div id="editproduct" className="modal fade" role="dialog" tabIndex={-1}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <form onSubmit={this.handleUpdate}>
                                                    <div className="modal-header">
                                                        <h4 >Edit Categorie</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                                                    </div>
                                                    <div className="modal-body">
                                                        <input className="form-control" value={this.state.nameEdit} onChange={(e) => this.setState({ nameEdit: e.target.value })} type="text" placeholder="name" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.priceEdit} onChange={(e) => this.setState({ priceEdit: e.target.value })} placeholder="price" style={{ paddingTop: '12px', paddingBottom: '12px' }} defaultValue={""} />
                                                        <div className="dropdown-container" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px', display: 'flex', alignItems: 'center' }} >
                                                            <span>Categories : </span>
                                                            <div className="dropdown" style={{ paddingLeft: '10px' }} >
                                                                <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" onClick={this.toggleDropdown} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ paddingLeft: '10px', color: 'White' }}>
                                                                    {selectedOption}
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                                                                    <button className="dropdown-item" onClick={() => this.handleOptionSelect('Option 1')}>Option 1</button>
                                                                    <button className="dropdown-item" onClick={() => this.handleOptionSelect('Option 2')}>Option 2</button>
                                                                    <button className="dropdown-item" onClick={() => this.handleOptionSelect('Option 3')}>Option 3</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button className="btn btn-light" type="button" data-bs-dismiss="modal">Cancel</button>
                                                        <button className="btn " type="submit" style={{ backgroundColor: 'rgb(241, 92, 87)', color: 'white' }}>Update</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-xxl-12">
                                        <div className="table-responsive">
                                            <table className="table table-striped table tablesorter" id="ipi-table">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        {/* <th className="text-center text-bg-primary">Id</th> */}
                                                        <th className="text-center text-bg-primary">Image</th>
                                                        <th className="text-center text-bg-primary">Name</th>
                                                        <th className="text-center text-bg-primary">Description</th>
                                                        <th className="text-center text-bg-primary">Reference</th>
                                                        <th className="text-center text-bg-primary filter-false sorter-false">Action</th>
                                                    </tr>
                                                </thead>
                                                {categories.map(categorie => (
                                                    <tbody className="text-center">
                                                        <tr>
                                                            {/* <td className="text-center align-middle">{product._id}</td> */}
                                                            {/* <td className="text-center align-middle">{product.image}</td> */}
                                                            {categorie.image ? (
                                                                <td><img className="" width="60" height="60" src={categorie.image.url} alt={categorie.name} /></td>
                                                            ) : (
                                                                <td><img className="" width="60" height="60" src="/path/to/default/image.jpg" alt="" /></td>
                                                            )}
                                                            <td className="text-center align-middle">{categorie.name}</td>
                                                            <td className="text-center align-middle">{categorie.description}</td>
                                                            <td className="text-center align-middle">{categorie.reference}</td>
                                                            <td className="text-center align-middle" style={{ maxHeight: '60px', height: '60px' }}><a className="btn btnMaterial btn-flat success semicircle" onClick={() => this.handleUpdate(categorie)} role="button" href="#editproduct" data-bs-toggle="modal" ><i className="fas fa-pen" style={{ color: '#4e73df' }} /></a><a className="btn btnMaterial btn-flat accent btnNoBorders checkboxHover" role="button" style={{ marginLeft: '5px' }} data-bs-toggle="modal" onClick={() => this.handleDeleteCategory(categorie._id)} data-bs-target="#delete-modal" href="#"><i className="fas fa-trash btnNoBorders" style={{ color: '#DC3545' }} /></a></td>
                                                        </tr>
                                                    </tbody>

                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterDashboard />

                </div>

            </div>


        )
    }
}
export default Categories;