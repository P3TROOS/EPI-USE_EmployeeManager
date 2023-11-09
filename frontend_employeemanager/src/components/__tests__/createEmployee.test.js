import { render, screen } from '@testing-library/react';
import CreateNewUserModal from '../createEmployee';

describe('CreateNewUserModal', () => {
    it('should display all labels correctly', () => {
        const modal = render(<CreateNewUserModal />);

        expect(screen.getByText('Name :')).toBeInTheDocument();
        expect(screen.getByText('Surname :')).toBeInTheDocument();
        expect(screen.getByText('Birthdate :')).toBeInTheDocument();
        expect(screen.getByText('Salary :')).toBeInTheDocument();
        expect(screen.getByText('Role :')).toBeInTheDocument();
        expect(screen.getByText('Reporting Manager :')).toBeInTheDocument();
        expect(screen.getByText('Email :')).toBeInTheDocument();
        expect(screen.getByText('Password :')).toBeInTheDocument();
    });

    it('should close the modal when the close button is clicked', () => {
        const modal = render(<CreateNewUserModal />);
        const closeButton = screen.getByText('Close');
        expect(closeButton).toBeInTheDocument();
        closeButton.click();
        expect(screen.queryByText('Create New User')).not.toBeNull();
    });
});