import { Tool } from '.';

export class Line extends Tool {}
//   mouseDown = false;
//   currentX: number = 0;
//   currentY: number = 0;
//   saved: string = '';

//   constructor(canvas: HTMLCanvasElement) {
//     super(canvas);

//     this.listen();
//   }

//   listen() {
//     this.canvas.onmouseup = this.handleMouseUp.bind(this);
//     this.canvas.onmousedown = this.handleMouseDown.bind(this);
//     this.canvas.onmousemove = this.handleMouseMove.bind(this);

//     this.canvas.ontouchend = this.handleMouseUp.bind(this);
//     this.canvas.ontouchstart = this.handleMouseDown.bind(this);
//     this.canvas.ontouchmove = this.handleMouseMove.bind(this);
//   }

//   handleMouseUp() {
//     this.mouseDown = false;
//   }

//   handleMouseDown(event: MouseEvent | TouchEvent) {
//     const target = event.target as HTMLCanvasElement;

//     if (event instanceof TouchEvent) {
//       this.currentX = event.touches[0].pageX - target.offsetLeft;
//       this.currentY = event.touches[0].pageY - target.offsetTop;
//     } else {
//       this.currentX = event.pageX - target.offsetLeft;
//       this.currentY = event.pageY - target.offsetTop;
//     }

//     this.mouseDown = true;

//     this.ctx.beginPath();
//     this.ctx.moveTo(this.currentX, this.currentY);
//     this.saved = this.canvas.toDataURL();
//   }

//   handleMouseMove(event: MouseEvent | TouchEvent) {
//     const target = event.target as HTMLCanvasElement;

//     event.preventDefault();

//     if (this.mouseDown) {
//       if (event instanceof TouchEvent) {
//         this.draw(
//           event.touches[0].pageX - target.offsetLeft,
//           event.touches[0].pageY - target.offsetTop
//         );
//       } else {
//         this.draw(
//           event.pageX - target.offsetLeft,
//           event.pageY - target.offsetTop
//         );
//       }
//     }
//   }

//   draw(x: number, y: number) {
//     const image = new Image();

//     image.src = this.saved;
//     image.onload = () => {
//       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
//       this.ctx.beginPath();
//       this.ctx.moveTo(this.currentX, this.currentY);
//       this.ctx.lineTo(x, y);
//       this.ctx.stroke();
//     };
//   }
// }
