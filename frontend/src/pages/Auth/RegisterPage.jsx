import Container from "@layouts/shared/Container.jsx";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import  '../styles/LoginPage.scss';
import RegisterForm from "@components/features/AuthForm/RegisterForm.jsx";

const Register = () => {
    return <Container className='auth-page'>
        <PageTitle className='page-title'>
            <PageTitle.Top className='text-centered top'>Registration</PageTitle.Top>
            <PageTitle.Text
                className='text-centered'
                marginTop
            >Welcome back! Please log in using the form to rent a vehicle</PageTitle.Text>
        </PageTitle>
        <RegisterForm className='auth-form' />
    </Container>;
};

export default Register;