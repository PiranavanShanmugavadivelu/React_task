import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import imageCompression from 'browser-image-compression';
import DatePicker from 'react-datepicker';
class UserPage extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [
                {
                    first_name: 'Piranavan',
                    last_name: 'Shan',
                    address: 'Jaffna',
                    contact: 'aa',
                    dob: '02/06/1996',
                    email: 'shan@gmail.com',
                    image: null,
                    image_url: "https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                }
            ],
            first_name: null,
            last_name: null,
            address: null,
            contact: null,
            dob: null,
            email: null,
            image: null,
            image_url: null,
            selected_user: null,
        }
    }

    //for handle text field change
    handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        this.setState({
            [name]: value
        })
    }

    //handle the file input and compression of image
    handleImageChange = (event) => {
        this.setState({
            image_url: URL.createObjectURL(event.target.files[0]) // set the preview image URL
        })
        let imageFile = event.target.files[0];
        let options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        imageCompression(imageFile, options)
            .then(compressedFile => {
                this.setState({
                    image: compressedFile,
                })
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    //handle date picker
    handleDateChange = (date) => {
        console.log(date)
        this.setState({
            dob: new Date(date).toLocaleDateString(),
        })
    }

    //Submit button 
    submit = (event) => {
        console.log(this.state)

        event.preventDefault();

        if (this.state.selected_user) {
            //for edit
            let index = this.state.users.indexOf(this.state.selected_user)
            this.state.users.splice(index, 1, {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                address: this.state.address,
                contact: this.state.contact,
                dob: this.state.dob,
                email: this.state.email,
                image: this.state.image,
                image_url: this.state.image_url
            })
            this.setState({
                users: this.state.users,
                selected_user: null,
            })

        } else {
            // for add
            this.setState({
                users: [
                    ...this.state.users,
                    {
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        address: this.state.address,
                        contact: this.state.contact,
                        dob: this.state.dob,
                        email: this.state.email,
                        image: this.state.image,
                        image_url: this.state.image_url
                    }
                ],

            })
        }

        this.clearField()
    }

    //clear text fields
    clearField = () => {
        this.setState({
            first_name: '',
            last_name: '',
            address: '',
            contact: '',
            dob: null,
            email: '',
            image: '',
            image_url: '',
            selected_user: '',
        })
    }

    //edit array values
    edit = (user) => {
        this.setState({
            selected_user: user,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            contact: user.contact,
            dob: user.dob,
            email: user.email,
            image: user.image,
            image_url: user.image_url
        })

    }

    //delete array values
    delete = (user) => {
        let index = this.state.users.indexOf(user)
        this.state.users.splice(index, 1)
        this.setState({
            users: this.state.users
        })
    }


    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12">
                        <p className="h4 text-center mb-4">Add Details</p>
                        <form>
                            <MDBRow>
                                <MDBCol md="6">
                                    <input type="text" id="defaultFormContactNameEx" className="form-control" value={this.state.first_name} onChange={this.handleChange} placeholder='First name' name='first_name' />
                                    <br />
                                    <input type="text" id="defaultFormContactNameEx" className="form-control" value={this.state.address} onChange={this.handleChange} placeholder='Address' name='address' />
                                    <br />
                                    <div style={{ width: '120px' }}>
                                        <DatePicker
                                            className="form-control"
                                            selected={this.state.dob === null ? null : new Date(this.state.dob)}
                                            onChange={date => this.handleDateChange(date)}
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            dateFormat="yyyy/MM/dd"
                                            maxDate={Date.now()}
                                            placeholderText="Date of Birth"
                                        />
                                    </div>
                                    <br />
                                    <input type="file" id="defaultFormContactNameEx" className="form-control" onChange={this.handleImageChange} placeholder='Image' name='image' />
                                    <br />
                                </MDBCol>
                                <MDBCol md="6">
                                    <input type="text" id="defaultFormContactNameEx" className="form-control" value={this.state.last_name} onChange={this.handleChange} placeholder='Last name' name='last_name' />
                                    <br />
                                    <input type="text" id="defaultFormContactNameEx" className="form-control" value={this.state.contact} onChange={this.handleChange} placeholder='Contact' name='contact' />
                                    <br />
                                    <input type="email" id="defaultFormContactNameEx" className="form-control" value={this.state.email} onChange={this.handleChange} placeholder='Email' name='email' />
                                    <br />
                                </MDBCol>
                            </MDBRow>
                            <div className="text-center mt-4">
                                <MDBBtn color="primary" onClick={() => this.clearField()} >
                                    Clear
                                </MDBBtn>
                                <MDBBtn color="success" onClick={this.submit} >
                                    {this.state.selected_user ? "Edit" : "Add"}
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
                <MDBTable>
                    <MDBTableHead color="primary-color" textWhite>
                        <tr>
                            <th>Image</th>
                            <th>First name </th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.users.map(user =>
                            <tr>
                                <img style={{ height: '40px', width: '40px', margin: '5px' }}
                                    src={user.image_url}
                                    alt=""
                                    className="rounded-circle img-fluid"
                                />
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.address}</td>
                                <td>{user.contact}</td>
                                <td>{user.dob}</td>
                                <td>{user.email}</td>
                                <td>
                                    <MDBBtn color="primary" onClick={() => this.edit(user)} >
                                        Edit
                                </MDBBtn>
                                </td>
                                <td>
                                    <MDBBtn color="primary" onClick={() => this.delete(user)} >
                                        Delete
                                </MDBBtn>
                                </td>
                            </tr>
                        )}
                    </MDBTableBody>
                </MDBTable>
            </MDBContainer>
        )
    }
}
export default UserPage;