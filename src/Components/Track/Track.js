import './Track.css';
import React from 'react';

export class Track extends React.Component{

    constructor(props){
        super(props);


        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onAdd(){
        this.props.onAdd(this.props.track);
    }

    onRemove(){
        this.props.onRemove(this.props.track);
    }

    renderAction(){
        if(this.props.isRemoval){
            return <button className="Track-action" onClick ={this.onRemove}>-</button>
        }else{
            return <button className="Track-action" onClick={this.onAdd}>+</button>;
        }
    }

    render(){
        return(
        <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
            {this.renderAction()}
        </div>
        );
    }
}

