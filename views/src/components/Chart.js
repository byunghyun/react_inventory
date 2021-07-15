import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {Chart, ArgumentAxis, ValueAxis, BarSeries, Title, Legend} from '@devexpress/dx-react-chart-material-ui';
import {withStyles} from '@material-ui/core/styles';
import {Stack, Animation} from '@devexpress/dx-react-chart';
import {connect} from 'react-redux';

const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendRootBase = ({classes, ...restProps}) => <Legend.Root {...restProps} className={classes.root} />;
const Root = withStyles(legendStyles, {name: 'LegendRoot'})(legendRootBase);
const legendLabelStyles = () => ({
    label: {
        whiteSpace: 'nowrap',
    },
});
const legendLabelBase = ({classes, ...restProps}) => <Legend.Label className={classes.label} {...restProps} />;
const Label = withStyles(legendLabelStyles, {name: 'LegendLabel'})(legendLabelBase);

const Demo = (props) => {
    return (
        <Paper id="chart">
            <Chart data={props.ReduxWeekData} style={{marginTop: '20px'}}>
                <ArgumentAxis />
                <ValueAxis />
                <BarSeries name="입고량" valueField="I" argumentField="dayOfWeek" color="#007bff" />
                <BarSeries name="출고량" valueField="O" argumentField="dayOfWeek" color="#ff0000" />
                <BarSeries name="불량" valueField="D" argumentField="dayOfWeek" color="#ffa500" />
                <Animation />
                <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                <Title text="주간 입출고량" />
                <Stack />
            </Chart>
        </Paper>
    );
};

const StateToProps = (state) => {
    return {
        ReduxWeekData: state.ReduxWeekData,
    };
};

export default connect(StateToProps)(Demo);
