import { GuitarType } from '../../components/filters/filters';
import { Guitar } from '../../types/guitar';

export const guitars : Guitar[] = [
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
  },
  {
    id: 2,
    name: 'Честер Z300',
    vendorCode: 'TK129049',
    type: GuitarType.Electric,
    description: 'Эргономичность гитары и качество сборки являются, пожалуй, её главными преимуществами. Идеальное расположение в руках музыканта дополняется прочностью конструкции из клёна.',
    previewImg: 'img/guitar-8.jpg',
    stringCount: 7,
    rating: 3.5,
    price: 29500,
  }];


export const guitarsCount = 2;

export const minPrice  = 17500;
export const maxPrice  = 29500;
