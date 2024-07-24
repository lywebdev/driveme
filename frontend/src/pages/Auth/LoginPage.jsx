import Container from "@layouts/shared/Container.jsx";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import LoginForm from "@components/features/AuthForm/LoginForm.jsx";
import './../styles/AuthPage.scss';

const Login = () => {
    return <Container className='auth-page'>
        <PageTitle className='page-title'>
            <PageTitle.Top className='text-centered top'>Login</PageTitle.Top>
            <PageTitle.Text
                className='text-centered'
                marginTop
            >Welcome back! Please log in using the form to rent a vehicle</PageTitle.Text>
        </PageTitle>
        <LoginForm className='auth-form' />
    </Container>;
};

export default Login;