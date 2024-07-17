import './Footer.scss';

const Footer = () => {
    console.log('Footer');

    return (
        <footer id='footer'>
            <div className='container'>
                <div className='footer__copyright'>2024 All rights reserved.</div>
                <ul className='footer-links'>
                    <li className='footer-links__item'><a href="#">Policy</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;