import React, { Component } from 'react'

const playerToLevel = {
    2: 1,
    4: 2,
    8: 4,
    16: 5,
    32: 6,
    64: 7,
    128: 8,
}
class Column extends Component {
    state = {
        users: this.props.users,
        slotSize: this.props.slotSize,
    }

    clickedUser(user) {
        this.props.handleUpdate(user)
    }

    getItems() {
        const { users, slotSize } = this.state;
        let items = []
        for (let index = 0; index < slotSize; index++) {
            items.push(<input
                onClick={() => this.clickedUser(users[index])}
                key={index}
                value={users[index].userName} />)
        }
        return items;
    }
    render() {
        // const { users } = this.state;
        // const usersItems = users.map((link) =>
        //     <input key={link.id} value={link.userName} />
        // );
        return (
            <div className="column">
                {this.getItems()}
            </div>
        );
    }
}

export default Column;