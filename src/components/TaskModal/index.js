import React, {Component}   from 'react';
import {
    Text, 
    View,
    Modal
}                           from 'react-native';
import {
    Button,
    Input
}                           from 'native-base'

import {styles}             from './styles'

type Props = {};
export default class TaskModal extends Component<Props> {

    //INIT
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.editingText !== this.state.text){
            this.setState({ text: nextProps.editingText })
        }
    }


    // HANDLE FUNCTIONS
    handleTextChange = (value) => {
        this.setState({ text: value })
    }

    handleDone = () => {
        if(this.state.text){
            this.props.handleDone(this.state.text)
        }else{
            alert("Campo de texto vazio")
        }
    }
    

    // RENDER FUNCTIONS
    render() {
        return (
            <Modal
                visible = {this.props.visible}
                animationType   = {'slide'}>
                <View
                    style   = {styles.container}>
                    <Input
                        style       = {styles.input}
                        placeholder = {'Tarefa'}
                        value       = {this.state.text}
                        onChangeText= {this.handleTextChange}/>
                    <Button
                        block
                        style       = {styles.button}
                        onPress     = {this.handleDone}>
                        <Text
                            style   = {styles.buttonText}>
                            {this.props.doneLabel}
                        </Text>
                    </Button>
                    <Button
                        block
                        danger
                        style       = {styles.button}
                        onPress     = {this.props.handleCancel}>
                        <Text
                            style   = {styles.buttonText}>
                            {this.props.cancelLabel}
                        </Text>
                    </Button>
                </View>
            </Modal>
        );
    }
}

TaskModal.defaultProps = {
    doneLabel: 'Concluir',
    cancelLabel: 'Cancelar'
}


