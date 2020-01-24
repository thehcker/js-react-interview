import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../redux/actions/users';
import UserThumbnail from '../user-thumbnail/UserThumbnail';
import UserEdit from '../user-edit/UserEdit';


class UserList extends Component {
    
    componentDidMount(){
        this.props.getUsers();
    }

    componentDidUpdate(prevProps){
        if (this.props !== prevProps){
            if(this.props.userEdited !== prevProps.userEdited){
                if(this.props.userEdited){
                    this.props.getUsers();
                }
            }
        }
    }

    renderTableBody() {
        return this.props.users.map(user => {
            return <UserThumbnail user={ user } key={ user.id } />
        });
    }

    render() { 
        return ( 
            <div>
                <UserEdit />
                <div className="container-fluid">
                    <div style={{display: 'none'}} id="message" className="alert alert-success"></div>
                    <h3 className="my-5">Users Table</h3>
                    <table className="table">
                    <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Occupation</th>
                                <th>Email</th>
                                <th>Bio</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderTableBody() }
                        </tbody>
                    </table>
                </div>
                
            </div>
         );
    }
}
UserList.propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired,
    userEdited: PropTypes.bool.isRequired
}
const mapStateToProps = (state) =>({
    users: state.users.userList,
    userEdited: state.users.userEdited
});
export default connect(mapStateToProps, {getUsers})(UserList);