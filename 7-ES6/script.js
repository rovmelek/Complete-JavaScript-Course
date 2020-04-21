// create a new facility container
let facilities = new facilityContainer();

// setup parks and streets
facilities.addFacility(
    'park',
    {
        name: 'Green Park',
        buildYear: 1868,
        numberOfTree: 54321,
        size: 20
    }
);

facilities.addFacility(
    'park',
    {
        name: 'National Park',
        buildYear: 1921,
        numberOfTree: 12345,
        size: 10
    }
);

facilities.addFacility(
    'park',
    {
        name: 'Oak Park',
        buildYear: 1952,
        numberOfTree: 4567,
        size: 20
    }
);

facilities.addFacility(
    'street',
    {
        name: 'Ocean Avenue',
        buildYear: 1999,
        length: 10,
        size: 'big'
    }

);

facilities.addFacility(
    'street',
    {
        name: 'Evergreen Street',
        buildYear: 2008,
        length: 10,
        size: 'small'
    }

);

facilities.addFacility(
    'street',
    {
        name: '4th Street',
        buildYear: 2015,
        length: 10,
        size: 'normal'
    }

);

facilities.addFacility(
    'street',
    {
        name: 'Sunset Boulevard',
        buildYear: 1982,
        length: 10,
        size: 'huge'
    }

);

// debug
facilities.viewList();