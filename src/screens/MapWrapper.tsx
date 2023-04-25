// react
import { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import Overlay from 'ol/Overlay.js';
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import '../index.css';
import OSM from 'ol/source/OSM';
import DragPan from 'ol/interaction/DragPan';
import { transform, fromLonLat, toLonLat } from 'ol/proj'
import { toStringXY } from 'ol/coordinate';
import { Coordinate } from 'ol/coordinate';
import { Geometry } from 'ol/geom';

function MapWrapper(props: any) {

    // set intial state
    // const [map, setMap] = useState()
    const [marker, setMarker] = useState<any>()
    // const [featuresLayer, setFeaturesLayer] = useState()
    // const [selectedCoord, setSelectedCoord] = useState()
    const [selectedCoord, setSelectedCoord] = useState<Coordinate | undefined>(undefined);
    // const [map, setMap] = useState<Partial<{ key: string, value: string }> | undefined>(undefined);
    const [map, setMap] = useState<Partial<{ key: string, value: string }>>({});

    const [featuresLayer, setFeaturesLayer] = useState<VectorLayer<VectorSource<Geometry>> | undefined>(undefined);
    const mapElement = useRef<HTMLDivElement>(null);

    // pull refs
    // const mapElement = useRef()

    // create state ref that can be accessed in OpenLayers onclick callback function
    //  https://stackoverflow.com/a/60643670
    const mapRef = useRef<Partial<{ key: string; value: string; }>>({});
    mapRef.current = map;

    // initialize map on first render - logic formerly put into componentDidMount
    useEffect(() => {

        const viewport = document.querySelector('.ol-viewport');

        if (!viewport) {
            const marker_el: any = document.getElementById('marker');

            // create and add vector source layer
            const initalFeaturesLayer = new VectorLayer({
                source: new VectorSource()
            })

            const onChange = props.onChange;

            const initialLocation = fromLonLat(props.location);

            // create map

            const initialMap = new Map({
                target: mapElement.current || undefined,
                layers: [

                    // USGS Topo
                    new TileLayer({
                        source: new OSM()/*,
                    source: new XYZ({
                        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
                    })*/
                    }),

                    // Google Maps Terrain
                    /* new TileLayer({
                      source: new XYZ({
                        url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
                      })
                    }), */

                    initalFeaturesLayer

                ],
                view: new View({
                    // projection: 'EPSG:3857',
                    center: initialLocation,
                    zoom: 18
                }),
                controls: []
            })


            const marker = new Overlay({
                position: initialLocation,
                positioning: 'center-center',
                element: marker_el,
                stopEvent: false,
                // dragging: true,
                autoPan: {
                    animation: {
                        duration: 250,
                    },
                },
            });

            setMarker(marker);

            let dragPan: any;
            initialMap.getInteractions().forEach(function (interaction) {
                if (interaction instanceof DragPan) {
                    dragPan = interaction;
                }
            });

            marker_el.addEventListener('mousedown', function () {
                dragPan.setActive(false);
                marker.set('dragging', true);
            });


            initialMap.on('pointermove', function (evt) {
                if (marker.get('dragging') === true) {
                    marker.setPosition(evt.coordinate);
                }
            });
            const getInfo = async (coordinate: any) => {
                const lonLat = toLonLat(coordinate);
                const transormedCoord = transform(coordinate, 'EPSG:3857', 'EPSG:4326')
                setSelectedCoord(transormedCoord);
                return { lonLat: lonLat };
            }
            initialMap.addEventListener('pointerup', (evt: any) => {
                if (marker.get('dragging') === true) {
                    dragPan.setActive(true);
                    marker.set('dragging', false);
                    onChange(getInfo(evt.coordinate))
                    //popup.show(evt.coordinate,'Latitude :'+evt.coordinate[0]+', Longitude :'+ evt.coordinate[1]);
                }
            });
            initialMap.on('click', async (evt) => {
                marker.setPosition(evt.coordinate);
                onChange(await getInfo(evt.coordinate));
                //marker.set('dragging', false);
            });

            initialMap.addOverlay(marker);
            // save map and vector layer references to state
            setMap(initialMap)
            setFeaturesLayer(initalFeaturesLayer)
        }
    }, [])


    useEffect(() => {
        if (marker && props.location) {
            marker.setPosition(fromLonLat(props.location));
            console.log(props.location);
        }
    }, [props.location])

    // update map if features prop changes - logic formerly put into componentDidUpdate
    useEffect(() => {

        if (props.features.length) { // may be null on first render

            if (featuresLayer) {
                // set features to map
                featuresLayer.setSource(
                    new VectorSource({
                        features: props.features // make sure features is an array
                    })
                )
            }
            if (featuresLayer && featuresLayer.getSource()) {
                const source = featuresLayer.getSource();
                if (source && source.getFeatures().length > 0) {
                    const extent = source.getExtent();
                    if (extent) {
                        map.getView().fit(extent, { padding: [100, 100, 100, 100] });
                    }
                }
            }
        }
    }, [props.features])

    // render component
    return (
        <div>
            <div style={{ height: 200 }} ref={mapElement} className="map-container"></div>
            <div className="clicked-coord-label">
                <p>{(selectedCoord) ? toStringXY(selectedCoord, 5) : ''}</p>
            </div>
            <div id="marker" title="Marker"></div>
            <div id="popup" className="ol-popup">
                <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                <div id="popup-content"></div>
            </div>
        </div>
    )
}

export default MapWrapper