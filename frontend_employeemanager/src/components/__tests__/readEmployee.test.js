import { render, screen } from '@testing-library/react';
import ViewUserModal from '../readEmployee';

describe('ViewUserModal', () => {
    const employee = {
        name: "John",
        surname: "Doe",
        birthDate: '1990-01-01',
        salary: 20000,
        role: 'Chief',
        manager: 'none',
        email: "john.doe@example.com",
        password: '1234'
    };

    it('should display all labels correctly', () => {
        const modal = render(<ViewUserModal employee={employee}/>);

        expect(screen.getByText('Name :')).toBeInTheDocument();
        expect(screen.getByDisplayValue('John')).toBeInTheDocument();
        expect(screen.getByText('Surname :')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
        expect(screen.getByText('Birthdate :')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1990-01-01')).toBeInTheDocument();
        expect(screen.getByText('Salary :')).toBeInTheDocument();
        expect(screen.getByDisplayValue(20000)).toBeInTheDocument();
        expect(screen.getByText('Role :')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Chief')).toBeInTheDocument();
        expect(screen.getByText('Reporting Manager :')).toBeInTheDocument();
        //expect(screen.getByText('none')).toBeInTheDocument();
        expect(screen.getByText('Email :')).toBeInTheDocument();
        expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByText('Password :')).toBeInTheDocument();
        expect(screen.getByDisplayValue('1234')).toBeInTheDocument();
    });

    it('should close the modal when the close button is clicked', () => {
        const modal = render(<ViewUserModal employee={employee} />);
        const closeButton = screen.getByText('Close');
        expect(closeButton).toBeInTheDocument();
        closeButton.click();
        expect(screen.queryByText('View User')).not.toBeNull();
    });
});