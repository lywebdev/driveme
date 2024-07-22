import Container from "@layouts/shared/Container.jsx";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import AuthForm from "@components/features/AuthForm/AuthForm.jsx";
import  '../styles/LoginPage.scss';

const Login = () => {
    return <div className="login-page">
        <Container>
            <PageTitle className='page-title'>
                <PageTitle.Top className='text-centered top'>Login</PageTitle.Top>
            </PageTitle>
            <PageTitle.Text className='text-centered'>Welcome back! Please log in using the form to rent a vehicle</PageTitle.Text>
            <AuthForm />
        </Container>
    </div>;
};

export default Login;