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