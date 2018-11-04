import React, { Component } from 'react';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

export class LowerNavigation extends Component {
    tabs = [
        {
            key: 'account',
            icon: 'account-box',
            label: 'Account',
            barColor: '#37474F'
        },
        {
            key: 'channel',
            icon: 'multiline-chart',
            label: 'Data',
            barColor: '#37474F'
        },
        {
            key: 'settings',
            icon: 'settings',
            label: 'Settings',
            barColor: '#37474F'
        }
    ]
    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    render() {
        return (
            <BottomNavigation
                onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                renderTab={this.renderTab}
                tabs={this.tabs}
            />
        )
    }
}