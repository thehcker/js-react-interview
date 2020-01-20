import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../redux/actions/users';
import UserThumbnail from '../user-thumbnail/UserThumbnail';
import UserEdit from '../user-edit/UserEdit'


class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        this.props.getUsers();
    }
    renderTableBody() {
        return this.props.users.map(user => {
            return <UserThumbnail user={ user } key={ user.id } />
        })
    }
    render() { 
        return ( 
            <div>
                <UserEdit />
                <h3 className="my-5">Users Table</h3>
                <table id="userTable" className="table">
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
         );
    }
}
UserList.propTypes = {
    users: PropTypes.array.isRequired,
    getUsers: PropTypes.func.isRequired,
}
const mapStateToProps = (state) =>({
    users: state.users.userList,
})
export default connect(mapStateToProps, {getUsers})(UserList);