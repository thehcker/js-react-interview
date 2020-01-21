import React, { Component } from 'react';
import { connect } from 'react-redux';
import {toggleEditMode, setCurrentUser, resetUserEdited} from '../../redux/actions/users'; 

class UserThumbnail extends Component {
    editUser = () => {
        this.props.setCurrentUser(this.props.user);
        this.props.toggleEditMode();
        this.props.resetUserEdited();
        this.showModal();
    }
    showModal = () => {
        const element = document.querySelector(".modal");
        element.style.display = "block";
    }
    render() { 
        return (
        <tr>
            <td>{this.props.user.id}</td>
            <td>{this.props.user.name}</td>
            <td>{this.props.user.occupation}</td>
            <td>{this.props.user.email}</td>
            <td>{this.props.user.bio}</td>
            <td>{this.props.user.created_at}</td>
            <td>{this.props.user.updated_at}</td>
            <td><button onClick={() => this.editUser()} className="userEdit btn btn-primary">Edit</button></td>
        </tr>
        );
    }
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps, {toggleEditMode, setCurrentUser, resetUserEdited})(UserThumbnail);