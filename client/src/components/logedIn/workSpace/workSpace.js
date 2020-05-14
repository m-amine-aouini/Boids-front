import React, { Component } from 'react'
import WorkSpaceNav from './workSpaceNav/workSpaceNav'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { referenceUrl, extractReference } from '../../../utils/urlReference';
import { getChannels } from '../../../actions/channelActions';
class WorkSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channel_id: null,
            server_id: null
        }
    }
    getIds(serverName, channelName) {
        let check = 0;
        for (let server of this.props.servers.serversAsLeader) {
            if (server.name === serverName) {
                setTimeout(() => { this.setState({ server_id: server.id }) }, 0)
                return true;
            }
        }
        if (check === 0) {

            for (let server of this.props.servers.serversAsMember) {
                if (server.name === serverName) {
                    setTimeout(() => { this.setState({ server_id: server.id }) }, 0)
                    check++;
                }
            }
        }

        for (let channel of this.props.channels.channels) {
            if (channel.name === channelName) {
                setTimeout(() => { this.setState({ channel_id: channel.id }) }, 0)
                check++
            }
        }
        return check === 2;
    }
    getServerId(serverName) {
        for (let server of this.props.servers.serversAsLeader) {
            if (server.name === serverName) {
                setTimeout(() => { this.setState({ server_id: server.id }) }, 0)
                return true
            }
        }
        for (let server of this.props.servers.serversAsMember) {
            if (server.name === serverName) {
                setTimeout(() => { this.setState({ server_id: server.id }) }, 0)
                return true;
            }
        }

    }

    componentWillMount() {
        this.getServerId(extractReference(window.location.pathname.split('/')[2]))
        // this.getChannels(this.state.server_id);
    }

    render() {
        return this.getIds(extractReference(window.location.pathname.split('/')[2]), extractReference(window.location.pathname.split('/')[3]))
            ? (
                <div>
                    <WorkSpaceNav />
                    <div>
                        {this.props.channels.channels.map((channel, i) => (
                            <div>
                                <Link to={'/boidsServer/' + window.location.pathname.split('/')[2] + '/' + referenceUrl(channel.name)}>{channel.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : <Redirect to="/" />
    }
}
let mapPropsToState = state => ({
    channels: state.channels,
    servers: state.servers
})

export default connect(mapPropsToState, { getChannels })(WorkSpace);