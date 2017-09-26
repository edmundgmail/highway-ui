export class NewRPElement {
  position: number;
  startNewRP: string;
  endNewRP: string;
  distance: number;

  constructor(position: number, startNewRP: string, endNewRP: string, distance: number) {
    this.position = position;
    this.startNewRP = startNewRP;
    this.endNewRP = endNewRP;
    this.distance = distance;
  }

  setPosition(position: number) : NewRPElement{
    this.position = position;
    return this;
  }
}
