import Container from "@layouts/shared/Container.jsx";
import PageTitle from "@components/shared/PageTitle/PageTitle.jsx";
import AuthForm from "@components/features/AuthForm/AuthForm.jsx";

const Login = () => {
    return <div className='login-page'>
        <Container>
            <PageTitle className='page-title'>
                <PageTitle.Top className='text-centered top'>Login</PageTitle.Top>
            </PageTitle>
            <AuthForm />
        </Container>
    </div>;
};

export default Login;