import { fireEvent, render, screen } from '@testing-library/react';
import Form from '../../components/Form.jsx';

describe('Form Component', () => {
    it('renders component correctly', () => {
        render(<Form />);
        const formElement = screen.getByTestId('form');
        expect(formElement).toBeInTheDocument();
    });

    it('renders component with correct title', () => {
       render(<Form title={'Test_Title'}/>);
       const formInputElement = screen.getByTestId('input');
       expect(formInputElement.value).toBe('Test_Title');
    });

    it('renders component with correct description', () => {
        render(<Form description={'Test_Description'}/>);
        const formTextAreaElement = screen.getByTestId('textarea');
        expect(formTextAreaElement.value).toBe('Test_Description');
    });

    it('renders component with warning for title if status = true', () => {
       render(<Form title={''} description={'Test_Description'} status={true}/>);
       const warningElement = screen.getByText('Title is Required');
       expect(warningElement).toBeInTheDocument();
    });

    it('renders component with warning for description if status = true', () => {
        render(<Form title={'Test_Title'} description={''} status={true}/>);
        const warningElement = screen.getByText('Description is Required');
        expect(warningElement).toBeInTheDocument();
    });

    it('renders component with correct title changed function', () => {
        const titleChange = vitest.fn();
        render(<Form changeTitle={titleChange}/>);
        const formInputElement = screen.getByTestId('input');
        fireEvent.change(formInputElement, { target: { value: 'Changed_Title' } });
        expect(titleChange).toHaveBeenCalledTimes(1);
    });

    it('renders component with correct title changed function', () => {
        const descriptionChange = vitest.fn();
        render(<Form  changeDescription={descriptionChange}/>);
        const formTextAreaElement = screen.getByTestId('textarea');
        fireEvent.change(formTextAreaElement, { target: { value: 'Changed_Title' } });
        expect(descriptionChange).toHaveBeenCalledTimes(1);
    });

    it('renders component with loading = true', () => {
        render(<Form title={'Test_Title'} description={'Test_Description'} loading1={true}/>);
        const buttonElement = screen.getByTestId('spinner');
        expect(buttonElement).toBeInTheDocument();
    });

    it('renders component with status = false', () => {
        render(<Form loading1={false}/>);
        const buttonElement = screen.getByText('Add Task');
        expect(buttonElement).toBeInTheDocument();
    });

    it('renders component with correct button click', () => {
        const mockButtonClick = vitest.fn();
        render(<Form click={mockButtonClick}/>);
        const buttonElement = screen.getByTestId('button');
        buttonElement.click();
        expect(mockButtonClick).toHaveBeenCalled();
    });
});