import React, { Fragment, useEffect, useState } from 'react';
import LinkContainer from '../LinkContainer/LinkContainer';
import {Link} from 'react-router-dom';
import './CovidStats.scss';
import axios from 'axios';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const CovidStats = () => {
    const [worldData, setWorldData] = useState(null);
    const [vnData, setVNData] = useState(null);
    const worldUrl = 'https://td.fpt.ai/corona/corona-total.json';
    const vnUrl = 'https://td.fpt.ai/corona/corona-chart-vn.json';

    useEffect(() => {
        axios.get(worldUrl)
            .then(res => {
                const worldData = Object.keys(res.data).map(key => {
                    return {date: key, infected: res.data[key][0], dead: res.data[key][1], cured: res.data[key][2]}
                });
                setWorldData(worldData);
            });
        axios.get(vnUrl)
            .then(res => {
                const vnData = Object.keys(res.data).map(key => {
                    return {date: key, infected: res.data[key][0], suspected: res.data[key][1], cured: res.data[key][2]}
                });
                setVNData(vnData);
            });
    }, []);

    return (
        worldData === null || vnData === null ? <div className="Loading">Loading...</div> :
        <Fragment>
            <section className="Navigation">
                <Link to="/" className="Link">
                    <LinkContainer active={false}>Covid19 Map</LinkContainer>
                </Link>
                <Link to="/stats" className="Link">
                    <LinkContainer active={true}>Covid19 Stats</LinkContainer>
                </Link>
            </section>
            <div className="Container">
                <section className="Chart">
                    <div className="Title">COVID19 Statistics of Viet Nam from Dec 08 2019 to now</div>
                    <LineChart
                            width={600}
                            height={500}
                            data={vnData}
                            margin={{top: 5, right: 30, left: 20, bottom: 5,}}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="infected" stroke="#8884d8" />
                            <Line type="monotone" dataKey="suspected" stroke="#ff0000" />
                            <Line type="monotone" dataKey="cured" stroke="#82ca9d" />
                        </LineChart>
                </section>
                <section className="Chart">
                    <div className="Title">COVID19 Statistics of World from Dec 08 2019 to now</div>
                    <LineChart
                        width={600}
                        height={500}
                        data={worldData}
                        margin={{top: 5, right: 30, left: 20, bottom: 5,}}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip payload={[{ name: '05-01', value: 12, unit: 'kg' }]} />
                        <Legend />
                        <Line type="monotone" dataKey="infected" stroke="#8884d8" />
                        <Line type="monotone" dataKey="dead" stroke="#ff0000" />
                        <Line type="monotone" dataKey="cured" stroke="#82ca9d" />
                    </LineChart>
                </section>
            </div>
        </Fragment>
    )
}

export default CovidStats;