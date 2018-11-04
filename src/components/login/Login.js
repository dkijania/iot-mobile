import React, { Component } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { authInputChange, login } from '../../actions';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux';

class Login extends Component {

    login() {
        const { username, password } = this.props;
        this.props.login({ username, password });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.loginContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={require('../../images/chariot.png')} />
                    </View>
                    <View style={styles.formContainer}>
                        {this.renderLoginForm()}
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }

    renderLoginForm() {
        return (
            <View>
                {this.renderError()}
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    value={this.props.username}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={text => this.props.authInputChange({ 'field': 'username', 'value': text })}
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType="next"
                    placeholder='Username'
                    placeholderTextColor='rgba(225,225,225,0.7)' />

                <TextInput style={styles.input}
                    returnKeyType="go" ref={(input) => this.passwordInput = input}
                    placeholder='Password'
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    value={this.props.password}
                    onChangeText={text => this.props.authInputChange({ 'field': 'password', 'value': text })}
                    secureTextEntry />

                {this.renderButtonOrLoading()}
            </View>
        );
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={styles.warningContainer}>
                    <Icon style={styles.warningElement} name="warning" size={20} />
                    <Text style={styles.warningElement} >{this.props.error}</Text>
                </View>
            );
        }
    }

    renderButtonOrLoading() {
        if (this.props.isLoading) {
            return (
                <ActivityIndicator size="large" />
            );
        }
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={this.login.bind(this)}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated) {
            this.props.navigation.navigate('ChannelList', { username: this.props.username });
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    formContainer: {
        padding: 30,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title: {
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    },
    warningContainer: {
        alignItems: 'center',
        flexGrow: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 5
    },
    warningElement: {
        color: "#971E1E"
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff',
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton: {
        backgroundColor: '#2980b6',
        color: '#fff'
    },
    text: {
        textAlign: 'center'
    }
});

const mapStateToProps = state => {

    return {
        username: state.auth.username,
        password: state.auth.password,
        isLoading: state.auth.isLoading,
        error: state.auth.error,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { authInputChange, login })(Login);