class PhysicsBody
{
    constructor(owner, dragConstant = 0)
    {
        this.owner = owner;
        this.dragConstant = dragConstant; 
        this.velocity = [0, 0];
    }

    Update()
    {
        this.owner.x += this.velocity[0] * deltaTime / 3000;
        this.owner.y += this.velocity[1] * deltaTime / 3000;
        if (this.dragConstant != 0)
        {
            this.ApplyDrag();
        }
    }

    AddForce(x, y, force)
    {
        force *= deltaTime / 1000;
        this.velocity = [this.velocity[0] + (x * force), this.velocity[1] + (y * force)];
    }
    ApplyDrag()
    {
        this.velocity = [this.velocity[0] - (this.velocity[0] * this.dragConstant), this.velocity[1] - (this.velocity[1] * this.dragConstant)];
    }
    SetVelocity(vel)
    {
        this.velocity = vel;
    }
    
}

