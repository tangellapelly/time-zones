import React, { Component } from 'react';
import SearchLocation from './SearchLocation';
class DisplayMap extends Component {

    mapRef = React.createRef();
    state = {
        map: null
    };

    componentDidMount() {

        const H = window.H;

        const platform = new H.service.Platform({
            apikey: 'F3uoJ36IxvsIEnrf12wSJxmwhgRBVhIiLw0jpTQsvlw'
        });
        const defaultLayers = platform.createDefaultLayers();

        const map = new H.Map(
            this.mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: { lat: 50, lng: 5 },
                zoom: 4,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


        H.ui.UI.createDefault(map, defaultLayers);

        this.setState({ map });
        window.map = map
    }

    componentWillUnmount() {
        this.state.map.dispose();
    }

    render() {
        return <div ref={this.mapRef} style={{ width: "100vw", height: "100vh" }} >
            <SearchLocation/>
        </div>;
    }
}

export default DisplayMap;


/*
https://places.api.here.com/places/v1/autosuggest?X-Map-Viewport=39.5720,21.5471,39.7557,21.6179&app_code=LJXqQ8ErW71UsRUK3R33Ow&app_id=VgTVFr1a0ft1qGcLCVJ6&hlEnd=%3C%2Fspan%3E&hlStart=%3Cspan+class%3D%22mark+bold%22%3E&q=hyderaba&result_types=address,place,category,chain&size=5&withExperiments=PBAPI_3292_autosuggest_cuisines%3Dtrue

*/