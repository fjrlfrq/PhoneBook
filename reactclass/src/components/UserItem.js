import React, { Component } from "react"

export default class UserItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.user.name,
            phone: props.user.phone,
            isEdit: false
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleEdit = () => {
        this.setState({
            isEdit: true
        })
    }

    handleCancel = () => {
        this.setState({
            isEdit: false
        })
    }
    
    saveEdit = () => {
        this.props.update(
            this.state.name,
            this.state.phone
        )
        this.setState({
            isEdit: false
        })
    }
    cancelHandleModalShowHide() {
        this.setState({
            showHide: false
        })
    }

    render() {
        return (
            <tr>
                <td>{this.props.no}</td>
                <td>
                    {this.state.isEdit ?
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={this.state.name}
                            placeholder="Masukkan nama"
                            onChange={this.handleInputChange}
                        /> 
                        :
                        this.state.name
                    }
                </td>
                <td>
                    {this.state.isEdit ?
                        <input
                            className="form-control"
                            type="text"
                            name="phone"
                            value={this.state.phone}
                            placeholder="Masukkan nomor"
                            onChange={this.handleInputChange}
                        /> 
                        :
                        this.state.phone
                        
                    }
                </td>
                {this.props.user.sent ?
                    this.state.isEdit ?
                        <td>
                            <button type="button" className="btn btn-info" onClick={this.saveEdit}><i className="bi bi-download"></i>Save</button>
                            <button type="button" className="btn btn-warning" onClick={this.handleCancel}><i className="bi bi-x"></i>Cancel</button>
                        </td>
                        :
                        <td>
                            <button type="button" className="btn btn-success" onClick={this.handleEdit}><i className="bi bi-pencil"></i>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={this.props.remove}><i className="bi bi-trash"></i>Delete</button>
                        </td>
                    :
                    <td>
                        <button type="button" className="btn btn-warning" onClick={this.props.resend}><i className="bi bi-send"></i>Resend</button>
                    </td>
                }
            </tr>
            
        )
    }
}