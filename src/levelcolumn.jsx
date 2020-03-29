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
        level: this.props.level,
    }

    clickedUser(user) {
        if (user)
            this.props.handleUpdate(user.id, this.state.slotSize)
    }

    getUpper() {
        const { users, slotSize, level } = this.state;
        // tuhain tire t oroh usersiig shuuj avah
        const filteredUser = Object.keys(users).filter(key => {
            return typeof users[key].level[level] !== "undefined";
        });
        // console.log("filteredUser ", filteredUser);

        let items = [];
        for (let index = 0; index < slotSize; index++) {
            const currenUser = filteredUser.filter(key => {
                return users[key].seq[level] === (index + 1) && users[key].side[level] === 1;
            });
            items.push(<div
                onClick={() => this.clickedUser(users[currenUser[0]])}
                type="text"
                key={index}
                className="node">
                {typeof users[currenUser[0]] !== "undefined" ? users[currenUser[0]].userName : ""}
            </div>)
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
                {this.getUpper()}
            </div>
        );
    }
}

export default Column;