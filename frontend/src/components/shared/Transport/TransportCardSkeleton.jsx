import classes from "@components/shared/Transport/TransportCard.module.scss";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TransportCardSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#ececec" highlightColor="#f5f5f5">
            <div className={classes['transport-card']} style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div className={classes.image}>
                    <Skeleton height={200} borderRadius={10} />
                </div>
                <div className={classes.name} style={{marginBottom: '10px'}}>
                    <Skeleton />
                </div>
                <div className={classes.price} style={{marginTop: 'auto'}}><Skeleton /></div>
            </div>
        </SkeletonTheme>
    );
};

export default TransportCardSkeleton;