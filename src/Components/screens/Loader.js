import React , {useEffect, useRef} from 'react';
import LoadingBar from 'react-top-loading-bar'
// const Loader = () => <DisappearedLoading />;
// export default Loader;

const Loader = () => {
    const ref = useRef(null);

    useEffect(()=>{
        ref.current.complete()
    })

    return (
        <div>
            <LoadingBar color="#979797" ref={ref}/>
        </div>
    )  
};
  
export default Loader;