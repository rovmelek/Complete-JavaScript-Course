// create a new facility container
let facilities = new facilityContainer();

// setup parks and streets
facilities.addFacility(
    'park',
    {
        name: 'Green Park',
        buildYear: 1898,
        numberOfTree: 430,
        size: 0.4
    }
);

facilities.addFacility(
    'park',
    {
        name: 'National Park',
        buildYear: 1971,
        numberOfTree: 13432,
        size: 11
    }
);

facilities.addFacility(
    'park',
    {
        name: 'Oak Park',
        buildYear: 1962,
        numberOfTree: 949,
        size: 0.4
    }
);

facilities.addFacility(
    'street',
    {
        name: 'Ocean Avenue',
        buildYear: 1999,
        length: 3,
        size: 'big'
    }

);

facilities.addFacility(
    'street',
    {
        name: 'Evergreen Street',
        buildYear: 2008,
        length: 1,
        size: 'small'
    }

);

facilities.addFacility(
    'street',
    {
        name: '4th Street',
        buildYear: 2015,
        length: 2,
        size: 'normal'
    }

);

facilities.addFacility(
    'street',
    {
        name: 'Sunset Boulevard',
        buildYear: 1982,
        length: 4,
        size: 'huge'
    }

);

// debug
facilities.viewList();
console.log('----PARKS REPORT----');
console.log(`Our ${facilities.parkList.length} parks have an average age of ${facilities.getParkAvgAge()} years.`);
facilities.getParkTreeDensity();
facilities.getParkTreeGreaterThan(1000);
console.log('----STREETS REPORT----');
console.log(`Our ${facilities.streetList.length} streets have a total lengh of ${facilities.getStreetTotalLength()} km, with an aveage of ${facilities.getStreetAvgLength()} km.`);
facilities.getStreetSummary();