import React, { Component } from 'react';
import './UserEdit.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleEditMode, editUser } from '../../redux//actions/users'

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Isaac", //this.props.currentUser.name,
            occupation: "Doctor", //this.props.currentUser.occupation,
            email: "izo@gmail.com", //this.props.currentUser.email,
            bio: "I am a sofware dev" //this.props.currentUser.bio
        }
        console.log(this.state)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editUser(this.state)
        console.log(this.state)
    }
    hideModal = () => {
        const element = document.querySelector(".modal");
        element.style.display = "none";
        this.props.toggleEditMode();
    }
    updateField = (event, fieldName)=> {
        const val = event.target.value
        this.setState({
            fieldName: val
        })
    }
    render() { 
        console.log(this.props.editMode)
        
        return (
            <div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit User</h5>
                            <h5 className="success modal-title mx-3">{this.props.userEdited?"Success": ""}</h5>
                        <button type="button" onClick={() => this.hideModal()} className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={this.state.name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="occupation">Occupation</label>
                                <input type="text" className="form-control" id="occupation" value={this.state.occupation} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">User Bio</label>
                                <textarea className="form-control" id="bio" value={this.state.bio}></textarea>
                            </div>
                            <button onClick={(e) => {this.handleSubmit(e)}} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
UserEdit.propTypes = {
    editMode: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
    toggleEditMode: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    currentUser: state.users.currentUser,
    editMode: state.users.editMode,
    userEdited: state.users.userEdited
})
export default connect(mapStateToProps, {toggleEditMode, editUser})(UserEdit);