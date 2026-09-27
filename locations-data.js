/**
 * KULFI CORNER - LOCATIONS DATA (SINGLE SOURCE OF TRUTH)
 * Total Locations: 54 (43 Current + 11 Upcoming)
 */
(function (root) {
    const locations = {
        current: [
            { name: "Chennai",           city: "Chennai",           lat: 13.0827, lng: 80.2707, status: "current" },
            { name: "Chengalpattu",      city: "Chengalpattu",      lat: 12.6921, lng: 79.9762, status: "current" },
            { name: "Kancheepuram",      city: "Kancheepuram",      lat: 12.8342, lng: 79.7036, status: "current" },
            { name: "Pondy",             city: "Pondy",             lat: 11.9416, lng: 79.8083, status: "current" },
            { name: "Karaikkal",         city: "Karaikkal",         lat: 10.9254, lng: 79.8380, status: "current" },
            { name: "Cuddalore",         city: "Cuddalore",         lat: 11.7480, lng: 79.7714, status: "current" },
            { name: "Ulunthurpet",       city: "Ulunthurpet",       lat: 11.5630, lng: 79.3170, status: "current" },
            { name: "Sirkali",           city: "Sirkali",           lat: 11.2250, lng: 79.7450, status: "current" },
            { name: "Kumbakonam",        city: "Kumbakonam",        lat: 10.9602, lng: 79.3845, status: "current" },
            { name: "Thanjavur",         city: "Thanjavur",         lat: 10.7870, lng: 79.1378, status: "current" },
            { name: "Sankarapuram",      city: "Sankarapuram",      lat: 11.8200, lng: 78.9200, status: "current" },
            { name: "Thirukovilur",      city: "Thirukovilur",      lat: 11.9670, lng: 79.2000, status: "current" },
            { name: "Thiruvannamalai",   city: "Thiruvannamalai",   lat: 12.2253, lng: 79.0747, status: "current" },
            { name: "Salem",             city: "Salem",             lat: 11.6643, lng: 78.1460, status: "current" },
            { name: "Namakkal",          city: "Namakkal",          lat: 11.2195, lng: 78.1677, status: "current" },
            { name: "Rasipuram",         city: "Rasipuram",         lat: 11.4588, lng: 78.1805, status: "current" },
            { name: "Krishnagiri",       city: "Krishnagiri",       lat: 12.5186, lng: 78.2137, status: "current" },
            { name: "Tiruchengodu",      city: "Tiruchengodu",      lat: 11.3862, lng: 77.8950, status: "current" },
            { name: "Trichy",            city: "Trichy",            lat: 10.7905, lng: 78.7047, status: "current" },
            { name: "Thirukkattupalli",  city: "Thirukkattupalli",  lat: 10.8544, lng: 79.0140, status: "current" },
            { name: "Gandarvakkottai",   city: "Gandarvakkottai",   lat: 10.4700, lng: 78.8100, status: "current" },
            { name: "Orathanadu",        city: "Orathanadu",        lat: 10.5500, lng: 79.1300, status: "current" },
            { name: "Papanadu",          city: "Papanadu",          lat: 10.6200, lng: 79.2500, status: "current" },
            { name: "Mannargudi",        city: "Mannargudi",        lat: 10.6642, lng: 79.4514, status: "current" },
            { name: "Thiruvarur",        city: "Thiruvarur",        lat: 10.7724, lng: 79.6354, status: "current" },
            { name: "Musiri",            city: "Musiri",            lat: 10.9490, lng: 78.4410, status: "current" },
            { name: "Bodi",              city: "Bodi",              lat: 10.0180, lng: 77.3570, status: "current" },
            { name: "Andipatti",         city: "Andipatti",         lat:  9.9847, lng: 77.6220, status: "current" },
            { name: "Aranthangi",        city: "Aranthangi",        lat: 10.1677, lng: 79.0793, status: "current" },
            { name: "Bavani",            city: "Bavani",            lat: 11.2365, lng: 77.6862, status: "current" },
            { name: "Pudukkottai",       city: "Pudukkottai",       lat: 10.3797, lng: 78.8232, status: "current" },
            { name: "Muthupettai",       city: "Muthupettai",       lat: 10.3940, lng: 79.4940, status: "current" },
            { name: "Villupuram",        city: "Villupuram",        lat: 11.9401, lng: 79.4861, status: "current" },
            { name: "Velachery",         city: "Velachery",         lat: 12.9815, lng: 80.2180, status: "current" },
            { name: "Taramani",          city: "Taramani",          lat: 12.9838, lng: 80.2466, status: "current" },
            { name: "Mangadu",           city: "Mangadu",           lat: 13.0440, lng: 80.0670, status: "current" },
            { name: "Puzhudivakkam",     city: "Puzhudivakkam",     lat: 12.9980, lng: 80.2000, status: "current" },
            { name: "Kottivakkam",       city: "Kottivakkam",       lat: 12.9430, lng: 80.2560, status: "current" },
            { name: "Poonthamalli",      city: "Poonthamalli",      lat: 13.0450, lng: 80.0900, status: "current" },
            { name: "Royapuram",         city: "Royapuram",         lat: 13.1134, lng: 80.2942, status: "current" },
            { name: "Ennoor",            city: "Ennoor",            lat: 13.1290, lng: 80.3060, status: "current" },
            { name: "Thiruvotriyur",     city: "Thiruvotriyur",     lat: 13.1590, lng: 80.3020, status: "current" },
            { name: "Anna Nagar",        city: "Anna Nagar",        lat: 13.0878, lng: 80.2099, status: "current" }
        ],
        upcoming: [
            { name: "Thirumangalam",    city: "Thirumangalam",    lat:  9.8200, lng: 77.9900, status: "upcoming" },
            { name: "Aruppukottai",     city: "Aruppukottai",     lat:  9.5095, lng: 78.0963, status: "upcoming" },
            { name: "Kovilpatti",       city: "Kovilpatti",       lat:  9.1737, lng: 77.8697, status: "upcoming" },
            { name: "Sankagiri",        city: "Sankagiri",        lat: 11.4850, lng: 77.9000, status: "upcoming" },
            { name: "Erode",            city: "Erode",            lat: 11.3410, lng: 77.7172, status: "upcoming" },
            { name: "Vellore",          city: "Vellore",          lat: 12.9165, lng: 79.1325, status: "upcoming" },
            { name: "Katpadi",          city: "Katpadi",          lat: 12.9700, lng: 79.1440, status: "upcoming" },
            { name: "Perambalur",       city: "Perambalur",       lat: 11.2330, lng: 78.8780, status: "upcoming" },
            { name: "T Nagar",          city: "T Nagar",          lat: 13.0418, lng: 80.2341, status: "upcoming" },
            { name: "Maraimalai Nagar", city: "Maraimalai Nagar", lat: 12.7940, lng: 80.0210, status: "upcoming" },
            { name: "Mahindra City",    city: "Mahindra City",    lat: 12.7320, lng: 79.9880, status: "upcoming" }
        ]
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = locations;
    }
    root.KULFI_LOCATIONS = locations;
})(typeof window !== 'undefined' ? window : globalThis);
