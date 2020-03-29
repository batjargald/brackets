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

const UPPER = 1;
const LOWER = 0;
class Bracket extends Component {
    state = {
        userCount: 16,
        users: {
            1: { id: 1, userName: "user 1", competitor: [2], side: [UPPER, UPPER], level: [4, 5], seq: [1, 1] },
            2: { id: 2, userName: "user 2", competitor: [1], side: [UPPER], level: [5], seq: [2] },
            3: { id: 3, userName: "user 3", competitor: [4], side: [UPPER], level: [5], seq: [3] },
            4: { id: 4, userName: "user 4", competitor: [3], side: [UPPER], level: [5], seq: [4] },
            5: { id: 5, userName: "user 5", competitor: [6], side: [UPPER], level: [5], seq: [5] },
            6: { id: 6, userName: "user 6", competitor: [5], side: [UPPER], level: [5], seq: [6] },
            7: { id: 7, userName: "user 7", competitor: [8], side: [UPPER], level: [5], seq: [7] },
            8: { id: 8, userName: "user 8", competitor: [7], side: [UPPER], level: [5], seq: [8] },
            9: { id: 9, userName: "user 9", competitor: [10], side: [UPPER], level: [5], seq: [9] },
            10: { id: 10, userName: "user 10", competitor: [9], side: [UPPER], level: [5], seq: [10] },
            11: { id: 11, userName: "user 11", competitor: [12], side: [UPPER], level: [5], seq: [11] },
            12: { id: 12, userName: "user 12", competitor: [11], side: [UPPER], level: [5], seq: [12] },
            13: { id: 13, userName: "user 13", competitor: [14], side: [UPPER], level: [5], seq: [13] },
            14: { id: 14, userName: "user 14", competitor: [13], side: [UPPER], level: [5], seq: [14] },
            15: { id: 15, userName: "user 15", competitor: [16], side: [UPPER], level: [5], seq: [15] },
            16: { id: 16, userName: "user 16", competitor: [15], side: [UPPER], level: [5], seq: [16] },
        },
        matches: {
            151: { winner: 1, loser: 2, scores: { r1: { 1: 16, 2: 10 } }, bo: 1, streams: {}, matchDate: null, statLink: null }
        },
    }

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(users => this.setState({ users }))
    // }

    updateUser(user_id) {
        let { users, matches } = this.state;
        let user = users[user_id]
        let competitor = users[user.competitor[0]];
        console.log("competitor ", competitor);

        if (typeof competitor === "undefined") {
            return;
        }
        if (user.side) { //is upper bracket
            const matchKey = parseInt(user.side[0].toString() +
                user.level[0].toString() +
                Math.ceil(user.seq[user.seq.length - 1] / 2));
            //set next upper bracket next level
            user.level.unshift(user.level[0] - 1);
            //next time play on upper
            user.side.unshift(UPPER);
            //sequence
            const usersNextSeq = Math.ceil(user.seq[user.seq.length - 1] / 2);
            const nextCompetitor = this.findCompetitor(usersNextSeq)
            user.seq.push(usersNextSeq);
            if (nextCompetitor) user.competitor.unshift(nextCompetitor);

            //drop competitor to lower
            competitor.side.unshift(LOWER);
            const competitorsLowerSeq = Math.ceil(competitor.seq[competitor.seq.length - 1] / 2);
            competitor.seq.push(competitorsLowerSeq);
            const nextLowerCompetitor = this.findCompetitor(usersNextSeq)
            if (nextLowerCompetitor) competitor.competitor.unshift(nextLowerCompetitor);

            //update match
            matches[matchKey] = {
                winner: user_id,
                loser: competitor.id,
                scores: { r1: { 1: 16, 2: 10 } },
                bo: 1,
                streams: {},
                matchDate: null,
                statLink: null
            };
        } else {  // lower bracket

        }
        users[user_id] = user;
        this.setState({ users, matches });

        // console.log("users ", users);
        // console.log("matches ", matches);

    }

    findCompetitor(level, seq) {
        const { users } = this.state;
        const filteredUser = Object.keys(users).filter(key => {
            const thisSeq = (seq % 2 == 0) ? seq - 1 : seq + 1;
            // users[key].seq[0]
            return users[key].level[0] === level && thisSeq === users[key].seq[users[key].seq.length - 1]
        });
        if (filteredUser.length === 0) return null;
        return filteredUser[0].id;
    }

    getColumns() {
        let columnCount = playerToLevel[this.state.userCount];
        let columns = []
        const { users } = this.state;
        let slotsize = 16;
        for (let index = 0; index < columnCount; index++) {
            columns.push(
                <Column
                    key={index}
                    users={users}
                    level={index}
                    slotSize={slotsize}
                    handleUpdate={(user_id, slotSize) => this.updateUser(user_id, slotSize)}
                />
            )
            slotsize = slotsize / 2;
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