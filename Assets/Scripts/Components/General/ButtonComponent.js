class ButtonComponent
{
    constructor(owner, width, height, eventTag, event, radius = -1)
    {
        this.owner = owner;
        this.event = event;
        this.eventTag = eventTag;
        this.width = width;
        this.height = height;
        this.radius = radius;
    }

    Update()
    {
        if (this.radius == -1)
        {
            let maxX = this.owner.x + this.width;
            let maxY = this.owner.y + this.height;
            let minX = this.owner.x;
            let minY = this.owner.y;
            if (mouseIsPressed && mouseX < maxX && mouseX > minX && mouseY < maxY && mouseY > minY)
            {
                return [this.eventTag, this.event];
            }
        }
        else
        {
            let relX = this.owner.x + (this.width / 2.0) - mouseX;
            let relY = this.owner.y + (this.height / 2.0) - mouseY;
            if (mouseIsPressed && sqrt((relX * relX) + (relY * relY)) < this.radius)
            {              
                return [this.eventTag, this.event];
            }
        }
    }
}