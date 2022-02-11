import StarIcon from '../star-icon/star-icon';

const STARS_COUNT = 5;
const CONVERSATION_RATE_IN_TENS = 10;
const NO_COMMA = -1;

type RatingProps = {
  rating: number,
  id: string,
  width: number,
  height: number
}

enum StarType{
  Full = 100,
  Empty = 0
}


function Rating ({rating, id, width, height}: RatingProps) : JSX.Element {
  const pointIndex = String(rating).indexOf('.');
  let fractionalPart, integerPart;
  const htmlStarIcons = [];

  if (pointIndex === NO_COMMA){
    fractionalPart = 0;
    integerPart = rating;
  }
  else{
    fractionalPart = Number(String(rating).slice(pointIndex + 1, String(rating).length));
    integerPart = Number(String(rating).slice(0, pointIndex));
  }

  let index = 0;

  while (index < integerPart){
    htmlStarIcons.push({percent: StarType.Full, key: `${index}-${id}`});
    index++;
  }

  if (integerPart !== STARS_COUNT) {
    htmlStarIcons.push({percent: fractionalPart * CONVERSATION_RATE_IN_TENS, key: `${index}-${id}`});
  }

  for (let i = 0; i < STARS_COUNT - (integerPart + 1); ++i){
    index++;
    htmlStarIcons.push({percent: StarType.Empty, key : `${index}-${id}`});
  }

  return(
    <>
      {
        htmlStarIcons.map((star) =>
          <StarIcon percent={star.percent} id={star.key} width={width} height={height} key={star.key}/>)
      }
    </>);
}

export default Rating;
