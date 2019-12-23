import React, { Component } from 'react';
class SearchLocation extends Component {
    resultRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            autosuggestions: []
        };

        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    render() {
        return <div style={style.searchBox}><input onChange={this.handleKeyUp} style={style.searchInput} placeholder="Type in the location" name="SearchLocation" id="SearchLocation" autoComplete='off'/>

            <div className="dropdown">
                <ul id="result" ref={this.resultRef} style={style.ulstyle}>
                   {this.state.autosuggestions}
                </ul>
            </div>

        </div>
    }
    async handleKeyUp(event) {

        if(event.target.value !== ''){
        this.setState({ value: event.target.value })
        await fetch(`https://places.api.here.com/places/v1/autosuggest?X-Map-Viewport=39.5720,21.5471,39.7557,21.6179&app_code=LJXqQ8ErW71UsRUK3R33Ow&app_id=VgTVFr1a0ft1qGcLCVJ6&hlEnd=%3C%2Fspan%3E&hlStart=%3Cspan+class%3D%22mark+bold%22%3E&q=${this.state.value}&result_types=address,place,category,chain&size=5&withExperiments=PBAPI_3292_autosuggest_cuisines%3Dtrue`)
            .then(r => r.json().then(
                (data) =>{
                   let result = data.results.map((item,index)=>{
                       console.log(item)
                    return <li style={style.autosuggestionList}key={index} data-position= {item.position} onClick={this.handleSelect}>{item.title}</li>
                    })

                    this.setState({autosuggestions:result})
                }
            ));
        }else{
            this.setState({autosuggestions:null})
        }
    }

    async handleSelect(data){
    let selected_position = data.currentTarget.dataset.position;
        console.log(selected_position)
        console.log({lat:Number(selected_position.split(',')[0]), lng:Number(selected_position.split(',')[1])})
        var hereMarker = new window.H.map.Marker({lat:Number(selected_position.split(',')[0]), lng:Number(selected_position.split(',')[1])});
        window.map.addObject(hereMarker);
        hereMarker.setGeometry({lat:Number(selected_position.split(',')[0]), lng:Number(selected_position.split(',')[1])},true)
        window.map.setCenter({lat:Number(selected_position.split(',')[0]), lng:Number(selected_position.split(',')[1])},true);
        
        
    }

    componentDidMount(){
        setTimeout(function() { //Start the timer
            window.map.setZoom(15,true);
        }, 3000)
    }

}


const style = {
    searchBox: {
        zIndex: 9999,
        position: 'absolute',
        top: '200px',
        left: '20px',
        width: '400px',
        height: '50px',
        backgroundColor: 'white',
        boxShadow: '0 0 0 0.1rem rgba(1, 11, 30, 0.1)'
    },
    searchInput: {
        width: 350,
        height: 20,
        padding: '5px',
        marginLeft: '17px',
        marginTop: '7px',
        color: '#0f1621',
        boxShadow: '10px',
        border: 'none'
    },
    autosuggestionList:{
        height:'12px',
        padding:'12px',
        boxShadow: '0 0 4px #9ecaed',


    },
    ulstyle:{
        listStyle:'none',
        backgroundColor:'white',
        padding:0,
        
    }

}
export default SearchLocation;


