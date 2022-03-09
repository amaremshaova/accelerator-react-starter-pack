import { GuitarType } from '../../components/filters/filters';
import { GuitarComments } from '../../types/guitar-comments';

export const commentsCount = 10;
export const commentsCountArray = [{id: 1, count: 10}, {id: 2, count:20}];

export const comments = [{
  id: '1',
  userName: 'a',
  advantage: 'хороший звук',
  disadvantage: 'не очень качественный корпус',
  comment: 'В целом, понравилось',
  rating: 3.5,
  createAt: '',
  guitarId: 100,
},
{
  id: '2',
  userName: 'b',
  advantage: 'нормальный звук',
  disadvantage: 'не обнаружено',
  comment: 'Подходит',
  rating: 5,
  createAt: '',
  guitarId: 100,
}];

export const guitarComments : GuitarComments[] = [
  {
    id: 1,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: GuitarType.Electric,
    description: 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 3.5,
    price: 17500,
    comments: [{
      id: '1',
      userName: 'a',
      advantage: 'хороший звук',
      disadvantage: 'не очень качественный корпус',
      comment: 'В целом, понравилось',
      rating: 3.5,
      createAt: '',
      guitarId: 100,
    }],
  },
];
