import { screen, render, fireEvent } from "@testing-library/react";
import AppPage from "../../pages/AppPage.jsx";

describe('AppPage', () => {
   it('renders AppPage Component correctly', () => {
       render(<AppPage />);
       const appPageElement = screen.getByTestId('app-page');
       expect(appPageElement).toBeInTheDocument();
   });

   it('renders AppPage with Form Component', () => {
       render(<AppPage/>);
       const formElement = screen.getByTestId('form-component');
       expect(formElement).toBeInTheDocument();
   });

    it('renders AppPage with Card Component', () => {
       render(<AppPage/>);
       const cardElement = screen.getByTestId('card-component');
       expect(cardElement).toBeInTheDocument();
    });
});
