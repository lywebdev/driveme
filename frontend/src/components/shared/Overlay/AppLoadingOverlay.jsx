import classes from './AppLoadingOverlay.module.scss';
import {CSSTransition} from "react-transition-group";

const AppLoadingOverlay = ({loaderVisible}) => {
    return <CSSTransition
        in={loaderVisible}
        timeout={500}
        mountOnEnter
        unmountOnExit
        classNames={{
            exitActive: classes['overlay-hide'],
        }}
    >
        <div className={classes.overlay}></div>
    </CSSTransition>;
};

export default AppLoadingOverlay;