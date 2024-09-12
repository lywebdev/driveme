import {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const fetchCoordinates = async (address) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    const data = await response.json();
    if (data.length > 0) {
        return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
        };
    }
    return null;
};

const TransportMap = ({ transportLocation }) => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        fetchCoordinates(transportLocation).then(coords => {
            if (coords) {
                setPosition([coords.lat, coords.lon]);
            }
        });
    }, []);

    if (!position) return <div>Loading...</div>;

    return (
        <MapContainer center={position} zoom={20} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}
                eventHandlers={{
                    add: (e) => {
                        e.target.openPopup();
                    }
                }}
            >
                <Popup>Vehicle here!</Popup>
            </Marker>
        </MapContainer>
    );
};

export default TransportMap;
