class facilityObj
{
    constructor(name, buildYear)
    {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class parkObj extends facilityObj
{
    constructor(name, buildYear, numberOfTree, size)
    {
        super(name, buildYear);
        this.numberOfTree = numberOfTree;
        this.size = size;
    }
}

class streetObj extends facilityObj
{
    constructor(name, buildYear, length, size)
    {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
}

class facilityContainer
{
    constructor()
    {
        this.parkList = [];
        this.streetList = []
    }

    addFacility(type, properties)
    {
        if (type === 'park')
        {
            console.log(properties);
            this.parkList.push(new parkObj(
                        properties.name,
                        properties.buildYear,
                        properties.numberOfTree,
                        properties.size
                    )
                )
        }
        else if (type === 'street')
        {
            console.log(properties);
            this.streetList.push(new streetObj(
                properties.name,
                properties.buildYear,
                properties.length,
                properties.size
            )
        )
        }
        else
        {
            console.log(`Unknown type detected: ${type}`);
        }
    }

    getParkTotalAge()
    {
        return this.parkList.reduce((sum, park) => sum + (new Date().getFullYear() - park.buildYear), 0);
    }

    getParkAvgAge()
    {
        return this.getParkTotalAge() / this.parkList.length;
    }

    getParkTreeDensity()
    {
        this.parkList.forEach(
            park => console.log(`${park.name} has a tree density of ${park.numberOfTree / park.size} trees per square km`)
        );
    }

    getParkTreeGreaterThan(number)
    {   
        this.parkList.filter(
            park => park.numberOfTree > parseInt(number)
        ).forEach(
            park => console.log(`${park.name} has more than ${number} trees.`)
        );   
    }

    getStreetTotalLength()
    {
        return this.streetList.reduce((sum, street) => sum + street.length, 0);
    }

    getStreetAvgLength()
    {
        return this.getStreetTotalLength() / this.streetList.length;
    }

    getStreetSummary()
    {
        this.streetList.forEach(
            street => console.log(`${street.name}, built in ${street.buildYear}, is a ${street.size} street.`)
        )
    }

    viewList()
    {
        console.log(this.parkList);
        console.log(this.streetList);
    }
}
