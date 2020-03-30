import React, { Component } from 'react';
import Match from "./match";

const roundToPlayer = {
    1: 2,
    2: 4,
    3: 8,
    4: 16,
    5: 32,
    6: 64,
    7: 128,
};

const users = {
    1: { id: 1, name: "user 1", rank: 1 },
    2: { id: 2, name: "user 2", rank: 2 },
    3: { id: 3, name: "user 3", rank: 3 },
    4: { id: 4, name: "user 4", rank: 4 },
    5: { id: 5, name: "user 5", rank: 5 },
    6: { id: 6, name: "user 6", rank: 6 },
    7: { id: 7, name: "user 7", rank: 7 },
    8: { id: 8, name: "user 8", rank: 8 },
    9: { id: 9, name: "user 9", rank: 9 },
    10: { id: 10, name: "user 10", rank: 10 },
    11: { id: 11, name: "user 11", rank: 11 },
    12: { id: 12, name: "user 12", rank: 12 },
    13: { id: 13, name: "user 13", rank: 13 },
    14: { id: 14, name: "user 14", rank: 14 },
    15: { id: 15, name: "user 15", rank: 15 },
    16: { id: 16, name: "user 16", rank: 16 },
    17: { id: 17, name: "user 17", rank: 17 },
};

const userKeys = Object.keys(users);
var round = 0, expectedUserNum = 0, mustAutoWinnerCount = 0;

class BracketNew extends Component {

    state = {
        matches: {
            // 11: { winner: 1, loser: 2, scores: { r1: { 1: 16, 2: 10 } }, bo: 1, streams: {}, matchDate: null, statLink: null }
        },
    }

    componentDidMount() {
        this.calculateBrackets();
    }

    async calculateBrackets() {
        const userCount = userKeys.length;
        round = this.getbracketRounds(userCount);
        expectedUserNum = roundToPlayer[round];
        mustAutoWinnerCount = expectedUserNum - userCount;
        const autoWinnersMatches = await this.setAutoWinnerMatches();
        const restMatches = await this.setMatches();
        // console.log("autoWinnersMatches ", autoWinnersMatches);
        // console.log("restMatches ", restMatches);
        this.setState({ matches: { ...autoWinnersMatches, ...restMatches } }, () => {
            if (mustAutoWinnerCount) this.setNextRound();
        });
    }

    getbracketRounds(totalNum) {
        let round = 0;
        let restNum = totalNum;
        while (restNum > 1) {
            round++;
            restNum = Math.ceil(restNum / 2);
        }
        return round;
    }

    async setMatches() {
        let newMatches = {};
        let matchesCount = expectedUserNum;
        for (let i = 0; i < round; i++) {
            matchesCount = matchesCount / 2;
            let matchLabel = (i + 1); //matchKey first letter (i + 1) => round
            if (i === 0) {
                let firstUserIndex = 0;
                let restMatches = matchesCount;
                let extraNum = 0;
                if (mustAutoWinnerCount > 0) { //if auto winner exist
                    const restParticipantsCount = userKeys.length - mustAutoWinnerCount;
                    firstUserIndex = mustAutoWinnerCount;
                    restMatches = restParticipantsCount / 2;
                    extraNum = mustAutoWinnerCount;
                }
                for (let j = 0; j < restMatches; j++) {
                    const user = users[userKeys[firstUserIndex]];
                    const nextUser = users[userKeys[firstUserIndex + 1]];
                    let match = this.getMatch(user.id, nextUser.id);
                    firstUserIndex = firstUserIndex + 2;
                    let label = parseInt(matchLabel + "" + (extraNum + (j + 1)));
                    //matchLabel => roundNum concat match sequence (firstUserIndex + (j+1))
                    newMatches[label] = match;
                }
                continue;
            }
            for (let j = 0; j < matchesCount; j++) {
                let match = this.getMatch(null, null);
                let label = parseInt(matchLabel + "" + (j + 1));
                newMatches[label] = match;
            }
        }
        return newMatches;
    }

    async setAutoWinnerMatches() {
        if (mustAutoWinnerCount === 0) {
            return {};
        }
        let newMatches = {};
        for (let i = 0; i < mustAutoWinnerCount; i++) {
            const user = users[userKeys[i]];
            let match = this.getMatch(user.id, null);
            const matchLabel = parseInt("1" + (i + 1))  //1 first round i+1 match sequence
            newMatches[matchLabel] = match;
        }
        return newMatches;
    }

    setNextRound() {
        // let newMatches = {};
        for (let i = 0; i < mustAutoWinnerCount; i++) {
            const user = users[userKeys[i]];
            const matchLabel = parseInt("1" + (i + 1))  //1 first round i+1 match sequence

            // let match = this.getMatch(user.id, null);
            // newMatches[matchLabel] = match;
        }
    }

    getMatch(firstUserKey, secondUserKey) {
        let match = {};
        match.participants = [firstUserKey, secondUserKey];
        return match;
    }

    updateMatch(props) {
        console.log("updateMatch(props)", props)
    }

    getColumn(filteredMatchesKeys, matches, columnKey) {

        let columnMatches = [];
        let filteredMatchData = {}
        for (let j = 0; j < filteredMatchesKeys.length; j++) {
            const key = filteredMatchesKeys[j];
            filteredMatchData[key] = matches[key];
            let user1 = null, user2 = null;
            if (filteredMatchData[key].participants) {
                user1 = users[filteredMatchData[key].participants[0]];
                user2 = users[filteredMatchData[key].participants[1]];
            }
            delete matches[key];
            columnMatches.push(
                <Match
                    key={key}
                    label={key}
                    data={filteredMatchData[key]}
                    participants={[user1, user2]}
                    handleUpdate={(props) => this.updateMatch(props)}
                />
            )
        }
        return <div key={columnKey}>
            {columnMatches}
        </div>;
    }

    getColumns() {
        const { matches } = this.state;
        let columns = [];
        for (let index = 1; index <= round; index++) {
            const filteredMatchesKeys = Object.keys(matches).filter(matchKey => {
                return parseInt((matchKey + "").charAt(0)) === index;
            });
            columns.push(this.getColumn(filteredMatchesKeys, matches, index));
        }
        return columns;
    }


    render() {
        return (
            <div>
                <h1>Bracket</h1>
                <div className="columnContainer">
                    {this.getColumns()}
                </div>
            </div>
        );
    }
}

export default BracketNew;