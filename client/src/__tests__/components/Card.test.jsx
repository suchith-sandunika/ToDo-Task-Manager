import { render, screen } from '@testing-library/react';
import Card from '../../components/Card.jsx';

describe('Card Component', () => {
    it('renders component correctly', () => {
        render(<Card />);
        const cardElement = screen.getByTestId('card');
        expect(cardElement).toBeInTheDocument();
    });

    it('renders component with correct title', () => {
        render(<Card title="Test_Title" />);
        const titleElement = screen.getByText('Test_Title');
        expect(titleElement).toBeInTheDocument();
    });

    it('renders component with correct description', () => {
        render(<Card body={'Test_Body'}/>);
        const descriptionElement = screen.getByText('Test_Body');
        expect(descriptionElement).toBeInTheDocument();
    });

    it('renders component with correct date', () => {
        const date = new Date('2023-10-01');
        render(<Card date={date} />);
        const dateElement = screen.getByTestId('date');
        expect(dateElement).toBeInTheDocument();
    });

    it('renders component with status = true', () => {
       render(<Card loading2={true}/>);
       const buttonElement = screen.getByTestId('spinner');
       expect(buttonElement).toBeInTheDocument();
    });

    it('renders component with status = false', () => {
        render(<Card loading2={false}/>);
        const buttonElement = screen.getByText('Done');
        expect(buttonElement).toBeInTheDocument();
    });

    it('renders component with correct button click', () => {
        const mockButtonClick = vitest.fn();
        render(<Card buttonClick={mockButtonClick}/>);
        const buttonElement = screen.getByTestId('button');
        buttonElement.click();
        expect(mockButtonClick).toHaveBeenCalled();
    });
});

