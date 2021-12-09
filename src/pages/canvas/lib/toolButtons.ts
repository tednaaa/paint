interface IToolButton {
  title: string;
  imageSource: string;
}

export const toolButtons: IToolButton[] = [
  {
    title: 'brush',
    imageSource: require('@/shared/images/icons/brush.svg'),
  },
  {
    title: 'rectangle',
    imageSource: require('@/shared/images/icons/rectangle.svg'),
  },
  {
    title: 'circle',
    imageSource: require('@/shared/images/icons/circle.svg'),
  },
  {
    title: 'eraser',
    imageSource: require('@/shared/images/icons/eraser.svg'),
  },
  {
    title: 'line',
    imageSource: require('@/shared/images/icons/line.svg'),
  },
];
