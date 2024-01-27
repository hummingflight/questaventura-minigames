export class SteeringForces
{
  public static Seek(
    target: Phaser.Math.Vector2,
    position: Phaser.Math.Vector2,
    velocity: Phaser.Math.Vector2,
    maxSpeed: number
  ): Phaser.Math.Vector2
  {
    const desiredVelocity = target.clone().subtract(position).normalize().scale(maxSpeed);
    const steeringForce = desiredVelocity.subtract(velocity);
    return steeringForce;
  }
}