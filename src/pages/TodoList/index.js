import React, {Component}   from 'react';
import {
    Text, 
    View
}                           from 'react-native';
import {
    Container,
    Header,
    Right,
    Body,
    Title,
    Left,
    Button,
    Icon,
    List,
    ListItem,
    CheckBox
}                           from 'native-base'

import {styles}             from './styles'
import TaskModal            from '../../components/TaskModal';

type Props = {};
export default class TodoList extends Component<Props> {

    //INIT
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            editingTask: null,
            openModal: false
        };
    }


    // HANDLE FUNCTIONS
    handleChangeDone = (item) => {
        item.done = !item.done
        this.forceUpdate()
    }

    handleAdd = () => {
        this.setState({ openModal: true })
    }

    handleEdit = (item) => {
        this.setState({ editingTask: item }, () => {
            this.setState({ openModal: true })
        })
    }

    handleCancelEdit = () => {
        this.setState({ openModal: false, editingTask: null })
    }

    handleDone = (text) => {
        if(this.state.editingTask){
            this.state.editingTask.text = text
            this.setState({ editingTask: null, openModal: false })
        }else{
            let newTask = {
                text: text,
                done: false
            }

            let tasks = [newTask].concat(this.state.tasks)

            this.setState({ tasks, openModal: false })
        }
    }

    handleRemove = (item) => {
        let tasks = this.state.tasks

        tasks.splice(this.state.tasks.indexOf(item), 1)

        this.setState({ tasks })
    }

    // RENDER FUNCTIONS
    renderList(){
        items = this.state.tasks.map((item, index) => {
            return(
                <ListItem
                    key     = {index}
                    style   = {styles.listItem}>
                    <View
                        style   = {styles.checkTextBox}>
                        <CheckBox
                            style   = {styles.checkBox}
                            checked = {item.done}
                            onPress = {() => this.handleChangeDone(item)}/>
                        <Text
                            style   = {styles.itemText}>
                            {item.text}
                        </Text>
                    </View>
                    <View
                        style   = {styles.checkTextBox}>
                        <Button
                            transparent
                            onPress = {() => this.handleEdit(item)}>
                            <Icon name = 'create'/>
                        </Button>
                        <Button
                            transparent
                            onPress = {() => this.handleRemove(item)}>
                            <Icon name = 'trash'/>
                        </Button>
                    </View>
                </ListItem>
            )
        })
        return(
            <List>
                {items}
            </List>
        )
    }

    render() {
        return (
            <Container>
                <TaskModal
                    visible         = {this.state.openModal}
                    handleDone      = {this.handleDone}
                    handleCancel    = {this.handleCancelEdit}
                    editingText     = {this.state.editingTask && this.state.editingTask.text ? this.state.editingTask.text : null}/>
                <Header>
                    <Left></Left>
                    <Body>
                        <Title>
                            {this.props.title}
                        </Title>
                    </Body>
                    <Right>
                        <Button 
                            transparent
                            onPress     = {this.handleAdd}>
                            <Icon name = 'add'/>
                        </Button>
                    </Right>
                </Header>
                {this.renderList()}
                {this.state.tasks.length === 0 && 
                    <Text
                        style   = {styles.label}>
                        {this.props.noItemsLabel}
                    </Text>
                }
            </Container>
        );
    }
}

TodoList.defaultProps = {
    title: 'TODO List',
    noItemsLabel: 'Lista sem itens'
}


