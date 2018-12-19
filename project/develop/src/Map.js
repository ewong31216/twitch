import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Current = () => <div className="dot"></div>;

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {
        const { current, data } = this.props;

        return data && data.length ? (
            <div className="map-container" style={{ height: '600px', width: '600px' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB7VapGG60Ch5j7T3jbrlFUvpJRofu2Wak" }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <Current
                        lat={data[current].lat}
                        lng={data[current].long}
                    />
                </GoogleMapReact>
                <div className="info">
                    <div className="speed">{data[current].speed} mph</div>
                    <div className="signal">
                        <div className={'signal-bar bar-1' + (data[current].rssi > 0 ? ' red' : '')}></div>
                        <div className={'signal-bar bar-2' + (data[current].rssi > 1 ? ' red' : '')}></div>
                        <div className={'signal-bar bar-3' + (data[current].rssi > 2 ? ' red' : '')}></div>
                        <div className={'signal-bar bar-4' + (data[current].rssi > 3 ? ' red' : '')}></div>
                    </div>
                </div>
            </div>
        ) : false;
    }
}

export default Map;