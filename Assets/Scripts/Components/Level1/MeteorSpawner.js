class MeteorSpawner
{
    constructor(owner, meteorData, spawnPositions, velocityRange, spawnRateRange, timeToMax)
    {
        this.owner = owner;
        this.meteorData = meteorData; //[0] = image
        this.spawnPositions = spawnPositions;
        this.velocityRange = velocityRange;
        this.spawnRateRange = spawnRateRange; //[0]:max, [1]min
        this.timeToMax = timeToMax;
        this.spawnTimer = 2;
        this.totalTimer = 0;

        this.activeMeteors = [];
        this.centerPos = [800, 400];
    }

    Update()
    {
        let result = this.ManageActiveMeteors();
        if (result != null)
        {
            return result;
        }

        this.totalTimer += (deltaTime / 1000.0);
        this.totalTimer = this.totalTimer > this.timeToMax ? this.timeToMax : this.totalTimer;
        this.spawnTimer -= (deltaTime / 1000.0);
        if (this.spawnTimer < 0)
        {
            this.spawnTimer = lerp(this.spawnRateRange[0], this.spawnRateRange[1], this.totalTimer / this.timeToMax);
            return this.CreateMeteor();
        }
    }

    CreateMeteor()
    {
        let spawnPos = [random(-1, 1) * 1500 + 800, random(-1, 1) * 1500 + 400];
        
        let meteor = new BaseObject(spawnPos[0], spawnPos[1]);

        let radius = random(90, 120);
        meteor.AddComponent(new ImageComponent(meteor, this.meteorData[0], radius, radius));
        meteor.AddComponent(new ButtonComponent(meteor, radius, radius, "destroy", meteor, radius / 2.0));
        meteor.AddComponent(new PhysicsBody(meteor, .003));
        meteor.GetComponent(2).SetVelocity
        (
            [random(-1, 1) * random(this.velocityRange[0], this.velocityRange[1]), 
            random(-1, 1) * random(this.velocityRange[0], this.velocityRange[1])]
        );

        this.activeMeteors.push(meteor);
        
        return ["create", meteor];
    }

    lerp(a, b, v)
    {
        return (1 - v) * a + v * b;
    }

    ManageActiveMeteors()
    {
        for (let i = 0; i < this.activeMeteors.length; i++)
        {
            let meteorPos = [this.activeMeteors[i].x, this.activeMeteors[i].y];
            let vecToCenter = [this.centerPos[0] - meteorPos[0], this.centerPos[1] - meteorPos[1]];
            let magnitude = sqrt(pow(vecToCenter[0], 2) + pow(vecToCenter[1], 2));
            let forceMag = 100000 / (magnitude * magnitude);
            this.activeMeteors[i].GetComponent(2).AddForce(vecToCenter[0], vecToCenter[1], forceMag);

            let xDiff = meteorPos[0] - this.centerPos[0];
            let yDiff = meteorPos[1] - this.centerPos[1];
            xDiff = pow(xDiff, 2);
            yDiff = pow(yDiff, 2);
            let dist = sqrt(xDiff + yDiff);
            if (dist < 200)
            {
                console.log("HRERERE");
                return ["load", "MainMenu"];
            }
        }
        return null;
    }
}