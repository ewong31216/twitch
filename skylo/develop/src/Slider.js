import React, {Component} from 'react';

class Slider extends Component {
    constructor(props) {
        super(props);

        this.addCurrent = this.addCurrent.bind(this);
        this.toggleStart = this.toggleStart.bind(this);
        this.slower = this.slower.bind(this);
        this.faster = this.faster.bind(this);

        this.data = {
            width: props.width || 600,
            timer: false
        };

        this.state = {
            start: false,
            speed: 100
        };
    }

    addCurrent(){
        if(this.state.start && this.props.current < this.props.data.length - 1){
            this.props.updateCurrent(this.props.current + 1);
            this.data.timer = setTimeout(this.addCurrent, this.state.speed);
        }else{
            this.setState({
                start: false
            });
        }
    }

    toggleStart(){
        let start = !this.state.start,
            self = this;

        this.setState({
            start: start
        }, () => {
            clearTimeout(self.data.timer);

            if (start) {
                self.addCurrent();
            }
        });
    }

    slower(){
        this.setState({
            speed: Math.round(this.state.speed * 2)
        });
    }

    faster(){
        this.setState({
            speed: Math.round(this.state.speed / 2)
        });
    }

    render(){
        const { current, data } = this.props;

        let left = current * this.data.width / (data.length || 1);

        return data && data.length ? (
            <div className="slider-container current-line-container">
                <div className="current-line" style={{left: left}}></div>
                <div className="status-bar" style={{width: this.data.width}}></div>
                <div className="controller-buttons">
                    <span className="arrow left-arrow" onClick={this.slower}><div></div><div></div></span>
                    <span className={"start-pause " + (this.state.start ? 'pause' : 'start')} onClick={this.toggleStart}><div className="start"></div><div></div></span>
                    <span className="arrow right-arrow" onClick={this.faster}><div></div><div></div></span>
                </div>
            </div>
        ) : false;
    }
}

export default Slider;