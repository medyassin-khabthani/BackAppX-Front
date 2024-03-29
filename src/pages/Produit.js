import React, { Component } from 'react';

import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            selectedOption: "Select Category",
            selectedOptionEdit: "Select Category Edit",
            name: "",
            category: "",
            description: "",
            quantity: "",
            reference: "",
            price: "",
            image: null,
            id: "",
            categoryId: "",
            idProductEdit: "",
            nameEdit: "",
            categoryEdit: "",
            descriptionEdit: "",
            quantityEdit: "",
            referenceEdit: "",
            categoryIdEdit:"",
            priceEdit: "",
            imageEdit: null,
            imageUrl: "",
            imageEditUrl: "",
            dropdownOpen: false,
            isDialogOpen: false,

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCategorieChange = this.handleCategorieChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleReferenceChange = this.handleReferenceChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);


    }

    handleCategorieChange(event) {
        this.setState({ categories: event.target.value });
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handlePriceChange(event) {
        this.setState({ price: event.target.value });
    }

    handleReferenceChange(event) {
        this.setState({ reference: event.target.value });
    }

    handleQuantityChange(event) {
        this.setState({ quantity: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleImageChange(event) {
        this.setState({ image: event.target.files[0] });
    }

    handleOptionSelect = (name, categoryId) => {
        console.log('Selected category:', name, categoryId);
        this.setState({
            selectedOption: name,
            categoryId: categoryId
        });
        this.setState({
            selectedOptionEdit: name,
            categoryIdEdit: categoryId
        });
    };

    toggleDropdown = () => {
        this.setState((prevState) => ({
            showDropdown: !prevState.showDropdown,
        }));
    };

    handleEditProduct = (product) => {
        this.setState({
            editProduct: true,
            idEdit: product._id,
            nameEdit: product.name,
            descriptionEdit: product.description,
            priceEdit: product.price,
            referenceEdit: product.reference,
            quantityEdit: product.quantity,
            selectedOptionEdit: product.categoryName,
            imageEdit: product.image,
        });
        console.log(product)

    };

    // handleSubmit(event) {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append('name', this.state.name);
    //     formData.append('price', this.state.price);
    //     formData.append('reference', this.state.reference);
    //     formData.append('quantity', this.state.quantity);
    //     formData.append('description', this.state.description);
    //     formData.append('category', this.state.selectedOption.value);
    //     formData.append('image', this.state.image);
    //     console.log(this.state.image)

    //     // make API call to create new product
    //     fetch('http://127.0.0.1:9092/product/product', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: formData
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             alert('product Added !');
    //             window.location.href = "./Produit"

    //         })
    //         .catch(error => console.error(error));
    // }

    async handleSubmit(event) {
        event.preventDefault();

        const { name, description, image } = this.state;
        const projectId = localStorage.getItem('projectId');

        if (!name || !description || !image) {
            this.setState({ errorMessage: 'Please enter a name, description, and image.' });
            return;
        }

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('price', this.state.price);
        formData.append('reference', this.state.reference);
        formData.append('quantity', this.state.quantity);
        formData.append('description', this.state.description);
        formData.append('category', this.state.categoryId);
        console.log(this.state.categoryId)
        formData.append('image', this.state.image);
        formData.append('project', projectId)
        console.log(formData)

        try {
            const response = await fetch('http://127.0.0.1:9092/product/product', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            alert('product Added !');
            window.location.href = "./Produit"
            // TODO: Handle successful form submission
        } catch (error) {
            console.error(error);
            this.setState({ errorMessage: 'Error uploading product. Please try again later.' });
        }
    }

    async handleUpdate(event) {
        event.preventDefault();
        const { idEdit, nameEdit, selectedOptionEdit, descriptionEdit, priceEdit, referenceEdit, quantityEdit, categoryIdEdit } = this.state;
    
    
        let name=nameEdit;
        let description=descriptionEdit;
        let price=priceEdit;
        let reference=referenceEdit;
        let quantity = quantityEdit;
        let category=categoryIdEdit;
    
        fetch(`http://127.0.0.1:9092/product/updateProduct/${idEdit}`,{
            method:"PUT",
            crossDomain:true,
            headers:{
              "Content-Type":"application/json",
              Accept:"application/json",
              "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                name,
                description,
                price,
                reference,
                quantity,
                category
            }),
          })
          .then((res) => res.json())
          .then((data) => {
            if (data?.status == "updated"){
              if (this.state.image!=null){
                this.uploadImage(idEdit)
              }
              this.setState({alertText:"produit modifié avec succées.",showAlert:true,alertColor:"alert-success"})
              setTimeout(() => {
                alert('product updated !');

                window.location.href="./produit"
              }, 2000);
             }
            
        
          });
    }
    
        

    handleImageUpload = e => {
        this.setState({image:e.target.files[0]})
    
        console.log(this.state.image)
    
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({imageUrl:reader.result})
        };
    
        reader.readAsDataURL(e.target.files[0]);
        this.setState({showImage:true})
      };

    handleCloseDialog = () => {
        this.setState({ isDialogOpen: false });
    }

    handleDeleteProduct = async (productId) => {
        const response = await fetch(`http://localhost:9092/product/product/${productId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('product Deleted !');
            this.setState(prevState => ({
                products: prevState.products.filter(product => product._id !== productId)
            }));
        }
    }


    componentDidMount() {
        const projectId = localStorage.getItem('projectId');
        fetch(`http://127.0.0.1:9092/product/getAllProductsByProject/${projectId}`, {
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
                this.setState({ products: data.products });
            })
            .catch(error => console.error(error));

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
            })
            .catch(error => console.error(error));
    }

    handleCloseDialog = () => {
        this.setState({ isDialogOpen: false });
    }

    render() {
        const { products } = this.state;

        const { selectedOption, categories } = this.state;
        const { selectOption } = this.state;

        const { imageUrl } = this.state;
        const productsWithCategoryNames = products.map((product) => {
            const category = categories.find((cat) => cat._id === product.category);
            const categoryName = category ? category.name : "";
            return { ...product, categoryName };
        });

        return (

            < div id="wrapper" >
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
                                            <p className="text-primary m-0 fw-bold" style={{ bsprimary: '#00a0c4', bsprimaryrgb: '0,160,196' }}><span style={{ fontweight: 'normal !important', color: 'rgba(var(--bs-dark-rgb), var(--bs-text-opacity))' }}>Product</span></p>
                                        </div>
                                        <div className="col-12 col-sm-7 col-md-6 text-end" style={{ margin: '0px', padding: '5px 15px' }}>Total Products: {products.length} <button className="btn btn-sm reset" href="#addproduct" data-bs-toggle="modal" type="button" style={{ marginLeft: '15px', color: 'white', backgroundColor: 'rgb(241, 92, 87)', border: 0, paddingLeft: '10px' }}>Add Product</button></div>
                                    </div>
                                </div>
                                <div>
                                    <div id="addproduct" className="modal fade" role="dialog" tabIndex={-1}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                                    <div className="modal-header">
                                                        <h4 >Add Product</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                                                    </div>
                                                    <div className="modal-body">
                                                        <input className="form-control" value={this.state.name} onChange={this.handleNameChange} type="text" placeholder="Name" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.price} onChange={this.handlePriceChange} placeholder="Price" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.reference} onChange={this.handleReferenceChange} placeholder="Reference" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.quantity} onChange={this.handleQuantityChange} placeholder="Quantity" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input type="file" accept="image/*" onChange={this.handleImageChange} />
                                                        <div className="dropdown-container" style={{ marginBottom: "20px", paddingTop: "12px", paddingBottom: "12px", display: "flex", alignItems: "center", }}>
                                                            <span>Categories: </span>
                                                            <div className="dropdown" style={{ paddingLeft: "10px" }}>
                                                                <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" onClick={this.toggleDropdown} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ paddingLeft: "10px", color: "white" }}>
                                                                    {selectedOption}
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    {categories.map((category) => (
                                                                        <button className="dropdown-item" key={category._id} onClick={() => this.handleOptionSelect(category.name, category._id)} type="button">
                                                                            {category.name}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                <form onSubmit={this.handleUpdate} encType="multipart/form-data">
                                                    <div className="modal-header">
                                                        <h4 >Edit Product</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                                                    </div>
                                                    <div className="modal-body">
                                                        <input className="form-control" value={this.state.nameEdit} onChange={(e) => this.setState({ nameEdit: e.target.value })} type="text" placeholder="name" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.descriptionEdit} onChange={(e) => this.setState({ descriptionEdit: e.target.value })} placeholder="Description" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.priceEdit} onChange={(e) => this.setState({ priceEdit: e.target.value })} placeholder="Price" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.referenceEdit} onChange={(e) => this.setState({ referenceEdit: e.target.value })} placeholder="Reference" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input className="form-control" value={this.state.quantityEdit} onChange={(e) => this.setState({ quantityEdit: e.target.value })} placeholder="Quantity" style={{ marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px' }} />
                                                        <input type="file" accept="image/*" onChange={this.handleImageChange}  onChange={(e) => this.setState({ imageEdit: e.target.files[0] })} />

                                                        <div className="dropdown-container" style={{ marginBottom: "20px", paddingTop: "12px", paddingBottom: "12px", display: "flex", alignItems: "center", }}>
                                                            <span>Categories: </span>
                                                            <div className="dropdown" style={{ paddingLeft: "10px" }}>
                                                            <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" onClick={this.toggleDropdown} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ paddingLeft: "10px", color: "white" }}>
                                                                    {this.state.selectedOptionEdit}
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    {categories.map((category) => (
                                                                        <button className="dropdown-item" key={category._id} onClick={() => this.handleOptionSelect(category.name, category._id)} type="button">
                                                                            {category.name}
                                                                        </button>
                                                                    ))}
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
                                                        <th className="text-center text-bg-primary">Image</th>
                                                        <th className="text-center text-bg-primary">Name</th>
                                                        <th className="text-center text-bg-primary">Category</th>
                                                        <th className="text-center text-bg-primary">Description</th>
                                                        <th className="text-center text-bg-primary">Price</th>
                                                        <th className="text-center text-bg-primary">Quantity</th>
                                                        <th className="text-center text-bg-primary">Reference</th>
                                                        <th className="text-center text-bg-primary filter-false sorter-false">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-center">
                                                    {productsWithCategoryNames.map(product => (
                                                        <tr key={product._id}>
                                                            {product.image ? (
                                                                <td><img className="" width="60" height="60" src={product.image.url} alt={product.name} /></td>
                                                            ) : (
                                                                <td><img className="" width="60" height="60" src="/path/to/default/image.jpg" alt="" /></td>
                                                            )}
                                                            <td className="text-center align-middle">{product.name}</td>
                                                            <td className="text-center align-middle">{product.categoryName}</td>
                                                            <td className="text-center align-middle">{product.description}</td>
                                                            <td className="text-center align-middle">{product.price} DT</td>
                                                            <td className="text-center align-middle">{product.quantity}</td>
                                                            <td className="text-center align-middle">{product.reference}</td>
                                                            <td className="text-center align-middle" style={{ maxHeight: '60px', height: '60px' }}>
                                                                <a className="btn btnMaterial btn-flat success semicircle" onClick={() => this.handleEditProduct(product)} role="button" href="#editproduct" data-bs-toggle="modal">
                                                                    <i className="fas fa-pen" style={{ color: '#4e73df' }} />
                                                                </a>
                                                                <a className="btn btnMaterial btn-flat accent btnNoBorders checkboxHover" role="button" style={{ marginLeft: '5px' }} data-bs-toggle="modal" onClick={() => this.handleDeleteProduct(product._id)} data-bs-target="#delete-modal" href="#">
                                                                    <i className="fas fa-trash btnNoBorders" style={{ color: '#DC3545' }} />
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterDashboard />

                </div>

            </div >


        )
    }
}
export default Products;
