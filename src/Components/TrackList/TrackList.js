import './TrackList.css';
import React from 'react';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
    render(){
       const tracks = this.props.tracks;
        return (
            <div className="TrackList">
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
                {tracks?.map((element, index) => <Track key={index} track={element} isRemoval = {this.props.isRemoval} onAdd = {this.props.onAdd} onRemove = {this.props.onRemove}/>)}
            </div>
        );
    }
}

Track.defaultProps = {
    isRemoval: false
}