const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../../uploads/transports');

const data = [
    {
      "id": "64b8f2f8b3c5a7298d6e2250",
      "name": "Trek FX 1",
      "cost": 25,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2251",
      "description": "A versatile hybrid bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1559989175-6ebd4b418a5d"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2252",
      "name": "Specialized Sirrus X 2.0",
      "cost": 30,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2253",
      "description": "A fast and agile fitness bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1555066931-c04b3723b49c"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2254",
      "name": "Giant Escape 3",
      "cost": 20,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2255",
      "description": "An affordable and reliable commuter bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1567607124813-00da27de185c"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2256",
      "name": "Cannondale Quick 5",
      "cost": 35,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2257",
      "description": "A lightweight and comfortable fitness bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1607458295756-ee7f3aae992f"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2258",
      "name": "Trek Marlin 5",
      "cost": 15,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2259",
      "description": "A versatile mountain bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1603124700381-3a18be7213fc"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2260",
      "name": "Cannondale Trail 8",
      "cost": 22,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2261",
      "description": "An entry-level mountain bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1606318161606-28e8070aa49f"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2262",
      "name": "Giant Talon 3",
      "cost": 18,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2263",
      "description": "A reliable entry-level mountain bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1585951234701-b3a2d3c376e3"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2264",
      "name": "Specialized Rockhopper Comp 29",
      "cost": 40,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2265",
      "description": "A capable and versatile hardtail mountain bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1562001040-4030602e4c35"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2266",
      "name": "Trek X-Caliber 7",
      "cost": 45,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2267",
      "description": "A fast and capable cross-country mountain bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1562001040-4030602e4c35"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2268",
      "name": "Giant Roam 3",
      "cost": 28,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2269",
      "description": "A versatile and comfortable hybrid bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1591385496021-d2834f0c44bb"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2270",
      "name": "Cannondale Bad Boy 1",
      "cost": 50,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2271",
      "description": "A sleek and urban commuter bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1606318059145-08b7ca5ff20f"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2272",
      "name": "Trek Dual Sport 2",
      "cost": 32,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2273",
      "description": "A versatile and agile hybrid bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1574248051873-6a030229bc4d"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2274",
      "name": "Giant ToughRoad SLR 2",
      "cost": 38,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2275",
      "description": "A rugged and durable gravel bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1591385703047-8e0f8ed9e64f"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2276",
      "name": "Specialized CrossTrail 3",
      "cost": 27,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2277",
      "description": "A versatile and comfortable fitness bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1584697952877-e51e3a74a3ec"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2278",
      "name": "Cannondale Topstone 1",
      "cost": 42,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2279",
      "description": "A versatile gravel bike for all terrains",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1591952058297-1c5bca8730c3"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2280",
      "name": "Trek Verve 2",
      "cost": 23,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2281",
      "description": "A comfortable and easy-to-ride hybrid bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1590482047026-bd4e2fb85bf3"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2282",
      "name": "Giant FastRoad SL 3",
      "cost": 31,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2283",
      "description": "A fast and agile fitness bike for city commuting",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1603256170553-97b8a12e3b5b"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2284",
      "name": "Specialized Pitch 27.5",
      "cost": 17,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2285",
      "description": "An entry-level mountain bike for trails",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1567607774979-cd55dbaf3bd6"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2286",
      "name": "Trek Roscoe 7",
      "cost": 37,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2287",
      "description": "A capable and fun trail mountain bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1603271449973-53ba10452e8a"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2288",
      "name": "Cannondale Trail 7",
      "cost": 21,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2289",
      "description": "An affordable and capable mountain bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1589401973018-ec24362b37e0"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2290",
      "name": "Giant Contend AR 3",
      "cost": 33,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2291",
      "description": "A versatile and comfortable road bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1562640473-c42a4d69c4e4"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2292",
      "name": "Trek Domane AL 2",
      "cost": 24,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2293",
      "description": "A comfortable and efficient road bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1606287701903-13beefce9f89"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2294",
      "name": "Specialized Allez",
      "cost": 19,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2295",
      "description": "An entry-level road bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1606317999414-08c885197f9d"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2296",
      "name": "Giant Revolt 3",
      "cost": 26,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2297",
      "description": "A versatile gravel bike for adventure",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1591385698543-b4f47c15f512"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2298",
      "name": "Cannondale CAAD Optimo Tiagra",
      "cost": 29,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2299",
      "description": "A lightweight and efficient road bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1603158131025-99e9d6b3df0b"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2300",
      "name": "Trek Checkpoint ALR 5",
      "cost": 36,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2301",
      "description": "A versatile gravel bike for all adventures",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1578765091322-2d36495e717a"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2302",
      "name": "Giant Escape 2",
      "cost": 16,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2303",
      "description": "A reliable commuter bike for everyday use",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1606900138472-89e96e7e0a6b"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2304",
      "name": "Specialized Crosstrail 2.0",
      "cost": 34,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2305",
      "description": "A versatile hybrid bike for urban adventures",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1571402611223-989c3703bc1b"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2306",
      "name": "Cannondale Quick Disc 5",
      "cost": 14,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2307",
      "description": "An affordable and efficient hybrid bike",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1565061823159-bb676c0b8d10"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2308",
      "name": "Giant FastRoad Advanced 1",
      "cost": 48,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2309",
      "description": "A lightweight and fast fitness bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1605710158571-3b24cf82ebe2"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2310",
      "name": "Trek FX 2 Disc",
      "cost": 39,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2311",
      "description": "A versatile hybrid bike with disc brakes",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1606189521528-4e5f0df99c0e"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2312",
      "name": "Specialized Turbo Como 3.0 650b",
      "cost": 44,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2313",
      "description": "A comfortable and stylish electric bike",
      "hasDelivery": false,
      "photos": [
        "https://images.unsplash.com/photo-1603495709355-c5223b6a2ed0"
      ]
    },
    {
      "id": "64b8f2f8b3c5a7298d6e2314",
      "name": "Cannondale Topstone Neo Carbon 3",
      "cost": 49,
      "transportTypeId": "64b8f2f8b3c5a7298d6e2199",
      "ownerId": "64b8f2f8b3c5a7298d6e214e",
      "locationDataId": "64b8f2f8b3c5a7298d6e2315",
      "description": "A lightweight electric gravel bike for adventures",
      "hasDelivery": true,
      "photos": [
        "https://images.unsplash.com/photo-1606391685326-1c826774c193"
      ]
    }
  ]
  
  
  
  const createDirectores = (data) => {

    if(!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir , { recursive: true });
        console.log(`The ${baseDir} directory has been successfully created`);
    } else {
        console.log(`The ${baseDir} directory already exists`);
    }

    data.forEach((item) => {
        const dirPath = path.join(baseDir, item.id);
        if(!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath , { recursive: true });
            console.log(`The ${dirPath} directory has been successfully created`);
        } else {
            console.log(`The ${dirPath} directory already exists`);
        }
    })
  }

  createDirectores(data)