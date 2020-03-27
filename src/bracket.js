import React, { Component } from 'react';
import Column from "./levelcolumn";

const playerToLevel = {
    2: 1,
    4: 2,
    8: 4,
    16: 5,
    32: 6,
    64: 7,
    128: 8,
}
class Bracket extends Component {
    state = {
        userCount: 16,
        users: [
            { id: 1, userName: "user 1", side: 1, level: 5, seq: 1 },
            { id: 2, userName: "user 2", side: 1, level: 5, seq: 1 },
            { id: 3, userName: "user 3", side: 1, level: 5, seq: 1 },
            { id: 4, userName: "user 4", side: 1, level: 5, seq: 1 },
            { id: 5, userName: "user 5", side: 1, level: 5, seq: 1 },
            { id: 6, userName: "user 6", side: 1, level: 5, seq: 1 },
            { id: 7, userName: "user 7", side: 1, level: 5, seq: 1 },
            { id: 8, userName: "user 8", side: 1, level: 5, seq: 1 },
            { id: 9, userName: "user 9", side: 1, level: 5, seq: 1 },
            { id: 10, userName: "user 10", side: 1, level: 5, seq: 1 },
            { id: 11, userName: "user 11", side: 1, level: 5, seq: 1 },
            { id: 12, userName: "user 12", side: 1, level: 5, seq: 1 },
            { id: 13, userName: "user 13", side: 1, level: 5, seq: 1 },
            { id: 14, userName: "user 14", side: 1, level: 5, seq: 1 },
            { id: 15, userName: "user 15", side: 1, level: 5, seq: 1 },
            { id: 16, userName: "user 16", side: 1, level: 5, seq: 1 },
        ]
    }

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(users => this.setState({ users }))
    // }

    updateUser(user) {
        console.log("updateUser", user);
    }

    getColumns() {
        let columnCount = playerToLevel[this.state.userCount];
        let columns = []
        const { users } = this.state;
        let slotsize = 16;
        for (let index = 0; index < columnCount; index++) {
            columns.push(<Column key={index} users={users} slotSize={slotsize} handleUpdate={(user) => this.updateUser(user)} />)
            slotsize = slotsize / 2;
            console.log(slotsize);
        }

        return columns;
    }

    render() {
        return (
            <div>
                <h1>Bracket</h1>
                <div className="columns">
                    {this.getColumns()}
                </div>
            </div>
        );
    }
}

export default Bracket;