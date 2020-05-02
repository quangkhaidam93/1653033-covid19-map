import React from 'react';
import './LinkContainer.scss';

const LinkContainer = ({children, active}) => {
    const className = active ? 'LinkContainer active' : 'LinkContainer';

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default LinkContainer;