import React, { Component } from 'react'

class Match extends Component {
    state = {
        label: this.props.label,
        participants: this.props.participants,
        data: this.props.data,
    }


    // 11: { winner: 1, loser: 2, scores: { r1: { 1: 16, 2: 10 } }, bo: 1, streams: {}, matchDate: null, statLink: null }
    render() {
        const { label, participants } = this.state;
        return (
            <div className="bracket">
                <span>R{label} (round {(label + "").charAt(0)}-{(label + "").charAt(1)})</span>
                <div className="bracketNode">{participants[0] ? participants[0].name : null}</div>
                <div className="bracketNode">{participants[1] ? participants[1].name : null}</div>
            </div>
        );
    }
}

export default Match;