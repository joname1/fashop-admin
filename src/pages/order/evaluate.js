// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Page from '../../components/public/page'
import Loadable from "react-loadable";
import { Spin } from "antd";
import { historyType } from "../../utils/flow";
import { dispatchProps } from "../../utils/defaultProps";
import { getRoutes } from "../../utils";
import { Route, Switch } from "react-router-dom";

const EvaluateListHeader = Loadable({
    loader: () => import('../../components/order/evaluateListHeader'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
const EvaluateListTable = Loadable({
    loader: () => import('../../components/order/evaluateListTable'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
type Props = {
    history: historyType,
    routerData: {},
    dispatch: dispatchProps,
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    match: { url: string, path: string }
}
type State = {}
@connect()
export default class Evaluate extends Component<Props, State> {

    render() {
        const { match, routerData } = this.props;
        const routes = getRoutes(match.path, routerData);
        return (
            <Switch>
                {routes.map((item) => {
                    return <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
                })}
                <Route key="/evaluate" render={() => (
                    <Page>
                        <EvaluateListHeader {...this.props} />
                        <EvaluateListTable {...this.props} />
                    </Page>
                )} />
            </Switch>
        )
    }
}
