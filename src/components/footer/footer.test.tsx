import {render, screen} from '@testing-library/react';
import {Route, Router, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import Footer from './footer';
import { Contact, SocialName } from './const';

const history = createMemoryHistory();


describe('Component: Main', () => {
  it('should render correctly', async () => {
    history.push(AppRoute.Catalog);

    render(
      <Router navigator={history} location={history.location}>
        <Routes>
          <Route path={AppRoute.Catalog} element={<Footer/>}/>
        </Routes>
      </Router>,
    );

    expect(screen.getByLabelText(SocialName.Facebook)).toBeInTheDocument();
    expect(screen.getByLabelText(SocialName.Instagram)).toBeInTheDocument();
    expect(screen.getByLabelText(SocialName.Twitter)).toBeInTheDocument();
    expect(screen.getByText('О нас')).toBeInTheDocument();
    expect(screen.getByText('Информация')).toBeInTheDocument();
    expect(screen.getByText('Где купить?')).toBeInTheDocument();
    expect(screen.getByText('Блог')).toBeInTheDocument();
    expect(screen.getByText('Вопрос - ответ')).toBeInTheDocument();
    expect(screen.getByText('Возврат')).toBeInTheDocument();
    expect(screen.getByText('Сервис-центры')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
    expect(screen.getByText(`${Contact.City },${ Contact.Metro  }, ${  Contact.Address}`)).toBeInTheDocument();
    expect(screen.getByText(Contact.Phone)).toBeInTheDocument();
    expect(screen.getByText('Режим работы:')).toBeInTheDocument();
    expect(screen.getByText(Contact.OpeningHours)).toBeInTheDocument();
    expect(screen.getByText(Contact.NumberWorkingDays)).toBeInTheDocument();
  });

});
