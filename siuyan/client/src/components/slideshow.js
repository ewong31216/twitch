import React, { Component } from 'react';
import { render } from 'react-dom';

class SlideShow extends Component {
    constructor(props) {
        super(props);

        this.timeInterval = 3000;
        this.transition = 1000;
        this.slides = [{
            src: 'https://www.qoo-online.com/thegear/content/theme/media/shop/スライドバナー/2020/6月/Instalive items/the items in live stream.jpg'
        },{
            src: 'https://www.qoo-online.com/thegear/content/theme/media/shop/スライドバナー/2020/7月/SPECIAL PRICE/Speical price.jpg'
        }];
        this.state = {
            current: 0,
            slideClassName: 'slide',
            currentSrc: false,
            nextSrc: false
        };

        this.init = this.init.bind(this);
        this.move = this.move.bind(this);
    }

    init() {
        const { current } = this.state;
        const next = current >= this.slides.length - 1 ? 0 : current + 1;

        this.setState({
            currentSrc: this.slides[current].src,
            nextSrc: this.slides[next].src
        });

        setTimeout(this.move, this.timeInterval);
    }
    
    move() {
        this.setState({
            slideClassName: 'slide moving'
        });
        setTimeout(() => {
            console.log(this.state.current);
            this.setState({
                current: this.state.current >= this.slides.length - 1 ? 0 : this.state.current + 1,
                slideClassName: 'slide'
            }, this.init);
        }, this.transition);
    }

    componentDidMount(){
        this.init();
    }

    render() {
        const { slideClassName, currentSrc, nextSrc } = this.state;
        const currentStyle = {
                backgroundImage: 'url(\'' + currentSrc + '\')'
            },
            nextStyle = {
                backgroundImage: 'url(\'' + nextSrc + '\')'
            };

        return (
            <div className="slide-show-container">
                <div className={ slideClassName + " current" } style={ currentStyle }></div>
                <div className={ slideClassName + " next" } style={ nextStyle }></div>
            </div>
        );
    }
}

export default SlideShow;
