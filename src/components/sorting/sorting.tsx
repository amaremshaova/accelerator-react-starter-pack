import { SortOrder, SortType } from '../product-list/product-list';

type SortingProps = {
  sortTypeActive: string | null,
  sortOrderActive: string | null,
  onSetSortType: (type: string) => void,
  onSetSortDirect: (type: string) => void
}


function Sorting(props: SortingProps):JSX.Element{
  const {sortTypeActive, sortOrderActive, onSetSortType, onSetSortDirect} = props;

  return(
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button
          ${sortTypeActive === SortType.Price ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          onClick ={() => onSetSortType(SortType.Price)}
        >по цене
        </button>
        <button
          className={`catalog-sort__type-button
          ${sortTypeActive === SortType.Rating ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick ={() => onSetSortType(SortType.Rating)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          data-testid = "button-up"
          className={`catalog-sort__order-button catalog-sort__order-button--up
          ${sortOrderActive === SortOrder.Up ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          onClick = {() => {
            onSetSortDirect(SortOrder.Up);
            if (sortTypeActive === null){
              onSetSortType(SortType.Price);
            }
          }}
        >
        </button>
        <button
          data-testid = "button-down"
          className={`catalog-sort__order-button catalog-sort__order-button--down
          ${sortOrderActive === SortOrder.Down ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick = {() => {
            onSetSortDirect(SortOrder.Down);
            if (sortTypeActive === null){
              onSetSortType(SortType.Price);
            }
          }}
        >
        </button>
      </div>
    </div>
  );

}

export default Sorting;
