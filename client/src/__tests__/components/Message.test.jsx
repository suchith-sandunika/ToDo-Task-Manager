import { screen, render } from '@testing-library/react';
import Message from "../../components/Message";

describe('Message Component', () => {
   it('renders the component successfully', () => {
      render(<Message/>);
      const messageElement = screen.getByTestId('message-input');
      expect(messageElement).toBeInTheDocument();
   });

   it('renders component with correct message', () => {
      render(<Message message={'Test_Message'}/>);
      const messageElement = screen.getByTestId('message-input');
      expect(messageElement.value).toBe('Test_Message');
   });

   it('renders component with correct type', () => {
      render(<Message message={'Test_Message'} type={'success'}/>);
      const messageElement = screen.getByTestId('message-input');
      expect(messageElement.value).toBe('Test_Message');
   })
});