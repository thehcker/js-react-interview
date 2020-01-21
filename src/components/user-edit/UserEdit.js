import React, { Component } from 'react';
import './UserEdit.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleEditMode, editUser } from '../../redux//actions/users';

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            occupation: "",
            email: "",
            bio: ""
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.currentUser !== prevProps.currentUser) {
            this.setState({
                name: this.props.currentUser.name,
                occupation: this.props.currentUser.occupation,
                email: this.props.currentUser.email,
                bio: this.props.currentUser.bio
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userData = JSON.stringify({user: this.state});
        this.props.editUser(userData, this.props.currentUser.id);
        this.hideModal();
    }

    hideModal = () => {
        const element = document.querySelector(".modal");
        element.style.display = "none";
        this.props.toggleEditMode();
    }

    render() { 
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
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name"
                                    value={this.state.name} 
                                    onChange={e => this.setState({ name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="occupation">Occupation</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="occupation" 
                                    value={this.state.occupation} 
                                    onChange={e => this.setState({ occupation: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    value={this.state.email} 
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">User Bio</label>
                                <textarea 
                                    className="form-control" 
                                    id="bio" 
                                    value={this.state.bio}
                                    onChange={e => this.setState({ bio: e.target.value })}
                                ></textarea>
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
});
export default connect(mapStateToProps, {toggleEditMode, editUser})(UserEdit);