import React, { Fragment } from 'react';
import LinkContainer from '../LinkContainer/LinkContainer';
import {Link} from 'react-router-dom';

const CovidStats = () => {
    return (
        <Fragment>
            <section className="Navigation">
                <Link to="/" className="Link">
                    <LinkContainer active={false}>Covid19 Map</LinkContainer>
                </Link>
                <Link to="/stats" className="Link">
                    <LinkContainer active={true}>Covid19 Stats</LinkContainer>
                </Link>
            </section>
            <div>Hello Workd</div>
        </Fragment>
    )
}

export default CovidStats;